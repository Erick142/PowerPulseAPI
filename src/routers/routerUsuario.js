import express from "express";
import { registrarUsuario, login, verMiPerfil, editarPerfil} from "../controller/usuarioController.js";

const routerUsuarios = express.Router();

routerUsuarios.post("/", registrarUsuario);
routerUsuarios.post("/login", login);
routerUsuarios.get("/perfil/:token", verMiPerfil);
routerUsuarios.put("/perfil/editar", editarPerfil);

export default routerUsuarios;