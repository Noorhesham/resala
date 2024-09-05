"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { z } from "zod";
import FormInput from "./FormInput";
import { Button } from "@/components/ui/button";
import { signup } from "../actions/actions"; // Replace with your actual comment actions

const CommentSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  email: z.string().email(),
  password: z.string().min(4, { message: "Required" }),
});

const SignupForm = () => {
  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
  });

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    startTransition(async () => {
      try {
        const serverRes = await signup(data);

        if (serverRes.success) {
          toast.success(serverRes.success);
          router.refresh();
        } else {
          toast.error(serverRes.error);
        }
      } catch (error) {
        toast.error("An error occurred while submitting the comment.");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
        <FormInput label="Name" name="name" placeholder=" Name" />
        <FormInput label="email" name="email" placeholder="Email" />
        <FormInput type="password" label="password" name="password" placeholder="Email" />
        <Button disabled={isPending}>Signup</Button>
      </form>
    </Form>
  );
};

export default SignupForm;
