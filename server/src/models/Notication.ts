import mongoose, { Schema } from "mongoose";
import Action, { ActionModel } from "./Action";
import User, { UserModel } from "./User";

export type NotificationModel = mongoose.Document & {
   readDate: Date,
   action: ActionModel,
   user: UserModel
};

const notificationSchema: Schema = new mongoose.Schema({
    readDate: Date,
    action: {type: Action, required: true},
    user: {type: User, required: true}
}, { timestamps: true });


const Notification = mongoose.model("Notification", notificationSchema, "Notifications");
export default Notification;
