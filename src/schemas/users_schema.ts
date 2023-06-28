import mongoose from "mongoose";
const { Schema } = mongoose

const userSchema = new Schema({
    name: { type: String },
    user: { type: String },
    password: { type: String },
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User