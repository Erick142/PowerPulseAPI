import express from "express";
import { registrarUsuario } from "./controller/usuarioController.js";
const router = express.Router();

router.post("/registrar", registrarUsuario);

export default router;