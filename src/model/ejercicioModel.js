import mongoose from "mongoose";

const ejericicioSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
    },
    musculo:{
        type: String,
        required: true,
    },
    descripcion:{
        type: String,
        required: true
    },
    sesiones:{
        type: Number,
        required: true
    },
    sesionesCompletadas:{
        type: Number,
        required: false
    },
    repeticiones:{
        type: Number,
        required: true
    },
    repeticionesCompletadas: {
        type: Number,
        required: false,
    },
    completado:{
        type: Boolean,
        required: true
    }
}
)

const Ejercicio = mongoose.model('Ejercicio', ejericicioSchema);

export default Ejercicio;