import mongoose, { Schema } from "mongoose";

export type PrivacyTypeModel = mongoose.Document & {
    name: string
};

const privacyTypeModel: Schema = new mongoose.Schema({
    name: { type: String, required: true }
}, { timestamps: true });

const PrivacyType = mongoose.model("PrivacyType", privacyTypeModel, "PrivacyTypes");
export default PrivacyType;