import mongoose, { Schema } from "mongoose";
import Card from "./Card";

export type AttachmentModel = mongoose.Document & {
    name: string,
    url: string,
    card: typeof mongoose.Schema.Types.ObjectId
};

const attachmentSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    url:  { type: String, require: true },
    card: {
      type: typeof mongoose.Schema.Types.ObjectId,
      ref: "Card",
      required: true
    }
}, { timestamps: true });

const Attachment = mongoose.model("Attachment", attachmentSchema, "Attachments");
export default Attachment;