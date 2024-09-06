import React from "react";
import { Delete } from "@/app/components/Delete";
import { toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PenIcon } from "lucide-react";

import CustomDialog from "@/app/components/CustomDialog";
import CreateCourse from "@/app/components/CreateCourse";
import { ImBin2 } from "react-icons/im";
import { deleteEntity, getCourses, getEntities } from "@/app/actions/actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CreateCategoryForm from "./CreateCategory";
import CreateCommentForm from "./CreateComment";
import CreateCertificateForm from "./CertificateCreation";
import { useQuery } from "@tanstack/react-query";

export const useGetCourses = (locale: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => await getEntities("Course", 1, "", false, locale, true),
  });
  return { data, isLoading };
};
const Actions = ({ product, sheet, type = "course" }: { product: any; sheet?: boolean; type?: string }) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <CustomDialog
          title="Update product"
          btn={
            <Button className="flex justify-between w-full   hover:text-green-600 duration-150">
              Edit <PenIcon className="h-4 w-4 ml-auto" />
            </Button>
          }
          content={
            type === "course" ? (
              <CreateCourse course={product} />
            ) : type === "category" ? (
              <CreateCategoryForm category={product} />
            ) : type === "certificate" ? (
              <CreateCertificateForm certificate={product} />
            ) : (
              <CreateCommentForm courseId={product.course} comment={product} />
            )
          }
        />

        <DropdownMenuSeparator />

        <Delete
          btn={
            <div className="flex px-3 py-1.5 hover:bg-red-500 rounded-xl duration-150 justify-between cursor-pointer">
              Delete{" "}
              <span className="    my-auto  self-center cursor-pointer  duration-200  ">
                <ImBin2 />
              </span>
            </div>
          }
          value={product.name}
          onClick={async () => {
            const res = await deleteEntity(type.replace(type[0], type[0].toUpperCase()), product._id);
            if (res.success) {
              toast.success(res.success);
              router.refresh();
            }
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
