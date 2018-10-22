import mongoose from "mongoose";

export type NotificationModel = mongoose.Document & {
   readDate: Date
};

const notificationSchema = new mongoose.Schema({
    readDate: Date
}, { timestamps: true });


const Notification = mongoose.model("Notification", notificationSchema, "Notifications");
export default Notification;
