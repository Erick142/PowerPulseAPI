import Usuario from "../model/usuarioModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const SECRETKEY = "secret";
export { SECRETKEY };

async function registrarUsuario(req, res) {
    try {
        // Extraer datos del cuerpo de la solicitud
        const { nombre, email, password } = req.body;

        // Verificar si algún parámetro es null o indefinido
        if (!nombre || !email || !password) {
            return res.status(400).json({ exito: false, error: "Todos los campos son obligatorios." });
        }

        // Convertir el email a minúsculas antes de verificar la existencia del usuario
        const emailMinusculas = email.toLowerCase();

        // Verificar si ya existe un usuario con el mismo email
        const usuarioPrevio = await Usuario.findOne({ email: emailMinusculas });
        if (usuarioPrevio) {
            return res.status(409).json({ exito: false, error: `Ya existe un usuario con el email ${emailMinusculas} en el sistema.` });
        }

        // Crear el nuevo usuario con la contraseña cifrada
        const usuario = await Usuario.create({
            nombre,
            email: emailMinusculas,
            password: await bcrypt.hash(password, 8),
            imagen: "defecto.webp"
        });

        // Devolver el usuario recién creado
        return res.status(200).json({exito: true});
    } catch (error) {
        // Manejar errores y devolver una respuesta adecuada
        console.error(error);
        return res.status(500).json({ exito: false, error: "Error al registrar usuario." });
    }
}

async function login(req, res) {
    try {
        // Extraer datos del cuerpo de la solicitud
        const { email, password } = req.body;

        // Verificar si algún parámetro es null o indefinido
        if (!email || !password) {
            return res.status(400).json({ exito: false, error: "Todos los campos son obligatorios." });
        }

        // Convertir el email a minúsculas antes de verificar la existencia del usuario
        const emailMinusculas = email.toLowerCase();

        // Buscar al usuario en la base de datos
        const usuario = await Usuario.findOne({ email: emailMinusculas });

        // Verificar si el usuario existe
        if (!usuario) {
            return res.status(404).json({ exito: false, error: `No existe un usuario con el email ${emailMinusculas} en el sistema.` });
        }

        // Comparar contraseñas
        const contrasenaCorrecta = await bcrypt.compare(password, usuario.password);
        if (!contrasenaCorrecta) {
            return res.status(401).json({ exito: false, error: "Contraseña incorrecta. Verifica tus credenciales e intenta nuevamente." });
        }

        // Generar token de autenticación
        const token = jwt.sign({ id: usuario._id.toHexString() }, SECRETKEY, { expiresIn: "24h" });

        // Devolver token en caso de éxito
        return res.status(200).json({ exito: true, token: token });
    } catch (error) {
        // Manejar errores y devolver una respuesta adecuada
        console.error(error);
        return res.status(500).json({ exito: false, error: "Ocurrió un error en login." });
    }
}

async function verMiPerfil(req, res) {
    try {
        // Obtener el token del parámetro de la solicitud
        const { token } = req.params;

        // Verificar si token es null o indefinido
        if (!token) {
            return res.status(400).json({ exito: false, error: "El token es necesario." });
        }

        // Decodificar el token utilizando la clave secreta
        let jwtDecoded;
        try {
            jwtDecoded = jwt.verify(token, SECRETKEY);
        } catch (error) {
            return res.status(401).json({ error: "El token es inválido." });
        }

        // Buscar al usuario en la base de datos utilizando el ID del token decodificado
        const usuario = await Usuario.findById(jwtDecoded.id);

        // Verificar si el usuario existe
        if (!usuario) {
            return res.status(404).json({ exito: false, error: `No existe un usuario con el id ${jwtDecoded.id} en el sistema.` });
        }

        // Crear un objeto sin la contraseña para enviar como respuesta
        const usuarioSinPassword = {
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            imagen: usuario.imagen,
            altura: usuario.altura,
            peso: usuario.peso,
            edad: usuario.edad,
        };

        // Devolver el usuario sin contraseña como respuesta exitosa
        return res.status(200).json(usuarioSinPassword);
    } catch (error) {
        // Manejar errores y devolver una respuesta adecuada
        console.error(error);
        return res.status(500).json({ error: "Error al ver mi perfil." });
    }
}

async function editarPerfil(req, res) {
    try {
        // Extraer datos del cuerpo de la solicitud
        const { token, nombre, peso, altura, edad } = req.body;

        // verificar si no es "" y no es numero.
        if((peso!="" && isNaN(parseInt(peso,10))) || (altura!="" && isNaN(parseInt(altura,10))) || (edad!="" && isNaN(parseInt(edad,10)))){
            return res.status(400).json({ exito: false, error: "error en los parametros" });
        }

        // Verificar si token es null o indefinido
        if (!token) {
            return res.status(400).json({ exito: false, error: "El token es necesario." });
        }

        // Decodificar el token utilizando la clave secreta
        let jwtDecoded;
        try {
            jwtDecoded = jwt.verify(token, SECRETKEY);
        } catch (error) {
            return res.status(401).json({ exito: false, error: "El token es inválido." });
        }

        // Buscar al usuario en la base de datos utilizando el ID del token decodificado
        let usuario = await Usuario.findById(jwtDecoded.id);

        // Verificar si el usuario existe
        if (!usuario) {
            return res.status(404).json({ exito: false, error: `No existe un usuario con el id ${jwtDecoded.id} en el sistema.` });
        }

        // Actualizar los campos solo si no son null o undefined
        if (nombre !== null && nombre !== undefined && nombre!="") {
            usuario.nombre = nombre;
        }
        if (peso !== null && peso !== undefined && peso!="") {
            usuario.peso =  Number(peso);
        }
        if (altura !== null && altura !== undefined && altura!="") {
            usuario.altura = Number(altura);
        }
        if (edad !== null && edad !== undefined && edad!="") {
            usuario.edad = Number(edad);
        }

        // Guardar los cambios en la base de datos
        usuario = await usuario.save();

        return res.status(200).json({ exito: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ exito: false, error: "Error en editar perfil." });
    }
}

export { registrarUsuario, login, verMiPerfil, editarPerfil };