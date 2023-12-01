import mongoose from "mongoose";

export async function conectardb(){
    try{
        await mongoose.connect(`mongodb://ElAdminDePowerPulsexdxd038:PowerPassUWU@mongo:27017/power?authSource=admin`);
        console.log("conectado a la BD de POWERPULSE!!!!!!!");
    }catch(e){
        console.log("NO SE PUDO CONECTAR A LA BD DE POWERPULSE AHHHHHHHHHHHHHHH!!!!!!!");
        console.log(e);
    }
}