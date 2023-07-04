import mongoose from "mongoose";
const { Schema } = mongoose

const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    user: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, unique: true },
}, { timestamps: true, collection: 'users' })

const User = mongoose.model('User', userSchema)

export default User