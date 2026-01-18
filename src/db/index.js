import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async ()=>{
    try {
       const connectionIntstance =   await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       console.log(`\n Database Connected || DB host: ${connectionIntstance.connection.host}`);
       
    } catch (error) {
        console.log("Database error ",error);
        process.exit(1)
        
    }
}

export default connectDB