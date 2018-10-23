import mongoose, { Schema } from "mongoose";
import ChecklistItem, { ChecklistItemModel } from "./ChecklistItem";

export type ChecklistModel = mongoose.Document & {
    name: string,
    checklistItems: [ChecklistItemModel]
};

const checklistSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    checklistItems: [ChecklistItem]
}, { timestamps: true });


const Checklist = mongoose.model("Checklist", checklistSchema, "Checklists");
export default Checklist;
