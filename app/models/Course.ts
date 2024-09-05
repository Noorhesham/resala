import mongoose, { Schema } from "mongoose";
const imageSchema = new Schema({
  secure_url: { type: String, required: true },
  public_id: { type: String, required: true },
});
const courseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [imageSchema],
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});
courseSchema.pre("find", function (this) {
  this.populate("category");
});
const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
export default Course;
