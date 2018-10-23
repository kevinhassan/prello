import mongoose, { Schema } from "mongoose";
import ActionType, { ActionTypeModel } from "./ActionType";
import User  from "./User";

export type ActionModel = mongoose.Document & {
    date: Date,
    type: ActionTypeModel,
    user: typeof mongoose.Schema.Types.ObjectId
};

const actionSchema: Schema = new mongoose.Schema({
    date: {type: Date, required: true},
    type: {type: ActionType, required: true},
    user: {
      type: typeof mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
}, { timestamps: true });


const Notification = mongoose.model("Action", actionSchema, "Actions");
export default Notification;
