import mongoose, { Schema } from "mongoose";
import PrivacyType, { PrivacyTypeModel } from "./PrivacyType";
import List from "./List";
import Label from "./Label";
import Team from "./Team";

export type BoardModel = mongoose.Document & {
    privacy: PrivacyTypeModel,
    name: string,
    isArchived: boolean,
    lists: [typeof mongoose.Types.ObjectId],
    labels: [typeof mongoose.Types.ObjectId],
    team: typeof mongoose.Types.ObjectId,
    owner: typeof mongoose.Types.ObjectId
};

const boardSchema: Schema = new mongoose.Schema({
    privacy: {type: PrivacyType, required: true},
    name: {type: String, required: true},
    isArchived: {type: Boolean, required: true, default: false},
    lists: [{type: typeof mongoose.Types.ObjectId, ref: "List"}],
    labels: [{type: typeof mongoose.Types.ObjectId, ref: "Label"}],
    team: [{type: typeof mongoose.Types.ObjectId, ref: "Team"}],
    owner: {type: typeof mongoose.Types.ObjectId, ref: "User"}
}, { timestamps: true });


const Board = mongoose.model("Board", boardSchema, "Boards");
export default Board;
