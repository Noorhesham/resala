import React from "react";
import CustomDialog from "@/app/components/CustomDialog";
import connect from "@/lib/clientPromise";
import Course from "../../models/Course";
import { Button } from "@/components/ui/button";
import { DataTable } from "../../components/DataTable";
import { deleteCourse } from "../../actions/actions";
import { columns } from "./(start)/columns";
import CreateCourseForm from "../../components/CreateCourse";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import { unstable_setRequestLocale } from "next-intl/server";

const page = async ({ params: { locale } }: { params: { locale: string } }) => {
  await connect();
  const courses = await Course.find({}).lean();
  unstable_setRequestLocale(locale);

  return (
    <MaxWidthWrapper className="flex flex-col mt-5">
      <CustomDialog
        btn={<Button className=" self-end">Add Course</Button>}
        title="Add Course"
        content={<CreateCourseForm />}
      />
      {/*@ts-ignore*/}
      <DataTable handleDeleteAll={deleteCourse} columns={columns} data={courses} />
    </MaxWidthWrapper>
  );
};

export default page;
