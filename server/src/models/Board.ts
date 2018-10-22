import mongoose from "mongoose";
import PrivacyType, { PrivacyTypeModel } from "./PrivacyType";
import List, { ListModel } from "./List";
import Label, { LabelModel } from "./Label";
import Team, { TeamModel } from "./Team";

export type BoardModel = mongoose.Document & {
    privacy: PrivacyTypeModel,
    name: string,
    isArchived: boolean,
    lists: [ListModel],
    labels: [LabelModel]
};

const boardSchema = new mongoose.Schema({
    privacy: {type: PrivacyType, required: true},
    name: {type: String, required: true},
    isArchived: {type: Boolean, default: false},
    lists: [List],
    labels: [Label]
}, { timestamps: true });


const Board = mongoose.model("Board", boardSchema, "Boards");
export default Board;
