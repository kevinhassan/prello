import mongoose from "mongoose";
import Card, { CardModel } from "./Card";

export type ChecklistModel = mongoose.Document & {
    name: string,
    card: CardModel
};

const checklistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    card: Card

}, { timestamps: true });


const Checklist = mongoose.model("Checklist", checklistSchema, "Checklists");
export default Checklist;
