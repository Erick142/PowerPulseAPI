import Usuario from "../model/usuarioModel.js";
import Entrenamiento from "../model/entrenamientoModel.js";
import { obtenerEjerciciosPorMusculo, obtenerEjerciciosAleatorio, obtenerEjercicioPorNombre } from "./ejercicioController.js";
import Ejercicio from "../model/ejercicioModel.js";
import jwt from "jsonwebtoken";
import { SECRETKEY } from "./usuarioController.js";

async function generarEntrenamientoAutogenerado(req, res){
    try{
        const {token, musculos} = req.body;
        let decodedToken = jwt.verify(token,SECRETKEY);
        const idUsuario = decodedToken.id;
        const usuario = await Usuario.findById(idUsuario);

        const entrenamientos = await Entrenamiento.find({usuario: usuario});

        let ejercicios = [];
        if(entrenamientos.length==0){
            ejercicios = await primerEntrenamiento(musculos);
        }else{
            ejercicios = await entrenamientoConData(musculos, usuario);
        }
        const entrenamiento= await Entrenamiento.create(
            {
                usuario: usuario,
                fecha: new Date(),
                completado: false,
                terminado: false,
                tiempo: 0,
                calorias: 0,
                tipo: "AUTOGENERADO",
                ejercicios: ejercicios,
            }
        )
        return res.status(200).json({entrenamiento});
    }catch(e){
        console.log(e)
        return res.status(200).json({error: e});
    }
}

async function primerEntrenamiento(musculos){
    const ejercicios=[];
    let nDeEjercicios= 3;
    if (musculos.length > 0) {
        nDeEjercicios = Math.min(musculos.length, 3);

        for (let i = 0; i < nDeEjercicios; i++) {
            const musculo = musculos[i];
            const listaEjercicios = obtenerEjerciciosPorMusculo(musculo);

            if (listaEjercicios.length > 0) {
                const ejercicio = listaEjercicios[Math.floor(Math.random() * listaEjercicios.length)];

                const ejercicioCompleto = await Ejercicio.create({
                    nombre: ejercicio.nombre,
                    musculo: ejercicio.musculo,
                    descripcion: ejercicio.descripcion,
                    sesiones: 3,
                    sesionesCompletadas: 0,
                    repeticiones: 12,
                    repeticionesCompletadas: 0,
                    completado: false,
                });

                ejercicios.push(ejercicioCompleto);
            }
        }
    } else {
        // Si musculos viene vacío, se crean ejercicios de manera aleatoria
        for (let i = 0; i < nDeEjercicios; i++) {
            const ejercicioAleatorio = obtenerEjerciciosAleatorio();

            const ejercicioCompleto = await Ejercicio.create({
                nombre: ejercicioAleatorio.nombre,
                musculo: ejercicioAleatorio.musculo,
                descripcion: ejercicioAleatorio.descripcion,
                sesiones: 3,
                sesionesCompletadas: 0,
                repeticiones: 12,
                repeticionesCompletadas: 0,
                completado: false,
            });

            ejercicios.push(ejercicioCompleto);
        }
    }
    return ejercicios;
}

async function entrenamientoConData(musculos, usuario) {
    const ejercicios = [];
    let nDeEjercicios = 3;
    const entrenamientosRecientes = await Entrenamiento.find({
        usuario: usuario,
    })
        .sort({ fecha: -1 })
        .limit(3)
        .populate("ejercicios");

    let agregado = 0;
    if (entrenamientosRecientes.every((object) => object.completado == true)) {
        agregado = 2;
    }

    const ultimoEntrenamiento = entrenamientosRecientes[0];
    const ejerciciosAnteriores = ultimoEntrenamiento.ejercicios;

    const ejerciciosADescartar = ejerciciosAnteriores;

    if (musculos.length === 0) {
        // Si musculos viene vacío, creamos ejercicios de manera aleatoria
        for (let i = 0; i < nDeEjercicios; i++) {
            const ejercicioAleatorio = obtenerEjerciciosAleatorio();

            const nuevoEjercicio = await Ejercicio.create({
                nombre: ejercicioAleatorio.nombre,
                musculo: ejercicioAleatorio.musculo,
                descripcion: ejercicioAleatorio.descripcion,
                sesiones: 3,
                sesionesCompletadas: 0,
                repeticiones: ultimoEntrenamiento.ejercicios[0].repeticiones + agregado,
                repeticionesCompletadas: 0,
                completado: false,
            });
            ejercicios.push(nuevoEjercicio);
            ejerciciosADescartar.push(nuevoEjercicio);
        }
    } else {
        let indiceMusculo = 0;

        while (ejercicios.length < nDeEjercicios) {
            const listaEjercicios = obtenerEjerciciosPorMusculo(musculos[indiceMusculo]);
            const posiblesEjercicios = [];

            for (const ejercicio of listaEjercicios) {
                if (!ejerciciosADescartar.some((object) => object.nombre == ejercicio.nombre)) {
                    posiblesEjercicios.push(ejercicio);
                }
            }

            if (posiblesEjercicios.length > 0) {
                const ejercicio = posiblesEjercicios[Math.floor(Math.random() * posiblesEjercicios.length)];

                const nuevoEjercicio = await Ejercicio.create({
                    nombre: ejercicio.nombre,
                    musculo: ejercicio.musculo,
                    descripcion: ejercicio.descripcion,
                    sesiones: 3,
                    sesionesCompletadas: 0,
                    repeticiones: ultimoEntrenamiento.ejercicios[0].repeticiones + agregado,
                    repeticionesCompletadas: 0,
                    completado: false,
                });
                ejercicios.push(nuevoEjercicio);
                ejerciciosADescartar.push(nuevoEjercicio);
            }

            indiceMusculo = (indiceMusculo + 1) % musculos.length;
        }
    }

    return ejercicios;
}

