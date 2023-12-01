import express from "express"
import router from "./router.js";
import cors from "cors"
import { conectardb } from "./mongo.js";
const PUERTO=4001;
const app = express();

app.use(express.json({limit: "20mb"}));
app.use(cors());

app.use(router)
conectardb();

app.listen(PUERTO,()=>{
    console.log(`app corriendo en el puerto ${PUERTO}`)
})