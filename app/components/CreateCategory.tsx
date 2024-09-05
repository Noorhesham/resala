"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { z } from "zod";
import FormInput from "./FormInput";
import { Button } from "@/components/ui/button";
import { createCategory, updateCategory } from "../actions/actions"; // Replace with your actual category actions
import { useRouter } from "next/navigation";

const CategorySchema = z.object({
  name: z.string().min(1, { message: "Required" }),
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
        const serverRes = category?._id ? await updateCategory(data, category._id) : await createCategory(data);

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
        <FormInput label="Category Name" name="name" placeholder="Category Name" />
        <Button disabled={isPending}>{category ? "Update" : "Create"} Category</Button>
      </form>
    </Form>
  );
};

export default CreateCategoryForm;
