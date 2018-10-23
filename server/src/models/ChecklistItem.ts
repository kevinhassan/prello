import mongoose, { Schema } from "mongoose";
import Checklist from "./Checklist";

export type ChecklistItemModel = mongoose.Document & {
    name: string,
    isChecked: boolean
};

const checklistItemSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    isChecked: { type: Boolean, required: true }
}, { timestamps: true });


const ChecklistItem = mongoose.model("Checklist", checklistItemSchema, "Checklists");
export default ChecklistItem;
