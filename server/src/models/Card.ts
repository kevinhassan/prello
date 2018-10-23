import mongoose, { Schema } from "mongoose";
import Label from "./Label";
import List from "./List";
import { ChecklistItemModel } from "./ChecklistItem";
import Checklist from "./Checklist";

export type CardModel = mongoose.Document & {
    name: string,
    description: string,
    isArchived: string,
    dueDate: Date,
    index: number,
    labels: [typeof mongoose.Schema.Types.ObjectId],
    list: typeof mongoose.Schema.Types.ObjectId,
    checklists: [ChecklistItemModel],
    attachments: [typeof mongoose.Schema.Types.ObjectId],
    assignedMembers: [typeof mongoose.Schema.Types.ObjectId],
    comments: [typeof mongoose.Schema.Types.ObjectId]
};

const cardSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    isArchived: { type: Boolean, required: true, default: false },
    dueDate: Date,
    index:  { type: Number, required: true },
    labels: [{
      type: typeof mongoose.Schema.Types.ObjectId,
      ref: "Label"
    }],
    list: {
      type: typeof mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: true
    },
    checklists: [Checklist],
    attachments: [{type: typeof mongoose.Schema.Types.ObjectId, ref: "Attachment" }],
    assignedMembers: [{type: typeof mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
}, { timestamps: true });


const Card = mongoose.model("Card", cardSchema, "Cards");
export default Card;
