import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose

const itemSchema = new Schema({
    brand: { type: String, required: true },
    type: { type: String, required: true },
    condition: { type: String, required: true },
    patrimony: Number,
    item_id: { type: Number, required: true, unique: true },
    desc: String,
}, { timestamps: true, collection: 'itens' })

const Item = mongoose.model('Item', itemSchema)

export default Item