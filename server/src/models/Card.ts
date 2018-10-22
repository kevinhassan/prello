import mongoose from "mongoose";

export type CardModel = mongoose.Document & {
    name: string,
    description: string,
    isArchived: string,
    dueDate: Date,
    index: number
};

const cardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    isArchived: { type: Boolean, required: true },
    dueDate: Date,
    index:  { type: Number, required: true }

}, { timestamps: true });


const Card = mongoose.model("Card", cardSchema, "Cards");
export default Card;