async function verMiProgreso(req, res){
    try {
        const {token} = req.params;
        let decodedToken = jwt.verify(token,SECRETKEY);
        const idUsuario = decodedToken.id;
        const usuario = await Usuario.findById(idUsuario);

        let entrenamientos = await Entrenamiento.find({usuario: usuario}).populate("ejercicios");
        const years= []

        for (const entrenamiento of entrenamientos) {
            const year= entrenamiento.fecha.getFullYear();
            let yearObject= years.find((e)=>e.numero==year);
            if(!yearObject){
                years.push(
                    {
                        numero: year,
                        meses: []
                    }
                )
                yearObject = years.find((e)=>e.numero==year);
            }
            const mes= entrenamiento.fecha.getMonth()+1;
            let mesObject = yearObject.meses.find((e)=>e.numero==mes);

            if(!mesObject){
                yearObject.meses.push(
                    {
                        numero: mes,
                        dias: [],
                    }
                )
                mesObject = yearObject.meses.find((e)=>e.numero==mes);
            }

            const dia = entrenamiento.fecha.getDate();
            let diaObject = mesObject.dias.find((e)=>e.numero==dia);

            if(!diaObject){
                mesObject.dias.push(
                    {
                        numero: dia,
                        entrenamientos: [],
                    }
                )
                diaObject = mesObject.dias.find((e)=>e.numero==dia);
            }
            diaObject.entrenamientos.push(entrenamiento);
        }
        return res.status(200).json({years: years});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error});
    }
}

async function verRutina(req, res){
    try {
        const {id} = req.params;

        const entrenamiento= await Entrenamiento.findById(id);

        return res.status(200).json(entrenamiento);
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error});
    }
}

async function completarRutina(req, res){
    try {
        const {id} = req.params;

        let entrenamiento= await Entrenamiento.findById(id);
        
        entrenamiento.completado= true;
        entrenamiento = await entrenamiento.save();

        return res.status(200).json(entrenamiento);
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error});
    }
}

async function terminarRutina(req, res){
    try {
        const {id} = req.params;

        let entrenamiento= await Entrenamiento.findById(id);
        
        entrenamiento.terminado= true;
        entrenamiento = await entrenamiento.save();

        return res.status(200).json(entrenamiento);
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error});
    }
}

async function crearEntrenamientoPersonalizado(req, res){
    try {
        const {token, ejercicios} = req.body;
        let decodedToken = jwt.verify(token,SECRETKEY);
        const idUsuario = decodedToken.id;
        const usuario = await Usuario.findById(idUsuario);

        const ejerciciosFinales=[]
        
        for (const ejercicio of ejercicios) {
            const ejercicioObtenido = obtenerEjercicioPorNombre(ejercicio.nombre);

            const nuevoEjercicio = await Ejercicio.create({
                nombre: ejercicioObtenido.nombre,
                musculo: ejercicioObtenido.musculo,
                descripcion: ejercicioObtenido.descripcion,
                sesiones: ejercicio.sesiones,
                sesionesCompletadas: 0,
                repeticiones: ejercicio.repeticiones,
                repeticionesCompletadas: 0,
                completado: false,
            });
            ejerciciosFinales.push(nuevoEjercicio);
        }

        const entrenamiento= await Entrenamiento.create(
            {
                usuario: usuario,
                fecha: new Date(),
                completado: false,
                terminado: false,
                tiempo: 0,
                calorias: 0,
                tipo: "PERSONALIZADO",
                ejercicios: ejerciciosFinales,
            }
        )
        return res.status(200).json(entrenamiento);
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error});
    }
}

export {generarEntrenamientoAutogenerado, verMiProgreso, completarRutina, verRutina, terminarRutina, crearEntrenamientoPersonalizado};