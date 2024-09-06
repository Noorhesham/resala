"use client";
import React from "react";
import GridContainer from "./defaults/GridContainer";
import Paragraph from "./defaults/Paragraph";
import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { FaCode, FaCalculator, FaUserTie } from "react-icons/fa"; // Import icons
import { motion } from "framer-motion";

const Categories = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <MaxWidthWrapper className="py-12">
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <div className="flex col-span-2 flex-col mb-8">
          <span className="text-indigo-600 font-semibold text-base flex items-center mb-2">
            <FaCode className="mr-2" /> {/* Icon before span */}
            Our Course
          </span>
          <h1 className="text-5xl font-bold blue_gradient mb-4">Explore Our Categories</h1>
          <Paragraph
            className="font-semibold max-w-lg text-gray-700"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit. Curabitur ac pharetra dui."
          />
        </div>

        {/* Category Items with Motion */}
        {[
          { title: "Programming", image: "/happy-man-online-dating-via-laptop.png", bgColor: "bg-purple-400" },
          {
            title: "Language",
            image: "/lang.png",
            bgColor: "bg-orange-400",
            desc: "Learn new languages from the comfort of your home.",
          },
          {
            title: "Accounting",
            image: "/accounting.png",
            bgColor: "bg-sky-400",
            desc: "Master the art of financial management and accounting principles.",
          },
          {
            title: "Business",
            image: "/business.png",
            bgColor: "bg-pink-400",
            desc: "Enhance your skills in leadership and team management",
          },
        ].map((category, index) => (
          <motion.div key={index} className="px-4 py-2" variants={itemVariants}>
            <div className={`px-8 py-4 ${category.bgColor}`}>
              <div className="w-full h-full aspect-square relative flex items-center justify-center">
                <Image src={category.image} className="object-contain" alt={category.title} fill />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-base w-full text-center self-center font-semibold mx-auto mt-4 flex items-center">
                {category.title}
              </h2>
              <Paragraph description={category.desc} />
            </div>
          </motion.div>
        ))}
        <motion.div className="px-4 py-2  col-span-2" variants={itemVariants} initial="hidden" whileInView="visible">
          <div
            style={{
              width: "100%",

              backgroundImage: "url('/course.avif')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className={`px-8 h-64 py-4 bg-green-200`}
          ></div>
          <div>
            <h2 className="text-base w-full text-center self-center font-semibold mx-auto mt-4 flex items-center">
              Join Us Now
            </h2>
            <Paragraph description="Lorem ipsum dolor sit amet consectetur adipiscing elit." />
          </div>
        </motion.div>
      </motion.div>
    </MaxWidthWrapper>
  );
};

export default Categories;
