import mongoose from "mongoose";
import ActionType, { ActionTypeModel } from "./ActionType";
import User, { UserModel } from "./User";

export type ActionModel = mongoose.Document & {
    date: Date,
    type: ActionTypeModel,
    user: UserModel
};

const actionSchema = new mongoose.Schema({
    date: {type: Date, required: true},
    type: {type: ActionType, required: true},
    user: {type: User, required: true}
}, { timestamps: true });


const Notification = mongoose.model("Action", actionSchema, "Actions");
export default Notification;
