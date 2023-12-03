import Usuario from "../model/usuarioModel.js";
import Entrenamiento from "../model/entrenamientoModel.js";
import { obtenerEjerciciosPorMusculo } from "./ejercicioController.js";
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
    if(musculos.length>3){
        nDeEjercicios= musculos.length;
    }
    for (let i = 0; i < nDeEjercicios; i++) {
        let y = 0;
        const listaEjercicios = obtenerEjerciciosPorMusculo(musculos[y]);
        const ejercicio = listaEjercicios[Math.floor(Math.random() * listaEjercicios.length)];

        const ejercicioCompleto = await Ejercicio.create(
            {
                nombre: ejercicio.nombre,
                musculo: ejercicio.musculo,
                descripcion: ejercicio.descripcion,
                sesiones: 3,
                sesionesCompletadas: 0,
                repeticiones: 12,
                repeticionesCompletadas: 0,
                completado: false,
            }
        )
        ejercicios.push(ejercicioCompleto);

        y++;
        if(y>=musculos.length){
            y=0;
        }
    }
    return ejercicios;
}

async function entrenamientoConData(musculos, usuario){
    let nDeEjercicios= 3;
    if(musculos.length>3){
        nDeEjercicios= musculos.length;
    }
    const ejercicios = [];
    const fechaSemanaPasada = new Date();
    fechaSemanaPasada.setDate(fechaSemanaPasada.getDate() - 7);

    const entrenamientosSemanaPasada = await Entrenamiento.find({
        usuario: usuario,
        fecha: { $gte: fechaSemanaPasada, $lte: new Date() },
    }).populate("ejercicios");
    console.log(entrenamientosSemanaPasada);
    let agregado=0;
    if(entrenamientosSemanaPasada.every((object)=> object.completado==true)){
        agregado=2;
    }

    const ultimoEntrenamiento = entrenamientosSemanaPasada.reduce((maxFecha, objeto) => {
        const fechaActual = objeto.fecha;
        return fechaActual > maxFecha.fecha ? objeto : maxFecha;
    }, entrenamientosSemanaPasada[0]); 
    const ejerciciosAnteriores = ultimoEntrenamiento.ejercicios;

    const ejerciciosADescartar= ejerciciosAnteriores;
    let indiceMusculo = 0;

    while (ejercicios.length < nDeEjercicios) {
        const listaEjercicios = obtenerEjerciciosPorMusculo(musculos[indiceMusculo]);
        const posiblesEjercicios= [];
        for (const ejercicio of listaEjercicios) {
            if(!ejerciciosADescartar.some((object)=> object.nombre==ejercicio.nombre)){
                posiblesEjercicios.push(ejercicio);
            }
        }

        const ejercicio = posiblesEjercicios[Math.floor(Math.random() * posiblesEjercicios.length)];

        const nuevoEjercicio = await Ejercicio.create({
            nombre: ejercicio.nombre,
            musculo: ejercicio.musculo,
            descripcion: ejercicio.descripcion,
            sesiones: 3,
            sesionesCompletadas: 0,
            repeticiones: 12+agregado,
            repeticionesCompletadas: 0,
            completado: false,
        });
        ejercicios.push(nuevoEjercicio);
        ejerciciosADescartar.push(nuevoEjercicio);

        indiceMusculo = (indiceMusculo + 1) % musculos.length;
    }
    return ejercicios;

}

async function verMiProgreso(req, res){
    try {
        const {token} = req.params;
        let decodedToken = jwt.verify(token,SECRETKEY);
        const idUsuario = decodedToken.id;
        const usuario = await Usuario.findById(idUsuario);

        let entrenamientos = await Entrenamiento.find({usuario: usuario});
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

export {generarEntrenamientoAutogenerado, verMiProgreso};