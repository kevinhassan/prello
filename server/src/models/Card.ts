import mongoose, { Schema } from "mongoose";
import Label, { LabelModel } from "./Label";
import List, { ListModel } from "./List";

export type CardModel = mongoose.Document & {
    name: string,
    description: string,
    isArchived: string,
    dueDate: Date,
    index: number,
    label: LabelModel,
    list: ListModel
};

const cardSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    isArchived: { type: Boolean, required: true, default: false },
    dueDate: Date,
    index:  { type: Number, required: true },
    label: Label,
    list: List
}, { timestamps: true });


const Card = mongoose.model("Card", cardSchema, "Cards");
export default Card;
