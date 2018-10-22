import mongoose from "mongoose";
import Label, { LabelModel } from "./Label";

export type CardModel = mongoose.Document & {
    name: string,
    description: string,
    isArchived: string,
    dueDate: Date,
    index: number,
    label: LabelModel
};

const cardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    isArchived: { type: Boolean, required: true },
    dueDate: Date,
    index:  { type: Number, required: true },
    label: Label
}, { timestamps: true });


const Card = mongoose.model("Card", cardSchema, "Cards");
export default Card;
