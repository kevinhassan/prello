import mongoose from "mongoose";
import Card, { CardModel } from "./Card";

export type ListModel = mongoose.Document & {
    name: string,
    isArchived: boolean,
    index: number,
    cards: [ CardModel ]
};

const listSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isArchived: { type: Boolean, required: true, default: false },
    index: { type: Number, required: true },
    card: [ Card ],
}, { timestamps: true });

const List = mongoose.model("List", listSchema, "Lists");
export default List;