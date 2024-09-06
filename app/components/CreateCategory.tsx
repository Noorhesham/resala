"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {  createEntity,  updateEntity } from "../actions/actions"; // Replace with your actual category actions
import { useRouter } from "next/navigation";
import ArabicEnglishForm from "./ArabicEnglishForm";

const CategorySchema = z.object({
  name: z.object({
    ar: z.string().min(1, { message: "Required" }),
    en: z.string().min(1, { message: "الحقل مطلوب" }),
  }),
});

const CreateCategoryForm = ({ category }: { category?: any }) => {
  const form = useForm<z.infer<typeof CategorySchema>>({
    defaultValues: {
      name: category?.name || "",
    },
    resolver: zodResolver(CategorySchema),
  });

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onSubmit = async (data: any) => {
    startTransition(async () => {
      try {
        const serverRes = category?._id
          ? await updateEntity("Category", category._id, data)
          : await createEntity("Category", data);

        if (serverRes.success) {
          toast.success(serverRes.success);
          router.refresh();
        } else {
          toast.error(serverRes.error);
        }
      } catch (error) {
        toast.error("An error occurred while submitting the category.");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
        <ArabicEnglishForm nodesc={true} />
        <Button disabled={isPending}>{category ? "Update" : "Create"} Category</Button>
      </form>
    </Form>
  );
};

export default CreateCategoryForm;
