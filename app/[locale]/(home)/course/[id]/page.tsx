import { getCourses, getEntities, getEntity } from "@/app/actions/actions";
import SliderCards from "@/app/components/CardsSlider";
import CertificateVerify from "@/app/components/CertificateVerify";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import Paragraph from "@/app/components/defaults/Paragraph";
import FormSend from "@/app/components/FormSend";
import ImageSlider from "@/app/components/ImageSlider";
import { getTranslations } from "next-intl/server";
import React from "react";
export const generateStaticParams = async () => {
  const { data } = await getEntities("Course", 1, {}, true);
  
  // Return an array of objects containing the parameters for each route
  return data?.data?.map((course) => ({
    locale: "en",  // replace with dynamic locales if necessary
    id: course._id.toString()
  })) || [];
};
const Page = async ({ params: { locale, id } }: { params: { locale: string; id: string } }) => {
  const t = await getTranslations({ locale });
  const { data, error } = await getEntity("Course", id, locale);
  const { data: data2, error: error2 } = await getEntities("Comment", 1, { courseId: id }, true, locale, true);
  if (error || !data) {
    return <div>{t("errorFetching")}</div>;
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
                      {course.category?.name[locale || "en"] || t("unknownCategory")}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-6">
                  <Paragraph description={course.description} />
                </div>
                <div className="mt-10 lg:self-start col-start-1 lg:col-start-2 lg:max-w-lg">
                  {t("price")}: {course.price} $
                </div>
              </section>
            </div>
            <div className="mt-10 flex flex-col gap-2 lg:mt-0">
              {images.length > 0 && (
                <div className="rounded-lg">
                  <ImageSlider urls={images.map((img: any) => img.secure_url)} />
                </div>
              )}
            </div>
            <div className="mt-14 flex md:flex-row flex-col gap-4 items-stretch justify-between w-full col-span-full">
              <div className="flex w-full flex-col">
                <h1 className="text-4xl font-bold capitalize blue_gradient">
                  {t("contactUs", { courseName: course.name })}
                </h1>
                <FormSend course={course} />
              </div>
              <CertificateVerify />
            </div>
          </div>
          {data2?.data.length > 0 && (
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold capitalize blue_gradient">{t("testimonials")}</h1>
              <div className="w-full col-span-full">
                <SliderCards cards={data2?.data} />
              </div>
            </div>
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
