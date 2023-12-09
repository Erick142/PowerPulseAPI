import express from "express";
import { generarEntrenamientoAutogenerado, verMiProgreso, completarRutina, verRutina, terminarRutina, crearEntrenamientoPersonalizado , buscarEntrenamientosPorFechaYUsuario} from "./controller/entrenamientoController.js";
import { guardarEjercicio, verEjercicios } from "./controller/ejercicioController.js";
import routerUsuarios from "./routers/routerUsuario.js";
const router = express.Router();

router.use("/usuarios", routerUsuarios);

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