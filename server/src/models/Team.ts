import mongoose, { Schema } from "mongoose";
import User, { UserModel } from "./User";
import Board from "./Board";

export type TeamModel = mongoose.Document & {
    name: string,
    description: string,
    isVisible: boolean,
    avatarUrl: string,
    admin: typeof mongoose.Schema.Types.ObjectId,
    users: [typeof mongoose.Schema.Types.ObjectId],
    boards: [typeof mongoose.Schema.Types.ObjectId]
};

const teamSchema: Schema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    isVisible: {type: Boolean, required: false},
    avatarUrl: String,
    admin: {
        type: typeof mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    users: [{
      type: typeof mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    boards: [{
        type: typeof mongoose.Schema.Types.ObjectId,
        ref: "Board"
    }]
}, { timestamps: true });


const Team = mongoose.model("Team", teamSchema, "Teams");
export default Team;
