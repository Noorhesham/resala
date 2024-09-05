"use server";
import Course from "../models/Course";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/User";
import bcrypt from "bcrypt";
import Category from "../models/Category";
import { Comment } from "../models/Comment";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import connect from "@/lib/clientPromise";
import Certificate from "../models/Certificate";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getCourses = async (page = 1, filter?: string, all = false) => {
  try {
    await connect();
    console.log(page, filter);
    const skip = (page - 1) * 1;
    const query = filter ? { category: filter } : {};
    const courses = all ? await Course.find({}) : await Course.find(query).skip(skip).limit(10);
    const totalPages = Math.ceil((await Course.countDocuments(query)) / 10);
    console.log(courses, query);
    const courseObj = JSON.parse(JSON.stringify(courses));
    return { success: "Course fetched successfully", data: { courses: courseObj, totalPages } };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred while fetching the course.", details: error };
  }
};
export async function deleteImage(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (!result) throw new Error("An error occurred while processing the request. Please try again!");
    return { success: "Image deleted successfully!", status: 200 };
  } catch (error) {
    console.log(error);
  }
}

export const deleteCourse = async (id: string) => {
  const course = await Course.findById(id);
  course?.images.forEach(async (image: any) => {
    await deleteImage(image.publicId);
  });
  await Course.findByIdAndDelete(id);
  return { success: "Course deleted successfully" };
};

export const updateCourse = async (data: any, id: string) => {
  const course = await Course.findByIdAndUpdate(id, data, { new: true });
  revalidatePath("/");

  const courseObj = JSON.parse(JSON.stringify(course));
  return { success: "Course updated successfully", data: courseObj };
};
export const createCourse = async (data: any) => {
  const course = await Course.create(data);
  const courseObj = JSON.parse(JSON.stringify(course));
  revalidatePath("/");
  return { success: "Course created successfully", data: courseObj };
};

export const deleteCourseImage = async (id: string, imageId: string) => {
  try {
    await deleteImage(imageId);
    revalidatePath("/");

    const course = await Course.findById(id);
    if (!course) {
      return { error: "Course not found" };
    }

    const imageIndex = course.images.findIndex((image: any) => image.public_id === imageId);
    if (imageIndex === -1) {
      return { error: "Image not found in the course" };
    }
    course.images.splice(imageIndex, 1);

    await course.save();
    return { success: "Image deleted successfully" };
  } catch (error: any) {
    return { error: "An error occurred while deleting the image", details: error.message };
  }
};

export const signup = async (data: any) => {
  try {
    // Hash the password
    await connect();
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create a new user with the hashed password
    const newUser = await User.create({
      ...data,
      password: hashedPassword,
    });
    const userObj = JSON.parse(JSON.stringify(newUser));
    return { success: "User created successfully", data: userObj };
  } catch (error: any) {
    // Handle potential errors
    console.log(error);
    return { error: "User creation failed", details: error.message };
  }
};

export const createCategory = async (data: any) => {
  const category = await Category.create(data);
  revalidateTag("categories");

  return { success: "Category created successfully", data: category };
};

export const updateCategory = async (data: any, id: string) => {
  const category = await Category.findByIdAndUpdate(id, data, { new: true });
  revalidateTag("categories");
  return { success: "Category updated successfully", data: category };
};

export const deleteCategory = async (id: string) => {
  await Category.findByIdAndDelete(id);
  revalidateTag("categories");

  return { success: "Category deleted successfully" };
};

// CRUD Actions for Comments
export const createComment = async (data: any) => {
  const comment = await Comment.create(data);
  await Course.findByIdAndUpdate(data.courseId, { $push: { comments: comment._id } });
  const commentObj = JSON.parse(JSON.stringify(comment));

  return { success: "Comment created successfully", data: commentObj };
};

export const updateComment = async (data: any, id: string) => {
  const comment = await Comment.findByIdAndUpdate(id, data, { new: true });
  const commentObj = JSON.parse(JSON.stringify(comment));
  return { success: "Comment updated successfully", data: commentObj };
};

export const deleteComment = async (id: string) => {
  const comment = await Comment.findById(id);
  if (comment.photo) {
    await cloudinary.uploader.destroy(comment.photo.public_id);
  }
  await Course.findByIdAndUpdate(comment.courseId, { $pull: { comments: id } });
  await Comment.findByIdAndDelete(id);
  return { success: "Comment deleted successfully" };
};
export const getCaategoriesCache = unstable_cache(async () => await Category.find({}).lean(), ["categories"], {
  tags: ["categories"],
});
// export const getPaginatedCourses
export const createCertificate = async (data: any) => {
  try {
    const certificate = await Certificate.create(data);
    await Course.findByIdAndUpdate(data.course, { $push: { certificates: certificate._id } });
    const certificateObj = JSON.parse(JSON.stringify(certificate));

    return { success: "Certificate created successfully", data: certificateObj };
  } catch (error:any) {
    return { error: "Error creating certificate", details: error.message };
  }
};

// Update an existing certificate
export const updateCertificate = async (data: any, id: string) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(id, data, { new: true });
    const certificateObj = JSON.parse(JSON.stringify(certificate));

    return { success: "Certificate updated successfully", data: certificateObj };
  } catch (error:any) {
    return { error: "Error updating certificate", details: error.message };
  }
};

// Delete a certificate
export const deleteCertificate = async (id: string) => {
  try {
    const certificate = await Certificate.findById(id);

    // Remove the certificate reference from the course
    if (certificate && certificate.course) {
      await Course.findByIdAndUpdate(certificate.course, { $pull: { certificates: id } });
    }

    await Certificate.findByIdAndDelete(id);

    return { success: "Certificate deleted successfully" };
  } catch (error:any) {
    return { error: "Error deleting certificate", details: error.message };
  }
};
