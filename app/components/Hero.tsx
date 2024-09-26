import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { FlipWords } from "./ui/flip-words";
import Image from "next/image";
import { Spotlight } from "./ui/Spotlight";
import CircularText from "./CircularText";
import MotionItem from "./defaults/MotionItem";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("hero");
  const locale = useLocale();
  // Fetch each word separately
  const words = [t("word1"), t("word2"), t("word3"), t("word4")];

  return (
    <section className="min-h-screen bg-gray-100 pt-16 relative overflow-hidden">
      <div className="gradient"></div>
      <Spotlight className="-top-40 left-0 md:left-[70%] md:-top-20" fill="blue" />
      <Spotlight className="-top-40 right-0 md:right-96 rotate-90 md:-top-20" fill="purple" />

      <div className="absolute lg:block hidden top-1/2 right-10">
        <CircularText />
      </div>
      <a href="#courses" className="left-[55%] z-40 top-[65%] absolute flex items-center gap-2">
        <div className="w-20 relative h-20">
          <Image src="/4762311.png" className="object-cover" fill alt="arrow" />
        </div>
        <div className="hidden xl:flex  items-center gap-1 text-2xl font-bold">
          <p>{t("browseCourses")}</p>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </div>
      </a>
      <div className="absolute left-[38%] top-1/2 w-80 h-80">
        <Image src="/shape1.png" className="object-cover" fill alt="arrow" />
      </div>
      <div className="absolute left-[35%] xl:left-10 top-[48%] w-96 h-96">
        <Image src="/shapee.png" className="object-cover" fill alt="arrow" />
      </div>
      <MaxWidthWrapper className="head_text h-64 relative overflow-hidden items-center flex flex-col blue_gradient">
        <h1>{t("title")}</h1>

        <FlipWords arabic={locale === "ar"} className="" words={words} duration={1500} />
      </MaxWidthWrapper>
      <MaxWidthWrapper noPadding className="-mt-10 relative">
        <MotionItem initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="mt-4 text-base text-blue-800 font-semibold max-w-lg text-center mx-auto">{t("description")}</p>
        </MotionItem>
        <div className="h-[28rem] absolute xl:-left-96 top-24 xl:-top-8 w-full">
          <Image src="/study.png" fill alt="study" className="object-contain" />
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Hero;
