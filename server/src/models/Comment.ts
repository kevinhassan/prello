import * as mongoose from "mongoose";
import { Schema } from "mongoose";

export type CommentModel = mongoose.Document & {
  text: string,
  author: typeof mongoose.Schema.Types.ObjectId
};

const commentSchema: Schema = new mongoose.Schema({
  text: String,
  author: {
    type: typeof mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
  }
}, { timestamps: true });


const Comment = mongoose.model("Comment", commentSchema, "Comments");
export default Comment;
