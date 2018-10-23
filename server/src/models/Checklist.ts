import mongoose, { Schema } from "mongoose";
import Card, { CardModel } from "./Card";

export type ChecklistModel = mongoose.Document & {
    name: string,
    card: CardModel
};

const checklistSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    card: { type: Card, required: true}
}, { timestamps: true });


const Checklist = mongoose.model("Checklist", checklistSchema, "Checklists");
export default Checklist;
