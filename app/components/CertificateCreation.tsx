"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { createCertificate, updateCertificate } from "../actions/actions"; // Replace with your actual actions
import { Form } from "@/components/ui/form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// Validation schema using Zod
const CertificateSchema = z.object({
  person: z.string().min(1, { message: "Person's name is required" }),
  course: z.string().min(1, { message: "Course selection is required" }),
  code: z.string().min(1, { message: "Code is required" }),
});

const CreateCertificateForm = ({ courses, certificate }: { courses: any[]; certificate?: any }) => {
  const form = useForm<z.infer<typeof CertificateSchema>>({
    resolver: zodResolver(CertificateSchema),
    defaultValues: {
      person: certificate?.person || "",
      course: certificate?.course || "",
      code: certificate?.code || "",
    },
  });
  const router = useRouter();
  const onSubmit = async (data: any) => {
    try {
      const result = certificate?._id ? await updateCertificate(data, certificate._id) : await createCertificate(data);
      console.log(result);
      if (result.success) {
        toast.success("Certificate created successfully");
        router.refresh();
      } else {
        toast.error("Error creating certificate");
      }
    } catch (error) {
      console.error("Failed to create certificate", error);
    }
  };
  console.log(courses);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <FormInput label="Person" name="person" placeholder="Person's Name" />
        <FormInput label="code" name="code" placeholder="code" />
        <FormSelect label="Course" name="course" options={courses} />
        <Button type="submit">Create Certificate</Button>
      </form>
    </Form>
  );
};

export default CreateCertificateForm;
