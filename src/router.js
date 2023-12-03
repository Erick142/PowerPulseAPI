import express from "express";
import { registrarUsuario, login, verMiPerfil} from "./controller/usuarioController.js";
import { generarEntrenamientoAutogenerado, verMiProgreso } from "./controller/entrenamientoController.js";
const router = express.Router();

router.post("/registrar", registrarUsuario);
router.post("/login", login);
router.get("/ver/:token", verMiPerfil);
router.get("/entrenamiento/auto", generarEntrenamientoAutogenerado)
router.get("/entrenamiento/miprogreso/:token", verMiProgreso)


export default router;