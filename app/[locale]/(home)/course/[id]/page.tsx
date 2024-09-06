import { getEntity } from "@/app/actions/actions";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import Paragraph from "@/app/components/defaults/Paragraph";
import FormSend from "@/app/components/FormSend";
import ImageSlider from "@/app/components/ImageSlider";
import React from "react";

const Page = async ({ params: { locale, id } }: { params: { locale: string; id: string } }) => {
  const { data, error } = await getEntity("Course", id, locale);

  if (error || !data) {
    return <div>Error fetching course details.</div>;
  }

  const course = data;

  const images = course.images || [];
  return (
    <MaxWidthWrapper>
      <div className="bg-white">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:max-w-7xl">
            <div className="lg:max-w-lg col-start-1">
              <div className="mt-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{course.name}</h1>
              </div>
              <section className="mt-4">
                <div className="flex items-start">
                  <div className="ml-4 rounded flex items-center border-l text-muted-foreground border-gray-300 pl-4">
                    <p className="transition hover:text-orange-400 mb-auto self-start underline">
                      {course.category?.name[locale || "en"] || "Unknown Category"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-6">
                  <Paragraph description={course.description} />
                </div>
                <div className="mt-10 lg:self-start col-start-1 lg:col-start-2 lg:max-w-lg">
                  Price :{course.price} $
                </div>
              </section>
            </div>
            <div className="mt-10 flex flex-col gap-2 lg:mt-0">
              {images.length > 0 && (
                <div className=" rounded-lg">
                  <ImageSlider urls={images.map((img: any) => img.secure_url)} />
                </div>
              )}
            </div>
            <div className=" flex flex-col mt-14">
              <h1 className=" text-4xl font-bold capitalize blue_gradient">Contact us to buy {course.name}</h1>
              <FormSend course={course} />
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
