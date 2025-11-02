import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

const url = process.env.DB_URL;

async function connectToDatabase(){
    try{
        await mongoose.connect(url);
        console.log('connect to MongoDB');
    } catch(error){
        console.log("Error connecting to MongoDB: ", error);
        throw error;
    }
}

export default connectToDatabase;