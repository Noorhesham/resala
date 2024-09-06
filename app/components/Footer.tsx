import React from "react";
import GridContainer from "./defaults/GridContainer";
import Logo from "./Logo";
import { useTranslations } from "next-intl";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import Image from "next/image";
import FlexWrapper from "./defaults/FlexWrapper";
import Link from "next/link";

const Footer = () => {
  const t = useTranslations("footer");
  return (
    <footer className="  bg-primarys text-xs md:text-sm relative">
      <div className="lg:block hidden w-6 h-6 rounded-full bg-main2 absolute top-10 z-30 left-[30%]"></div>
      <div className=" relative ">
        <div className="  hidden lg:block z-[-1] absolute w-full h-full inset-0">
          <Image src={"/footer.svg"} alt="footer" fill className=" object-top object-cover" />
        </div>
        <MaxWidthWrapper className=" flex z-10 lg:bg-none  bg-gradient-to-b from-[#224982] to-[#0C1D37]  flex-col items-start py-10  lg:pt-40">
          <GridContainer
            className=" pb-5   text-center lg:text-justify  border-white border-b-2 justify-between gap-y-5 md:gap-y-10 lg:gap-20 "
            cols={11}
          >
            <div className=" col-span-4 lg:col-span-3 flex flex-col  items-center">
              <Logo  />
              {/* <Socials /> */}
            </div>

            <div className="mt-3  col-span-full lg:col-span-2">
              <ul className="  text-white items-center  flex flex-col gap-3 lg:list-disc">
                <Link href={"/aboutus"}>{t("aboutus")}</Link>
                <Link href={"/contact-us"}>{t("contactus")}</Link>
                <Link href={"#"}>{t("ourblog")}</Link>
                <Link href={"#"}>{t("testimonials")}</Link>
                <Link href={"/faq"}>FAQ</Link>
              </ul>
            </div>
            <div className=" col-span-full lg:col-span-6 self-center flex flex-col items-center lg:items-start">
              <h1
                className=" text-white   mb-3 after:w-full after:lg:block after:hidden after:left-[110%] after:top-1/2 after:rounded-2xl after:bg-white after:absolute after:h-[2px] 
          relative text-base md:text-xl"
              >
                {t("jobs")}
              </h1>
              <ul className="  text-white flex flex-col gap-3 lg:list-disc">
                <li>{t("senior")}</li>
                <li>{t("jr")}</li>
                <li>{t("predicate")}</li>
                <li>{t("fresh")}</li>
                <li>{t("mad")}</li>
                <li>{t("predicate")}</li>
              </ul>
            </div>
          </GridContainer>
          <FlexWrapper className=" w-full py-5 gap-5 flex justify-between items-center">
            <p className=" basis-[70%] text-gray-100">
              {t("copyright")} <Link href={`https://rightminddev.com/`}>Right Mind</Link>
            </p>

            <div className="flex self-end  w-full lg:basis-[30%] items-center gap-3">
              <DownloadButtons />
            </div>
          </FlexWrapper>
        </MaxWidthWrapper>
      </div>
    </footer>
  );
};

export default Footer;
