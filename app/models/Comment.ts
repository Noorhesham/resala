import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema({
  secure_url: { type: String, required: true },
  public_id: { type: String, required: true },
});

const commentSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  photo: imageSchema,
  courseId: { type: Schema.Types.ObjectId, ref: "Course" },
});
export const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
