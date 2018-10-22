import mongoose from "mongoose";

export type PrivacyTypeModel = mongoose.Document & {
    name: string
};

const privacyTypeModel = new mongoose.Schema({
    name: { type: String, required: true }
}, { timestamps: true });

const PrivacyType = mongoose.model("PrivacyType", privacyTypeModel, "PrivacyTypes");
export default PrivacyType;