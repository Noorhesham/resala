import Course from "@/app/models/Course";
import connect from "@/lib/clientPromise";
import React from "react";
export const generateStaticParams = async () => {
  await connect();
  const courses = await Course.find();
  return courses.map((course: any) => course.id);
};
const page = async ({ params }: { params: { locale: string; id: string } }) => {
  const course = await Course.findById(params.id);
  return <section></section>;
};

export default page;
