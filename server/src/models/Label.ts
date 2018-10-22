import mongoose from "mongoose";

export type LabelModel = mongoose.Document & {
    name: string,
    color: string
};

const LabelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    color: { type: String, required: true }
}, { timestamps: true });

const Label = mongoose.model("Label", LabelSchema, "Labels");
export default Label;