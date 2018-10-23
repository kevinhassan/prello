import mongoose, { Schema } from "mongoose";
import Card, { CardModel } from "./Card";

export type AttachmentModel = mongoose.Document & {
    name: string,
    url: string,
    card: CardModel
};

const attachmentSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    url:  { type: String, require: true },
    card: { type: Card, required: true }
}, { timestamps: true });

const Attachment = mongoose.model("Attachment", attachmentSchema, "Attachments");
export default Attachment;