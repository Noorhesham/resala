"use client";
import React, { useTransition } from "react";
import CustomForm from "./CustomForm";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { sendEmail } from "../actions/actions";

const sendSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  email: z.string().email({ message: "Invalid email" }),
  message: z.string().optional(),
  course: z.string().optional(),
});

const FormSend = ({ course }: { course: any }) => {
  const t = useTranslations();
  const form = useForm({
    resolver: zodResolver(sendSchema),
    mode: "onChange",
  });
  const [isPending, startTransition] = useTransition();
  const onSubmit = async (data: z.infer<typeof sendSchema>) => {
    startTransition(async () => {
      try {
        const response = await sendEmail(data, course);

        console.log(response);

        if (response.success) {
          toast.success("Message sent successfully!");
        }
      } catch (error: any) {
        toast.error(error);
      }
    });
  };
  const formArray = [
    {
      name: "name",
      label: "Name",
      placeholder: "Name",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Email",
      type: "email",
    },
    {
      name: "message",
      label: "Message",
      placeholder: "Message",
      type: "text",
      area: true,
    },
  ];
  return (
    <div>
      <CustomForm isPending={isPending} inputs={formArray} form={form} onSubmit={onSubmit} />
    </div>
  );
};

export default FormSend;
