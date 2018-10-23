import mongoose, { Schema } from "mongoose";
import PrivacyType, { PrivacyTypeModel } from "./PrivacyType";
import List, { ListModel } from "./List";
import Label, { LabelModel } from "./Label";
import Team, { TeamModel } from "./Team";

export type BoardModel = mongoose.Document & {
    privacy: PrivacyTypeModel,
    name: string,
    isArchived: boolean,
    lists: [ListModel],
    labels: [LabelModel],
    team: TeamModel
};

const boardSchema: Schema = new mongoose.Schema({
    privacy: {type: PrivacyType, required: true},
    name: {type: String, required: true},
    isArchived: {type: Boolean, required: true, default: false},
    lists: [List],
    labels: [Label],
    team: Team
}, { timestamps: true });


const Board = mongoose.model("Board", boardSchema, "Boards");
export default Board;
