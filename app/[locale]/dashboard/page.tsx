import React from "react";
import CustomDialog from "@/app/components/CustomDialog";
import connect from "@/lib/clientPromise";
import { Button } from "@/components/ui/button";
import { DataTable } from "../../components/DataTable";
import { deleteCourse, deleteEntity, getEntities } from "../../actions/actions";
import { columns } from "./(start)/columns";
import CreateCourseForm from "../../components/CreateCourse";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import { unstable_setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

const Page = async ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);

  const { data } = await getEntities("Course", 1, {}, true);
  console.log(data);
  return (
    <MaxWidthWrapper className="flex flex-col mt-5">
      <CustomDialog
        btn={<Button className=" self-end">Add Course</Button>}
        title="Add Course"
        content={<CreateCourseForm />}
      />
      <DataTable handleDeleteAll={deleteEntity} entity={"Course"} columns={columns} data={data?.data} />
    </MaxWidthWrapper>
  );
};

export default Page;
