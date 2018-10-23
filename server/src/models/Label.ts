import mongoose, { Schema } from "mongoose";
import Board from "./Board";
import Card, { CardModel } from "./Card";

export type LabelModel = mongoose.Document & {
    name: string,
    color: string,
    cards: [CardModel]
};

const LabelSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    cards: [Card]
}, { timestamps: true });

const Label = mongoose.model("Label", LabelSchema, "Labels");
export default Label;