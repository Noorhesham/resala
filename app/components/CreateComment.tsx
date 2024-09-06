"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { createComment, createEntity, updateComment, updateEntity } from "../actions/actions"; // Replace with your actual comment actions
import PhotoInput from "./PhotoInput";
import ArabicEnglishForm from "./ArabicEnglishForm";

const CommentSchema = z.object({
  name: z.object({
    ar: z.string().min(1, { message: "Required" }),
    en: z.string().min(1, { message: "الحقل مطلوب" }),
  }),
  description: z.object({
    ar: z.string().min(1, { message: "Required" }),
    en: z.string().min(1, { message: "الحقل مطلوب" }),
  }),
  photo: z.any().optional(),
});

const CreateCommentForm = ({ comment, courseId }: { comment?: any; courseId: string }) => {
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
        console.log(commentData);
        const serverRes = comment?._id
          ? await updateEntity("Comment", comment._id, { ...commentData, courseId })
          : await createEntity("Comment", commentData);

        if (serverRes.success) {
          toast.success(serverRes.success);
          router.refresh();
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
        <ArabicEnglishForm />
        <PhotoInput value={comment?.photo?.secure_url} />
        <Button disabled={isPending}>{comment ? "Update" : "Add"} Comment</Button>
      </form>
    </Form>
  );
};

export default CreateCommentForm;
