import mongoose from "mongoose";
import { config } from "./config.js";




export const connectToDB = async () =>{
    try{
        await mongoose.connect(config.MONGO_URI)
        console.log('DB connected')
    }
    catch(err){
        console.log('db connection error' , err)
    }
}