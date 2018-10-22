import mongoose from "mongoose";
import Checklist, { ChecklistModel } from "./Checklist";

export type ChecklistItemModel = mongoose.Document & {
    name: string,
    isChecked: boolean,
    checklist: ChecklistModel
};

const checklistItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isChecked: { type: Boolean, required: true },
    checklist: Checklist

}, { timestamps: true });


const ChecklistItem = mongoose.model("Checklist", checklistItemSchema, "Checklists");
export default ChecklistItem;
