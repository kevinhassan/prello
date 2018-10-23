import mongoose, { Schema } from "mongoose";

export type ActionTypeModel = mongoose.Document & {
    name: string
};

const actionTypeSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true }
}, { timestamps: true });

const ActionType = mongoose.model("ActionType", actionTypeSchema, "ActionTypes");
export default ActionType;