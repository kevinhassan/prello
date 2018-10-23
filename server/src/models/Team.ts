import mongoose, { Schema } from "mongoose";
import User, { UserModel } from "./User";
import Board, { BoardModel } from "./Board";

export type TeamModel = mongoose.Document & {
    name: string,
    description: string,
    isVisible: boolean,
    url: string,
    users: [UserModel],
    boards: [BoardModel]
};

const teamSchema: Schema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    isVisible: {type: Boolean, required: true},
    url: String,
    users: [User],
    boards: [Board]
}, { timestamps: true });


const Team = mongoose.model("Team", teamSchema, "Teams");
export default Team;
