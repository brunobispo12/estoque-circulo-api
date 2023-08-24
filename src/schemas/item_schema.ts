import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose

const itemSchema = new Schema({
    brand: { type: String, required: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    condition: { type: String, required: true },
    item_id: { type: String, required: true, unique: true },
    available: { type: String, required: true },
    desc: { type: String },
    location: {
        sector: { type: String },
        borrower: { type: String },
        borrowDate: { type: String }
    }
}, { timestamps: true, collection: 'itens' });

const Item = mongoose.model('Item', itemSchema)

export default Item