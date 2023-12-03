import mongoose, { Schema } from "mongoose";

const entrenamientoSchema = new mongoose.Schema({
    usuario:{
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
    fecha:{
        type: Date,
        required: true,
    },
    completado:{
        type: Boolean,
        required: true
    },
    terminado:{
        type: Boolean,
        required: true
    },
    tiempo:{
        type: Number,
        required: false
    },
    calorias:{
        type: Number,
        required: false
    },
    tipo: {
        type: String,
        required: true,
    },
    ejercicios:[
        {
            type: Schema.Types.ObjectId,
            ref: "Ejercicio"
        }
    ]
}
)

const Entrenaniento = mongoose.model('Entrenamiento', entrenamientoSchema);

export default Entrenaniento;