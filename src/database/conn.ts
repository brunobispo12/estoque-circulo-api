import mongoose from 'mongoose';
import dotenv from "dotenv"

dotenv.config()

const serverAdress: string|undefined = process.env.DB_SERVER_ADRESS

async function connectDB() {
    try {
        await mongoose.connect(serverAdress ?? '')
        console.log(`conectado em: ${serverAdress}`)
    } catch (err) {
        console.log(err)
    }
}

export default connectDB