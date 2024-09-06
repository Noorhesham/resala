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
  const t = useTranslations("form");
  const form = useForm({
    resolver: zodResolver(sendSchema),
    mode: "onChange",
  });
  const [isPending, startTransition] = useTransition();
  const onSubmit = async (data: z.infer<typeof sendSchema>) => {
    startTransition(async () => {
      try {
        const response = await sendEmail(data, course);

        if (response.success) {
          toast.success(t("successMessage"));
        }
      } catch (error: any) {
        toast.error(t("errorMessage"));
      }
    });
  };
  const formArray = [
    {
      name: "name",
      label: t("name"),
      placeholder: t("namePlaceholder"),
      type: "text",
    },
    {
      name: "email",
      label: t("email"),
      placeholder: t("emailPlaceholder"),
      type: "email",
    },
    {
      name: "message",
      label: t("message"),
      placeholder: t("messagePlaceholder"),
      type: "text",
      area: true,
    },
  ];
  return (
    <div className="h-full w-full self-stretch">
      <CustomForm isPending={isPending} inputs={formArray} form={form} onSubmit={onSubmit} />
    </div>
  );
};

export default FormSend;
