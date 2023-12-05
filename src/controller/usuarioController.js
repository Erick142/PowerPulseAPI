import Usuario from "../model/usuarioModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const SECRETKEY= "secret";
export {SECRETKEY};

async function registrarUsuario(req, res){
    try {
        const {nombre, email, password} = req.body;

        const usuario = await Usuario.create({
            nombre: nombre,
            email: email,
            password: await bcrypt.hash(password,8),
            imagen: "defecto.webp"
        })

        return res.status(200).json(usuario);
    } catch (e) {
        console.log(e);
        return res.status(200).json({error: e});
    }
}

async function login(req,res){
    try {
        const { email, password } = req.body;
        console.log(email)

        const usuario = await Usuario.findOne({email});

        if(!usuario){
            return res.status(404).json({exito: false, error: "no se encontro usuario"});
        }
        const result = await bcrypt.compare(password, usuario.password);
        if(!result){
            return res.status(404).json({exito: false, error: "contraseña no concuerda"});
        }
        
        const token = jwt.sign({id:usuario._id.toHexString()}, SECRETKEY, {expiresIn: "24h"});
        return res.status(200).json({exito: true, token: token});
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: error})
    }
}

async function verMiPerfil(req,res){
    try {
        const {token} = req.params;
        let iduser= jwt.verify(token,SECRETKEY);
        console.log(iduser)
        const user = await Usuario.findById(iduser.id);
        console.log(user)
        const enviar={
            _id: user._id,
            nombre: user.nombre,
            email: user.email,
            imagen: user.imagen,
            altura: user.altura,
            peso: user.peso,
            edad: user.edad,
        }
        return res.status(200).json({usuario: enviar});
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: error})
    }
}
async function editarPerfil(req,res){
    try {
        const {token, nombre, peso, altura, edad} = req.body;
        let iduser= jwt.verify(token,SECRETKEY);
        console.log(iduser)
        let user = await Usuario.findById(iduser.id);
        user.nombre= nombre;
        user.peso= peso;
        user.altura= altura;
        user.edad=edad;
        user = await user.save();
        const enviar={
            _id: user._id,
            nombre: user.nombre,
            email: user.email,
            imagen: user.imagen,
            altura: user.altura,
            peso: user.peso,
            edad: user.edad,
        }
        return res.status(200).json({usuario: enviar});
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: error})
    }
}
export {registrarUsuario, login, verMiPerfil, editarPerfil};