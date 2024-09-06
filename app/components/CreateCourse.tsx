"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { z } from "zod";
import FormInput from "./FormInput";
import { PenIcon, PlusIcon } from "lucide-react";
import { updateCourse, createCourse, getCaategoriesCache, getEntities } from "../actions/actions"; // Replace with your actual course actions
import ImageInput from "./ImageInput"; // Assume this component is updated to handle multiple images
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import FormSelect from "./FormSelect";
import ArabicEnglishForm from "./ArabicEnglishForm";
import { useLocale } from "next-intl";

// Define the schema for the course form validation using Zod
const CourseSchema = z.object({
  name: z.object({
    ar: z.string().min(1, { message: "Required" }),
    en: z.string().min(1, { message: "الحقل مطلوب" }),
  }),
  description: z.object({
    ar: z.string().min(1, { message: "Required" }),
    en: z.string().min(1, { message: "الحقل مطلوب" }),
  }),
  price: z
    .union([z.string(), z.number()])
    .transform((value) => (typeof value === "string" ? parseFloat(value) : value))
    .refine((value) => !isNaN(value), { message: "Invalid number" }),
  images: z.array(z.any()).optional(), // Adjusted to allow multiple images
  category: z.string().optional(),
});

const CreateCourseForm = ({ course }: { course?: any }) => {
  const form = useForm<z.infer<typeof CourseSchema>>({
    defaultValues: {
      name: course?.name || "",
      description: course?.description || "",
      price: course?.price || "",
      category: course?.category || "",
    },
    resolver: zodResolver(CourseSchema),
  });
  const [categoreis, setCategoreis] = useState([]);
  const locale = useLocale();
  useEffect(() => {
    const fetchCategoreis = async () => {
      const res: any = await getEntities("Category", 1, {},false, locale);
      console.log(res);
      setCategoreis(res.data.data);
    };

    fetchCategoreis();
  }, []);
  const [isPending, startTransition] = useTransition();
  const [previews, setPreviews] = useState<string[]>(course?.images?.map((image: any) => image.secure_url) || []); // Array of previews
  const router = useRouter();

  const onSubmit = async (data: any) => {
    console.log(data);
    startTransition(async () => {
      try {
        let courseData = { ...data };
        if (data.images && data.images.length > 0) {
          const uploadedImages = await Promise.all(
            data.images.map(async (file: File) => {
              if (!(file instanceof File)) return null;
              const formData = new FormData();
              formData.append("file", file);
              formData.append("upload_preset", "v7t8mt9o"); // Replace with your upload preset
              const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL!, {
                method: "POST",
                body: formData,
              });
              console.log(res);
              if (!res.ok) {
                throw new Error("Failed to upload image");
              }
              const cloudinaryData = await res.json();
              return {
                secure_url: cloudinaryData.secure_url,
                public_id: cloudinaryData.public_id,
              };
            })
          );
          courseData = {
            ...data,
            images: uploadedImages,
          };
        }
        const serverRes: any = course?._id
          ? await updateCourse(courseData, course._id)
          : await createCourse(courseData);
        if (serverRes.success) {
          toast.success(serverRes.success);
          router.refresh();
        } else {
          toast.error(serverRes.error);
        }
      } catch (error) {
        toast.error("An error occurred while creating the course.");
      }
    });
  };
  const arr = previews.length > 0 ? previews : Array.from({ length: 1 }, () => null);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex duration-200 select-none rounded-2xl w-full flex-col gap-2 lg:gap-6 px-3 py-2 md:px-5 md:py-2`}
      >
        <div className="flex items-center gap-2">
          <div className="flex py-3 flex-col w-full gap-2">
            <div className="flex flex-wrap gap-2">
              {arr?.map((preview, index) => (
                <ImageInput
                  key={index}
                  isLoading={isPending}
                  form={form}
                  index={index}
                  isPreview={previews?.[index]}
                  setPreviews={setPreviews} // Updated to handle multiple previews
                  previews={previews}
                  productId={course?._id}
                  defaultImg={course?.images?.[index]} // Default to multiple images
                />
              ))}
            </div>
            <Button
              className=" mb-4"
              onClick={(e: any) => {
                e.preventDefault();
                setPreviews((prev) => [...prev, ""]);
              }}
            >
              Add Image
            </Button>
            <ArabicEnglishForm />

            <div className="flex items-center gap-3 my-3">
              <FormInput label="Price" name="price" placeholder={"Price"} type="number" />
              <FormSelect name="category" label="Category" options={categoreis} />
            </div>
          </div>
        </div>
        <div className="flex ml-10 justify-between">
          <div className="flex gap-3 items-center flex-row-reverse ml-auto self-end">
            <Button disabled={isPending} className="flex ml-auto items-center self-end gap-2 md:gap-5">
              {!course?._id ? <PlusIcon /> : <PenIcon />} {course?._id ? "Update" : "Create"}
            </Button>
            <DialogClose>
              <Button type="button">Cancel</Button>
            </DialogClose>
            <div className="flex flex-col h-full items-center self-center px-1 py-1 gap-3"></div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateCourseForm;
