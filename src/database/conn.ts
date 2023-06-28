import mongoose from 'mongoose';


async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/estoque-circulo')
        console.log('conectou')
    } catch (err) {
        console.log(err)
    }
}

export default connectDB