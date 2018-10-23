import mongoose, { Schema } from "mongoose";
import Card from "./Card";

export type ListModel = mongoose.Document & {
    name: string,
    isArchived: boolean,
    index: number,
    cards: [ typeof mongoose.Schema.Types.ObjectId ]
};

const listSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    isArchived: { type: Boolean, required: true, default: false },
    index: { type: Number, required: true },
    cards: [{type: typeof mongoose.Schema.Types.ObjectId, ref: "Card"}],
}, { timestamps: true });

const List = mongoose.model("List", listSchema, "Lists");
export default List;