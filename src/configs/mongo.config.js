import mongoose from "mongoose";
import { config } from "./config.js";

export const connect = async ()=>{
    try{
        await mongoose.connect(
            config.mongo,
        )
        console.log('MongoDB connected')
    }catch(e){
        console.error(e)
    }
}