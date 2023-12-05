import express from "express";
import { registrarUsuario, login, verMiPerfil, editarPerfil} from "./controller/usuarioController.js";
import { generarEntrenamientoAutogenerado, verMiProgreso, completarRutina, verRutina, terminarRutina, crearEntrenamientoPersonalizado , buscarEntrenamientosPorFechaYUsuario} from "./controller/entrenamientoController.js";
import { guardarEjercicio, verEjercicios } from "./controller/ejercicioController.js";
const router = express.Router();

router.post("/registrar", registrarUsuario);
router.post("/login", login);
router.get("/ver/:token", verMiPerfil);
router.post("/editar", editarPerfil);
router.post("/entrenamiento/auto", generarEntrenamientoAutogenerado)
router.get("/entrenamiento/personalizado", crearEntrenamientoPersonalizado)
router.get("/entrenamiento/miprogreso/:token", verMiProgreso)
router.post("/entrenamiento/completar/:id", completarRutina)
router.post("/entrenamiento/terminar/:id", terminarRutina)
router.post("/entrenamiento/dia", buscarEntrenamientosPorFechaYUsuario)
router.get("/entrenamiento/:id", verRutina)
router.post("/ejercicios", guardarEjercicio)
router.get("/ejercicios", verEjercicios)



export default router;