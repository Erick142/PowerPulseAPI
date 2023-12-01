import Usuario from "../model/usuarioModel.js";

async function registrarUsuario(req, res){
    try {
        const {nombre, email, password} = req.body;

        const usuario = await Usuario.create({
            nombre: nombre,
            email: email,
            password: password,
            imagen: "defecto.webp"
        })

        return res.status(200).json(usuario);
    } catch (e) {
        console.log(e);
        return res.status(200).json({error: e});
    }
}

export {registrarUsuario};