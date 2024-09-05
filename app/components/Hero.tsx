import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { FlipWords } from "./ui/flip-words";
import Image from "next/image";
import { Spotlight } from "./ui/Spotlight";
import CircularText from "./CircularText";
import MotionItem from "./defaults/MotionItem";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
const words = ["Learn In Depth", "Build Your Skills", "Share Your Knowledge", "Success Stories"];
const Hero = () => {
  return (
    <section className=" min-h-screen bg-gray-100 pt-16  relative overflow-hidden">
      <div className="gradient"></div>
      <Spotlight className="-top-40 left-0 md:left-[70%] md:-top-20" fill="blue" />
      <Spotlight className="-top-40 right-0 md:right-96 rotate-90 md:-top-20" fill="purple" />

      <div className=" absolute top-1/2 right-20">
        <CircularText />
      </div>
      <div className="left-[55%] top-[60%] absolute flex items-center gap-2">
        <div className=" w-20  relative h-20 ">
          <Image src="/4762311.png" className=" object-cover" fill alt="arrow" />
        </div>
        <Link href="#courses" className=" flex items-center gap-1 text-2xl font-bold">
          <p>Browse Courses</p>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </Link>
      </div>
      <div className=" absolute left-[40%] top-1/2 w-80 h-80">
        <Image src="/shape1.png" className=" object-cover" fill alt="arrow" />
      </div>
      <div className=" absolute left-10 top-[38%] w-96 h-96">
        <Image src="/shapee.png" className=" object-cover" fill alt="arrow" />
      </div>
      <MaxWidthWrapper className="head_text h-64 relative  overflow-hidden items-center flex flex-col   blue_gradient">
        <h1>Top Training TO</h1>

        <FlipWords className="" words={words} duration={1500} />
      </MaxWidthWrapper>
      <MaxWidthWrapper noPadding className=" -mt-10 relative">
        <MotionItem initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="mt-4  text-base text-blue-800 font-semibold max-w-lg text-center mx-auto">
            Spotlight effect is a great way to draw attention to a specific part of the page. Here, we are drawing the
            attention towards the text section of the page. I don&apos;t know why but I&apos;m running out of copy.
          </p>
        </MotionItem>
        <div className=" h-[28rem] absolute -left-96 -top-8 w-full">
          <Image src="/study.png" fill alt="study" className=" object-contain" />
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Hero;
