"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { z } from "zod";
import FormInput from "./FormInput";
import ImageInput from "./ImageInput";
import { Button } from "@/components/ui/button";
import { createComment, updateComment } from "../actions/actions"; // Replace with your actual comment actions
import PhotoInput from "./PhotoInput";

const CommentSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  description: z.string().min(1, { message: "Required" }),
  photo: z.any().optional(),
});

const CreateCommentForm = ({ comment, courseId }: { comment?: any; courseId: string }) => {
  console.log("comment", comment, courseId);
  const form = useForm<z.infer<typeof CommentSchema>>({
    defaultValues: {
      name: comment?.name || "",
      description: comment?.description || "",
    },
    resolver: zodResolver(CommentSchema),
  });

  const [isPending, startTransition] = useTransition();
  const [photoPreview, setPhotoPreview] = useState<string[]>(comment?.photo ? [comment.photo.secure_url] : []);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    startTransition(async () => {
      try {
        let commentData = { ...data, courseId };
        console.log("Comment data", commentData);
        if (data.photo) {
          const formData = new FormData();
          formData.append("file", data.photo);
          formData.append("upload_preset", "v7t8mt9o");

          const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL!, {
            method: "POST",
            body: formData,
          });
          console.log(res);
          if (!res.ok) {
            throw new Error("Failed to upload photo");
          }

          const cloudinaryData = await res.json();
          commentData.photo = {
            secure_url: cloudinaryData.secure_url,
            public_id: cloudinaryData.public_id,
          };
        }

        const serverRes = comment?._id
          ? await updateComment(commentData, comment._id)
          : await createComment(commentData);
        console.log("serverRes", serverRes);
        if (serverRes.success) {
          toast.success(serverRes.success);
          router.refresh();
        } else {
          toast.error(serverRes);
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while submitting the comment.");
      }
    });
  };
  console.log(form.formState.errors);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
        <FormInput label="Name" name="name" placeholder="Your Name" />
        <FormInput label="Description" name="description" placeholder="Comment" />
        <PhotoInput />
        <Button disabled={isPending}>{comment ? "Update" : "Add"} Comment</Button>
      </form>
    </Form>
  );
};

export default CreateCommentForm;
