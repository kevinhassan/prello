import mongoose, { Schema } from "mongoose";
import Board, { BoardModel } from "./Board";

export type LabelModel = mongoose.Document & {
    name: string,
    color: string,
    board: BoardModel
};

const LabelSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    board: { type: Board, required: true }
}, { timestamps: true });

const Label = mongoose.model("Label", LabelSchema, "Labels");
export default Label;