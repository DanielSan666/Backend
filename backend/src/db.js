import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://danielsanchez170298:1234@curso.8tmq2rj.mongodb.net/?retryWrites=true&w=majority&appName=Curso");
        console.log(">>>Db is connected");
    }catch(error){
        console.log(error);
    }
}