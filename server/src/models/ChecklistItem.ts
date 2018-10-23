import mongoose, { Schema } from "mongoose";
import Checklist, { ChecklistModel } from "./Checklist";

export type ChecklistItemModel = mongoose.Document & {
    name: string,
    isChecked: boolean,
    checklist: ChecklistModel
};

const checklistItemSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    isChecked: { type: Boolean, required: true },
    checklist: { type: Checklist, required: true}
}, { timestamps: true });


const ChecklistItem = mongoose.model("Checklist", checklistItemSchema, "Checklists");
export default ChecklistItem;
