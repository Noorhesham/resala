import React from "react";
import GridContainer from "./defaults/GridContainer";
import Logo from "./Logo";
import { useTranslations } from "next-intl";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import Image from "next/image";
import FlexWrapper from "./defaults/FlexWrapper";
import Link from "next/link";
import Socials from "./Socials";
import Paragraph from "./defaults/Paragraph";

const Footer = () => {
  const t = useTranslations("footer");
  return (
    <footer className="  bg-gray-800 text-xs md:text-sm relative">
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
              <Logo />
              <Socials />
            </div>

            <div className="mt-3 flex flex-col gap-2  col-span-full lg:col-span-2">
              <h1 className=" text-white font-semibold">+971502274767</h1>
              <p className=" text-white font-semibold">admin@alresalaetc.com</p>
            </div>
          </GridContainer>
          <FlexWrapper className=" w-full py-5 gap-5 flex justify-between items-center">
            <p className=" basis-[70%] text-gray-100">
              {t("copyright")} <Link href={`https://noor-hesham-portfolio.vercel.app/`}>NOOR HESHAM</Link>
            </p>
          </FlexWrapper>
        </MaxWidthWrapper>
      </div>
    </footer>
  );
};

export default Footer;
