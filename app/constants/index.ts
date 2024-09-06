import Course from "../models/Course";
import User from "../models/User";
import Category from "../models/Category";
import Comment from "../models/Comment";
import Certificate from "../models/Certificate";
export type ModelProps = "Course" | "User" | "Category" | "Comment" | "Certificate";
const models: Record<ModelProps, any> = {
  Course,
  User,
  Category,
  Comment,
  Certificate,
};

export default models;
