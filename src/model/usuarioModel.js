import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    imagen:{
        type: String,
        required: true
    },
    altura:{
        type: Number,
        required: false
    },
    peso:{
        type: Number,
        required: false
    }
}
)

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;