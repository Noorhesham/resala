import React from "react";
import GridContainer from "./defaults/GridContainer";
import Paragraph from "./defaults/Paragraph";
import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { FaCode, FaCalculator, FaUserTie } from "react-icons/fa"; // Import icons

const Categories = () => {
  return (
    <MaxWidthWrapper className="py-12">
      <GridContainer cols={4} gap={6}>
        {/* Header Section */}
        <div className="flex col-span-2 flex-col mb-8">
          <span className="text-indigo-600 font-semibold text-base flex items-center mb-2">
            <FaCode className="mr-2" /> {/* Icon before span */}
            Our Course
          </span>
          <h1 className="text-5xl font-bold blue_gradient mb-4">EXPLORE OUR CATEGORIES</h1>
          <Paragraph
            className="font-semibold max-w-lg text-gray-700"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit. Curabitur ac pharetra dui."
          />
        </div>

        {/* Category Cards */}
        <CategoryCard icon={<FaCode />} title="Computer Languages" imageSrc="/study.png" bgColor="bg-green-100" />
        <CategoryCard icon={<FaCalculator />} title="محاسبة" imageSrc="/study.png" bgColor="bg-yellow-100" />
        <CategoryCard icon={<FaUserTie />} title="اداري" imageSrc="/study.png" bgColor="bg-blue-100" />
        <CategoryCard icon={<FaCode />} title="Additional Category" imageSrc="/study.png" bgColor="bg-red-100" />
      </GridContainer>
    </MaxWidthWrapper>
  );
};

// Category Card Component
const CategoryCard = ({
  icon,
  title,
  imageSrc,
  bgColor,
}: {
  icon: React.ReactNode;
  title: string;
  imageSrc: string;
  bgColor: string;
}) => (
  <div className="px-4 py-2">
    <div className={`px-8 py-4 ${bgColor}`}>
      {" "}
      <div className={`w-full h-full  aspect-square  relative flex items-center justify-center`}>
        <Image src={imageSrc} className="object-contain" alt={title} layout="fill" />
      </div>
    </div>
    <h2 className="text-xl font-semibold mt-4 flex items-center">
      {icon} <span className="ml-2">{title}</span>
    </h2>
  </div>
);

export default Categories;
