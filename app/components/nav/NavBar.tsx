"use client";
import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import NavLink from "./NavLink";
import MaxWidthWrapper from "../defaults/MaxWidthWrapper";
import { usePathname, useRouter } from "next/navigation";
import PhoneNav from "./PhoneNav";
import { toast } from "react-toastify";
import MotionItem from "../defaults/MotionItem";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Language from "../Language";
const links = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Courses",
    href: "/courses",
  },
];
const NavBar = () => {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [active, setIsActive] = useState(false);
  const router = useRouter();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTopPage, setIsTopPage] = useState(true);
  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setIsTopPage(true);
      } else setIsTopPage(false);
      if (window.scrollY > lastScrollY) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isTopPage]);
  return (
    <header className=" w-full">
      <nav
        className={`${
          isScrollingDown && "bg-white/80"
        } fixed inset-0 z-50 max-h-[10rem]    flex flex-col gap-2  py-4 transition-all duration-300 ${
          isScrollingDown ? "-translate-y-full" : !isTopPage && !isScrollingDown ? `-translate-y-5 ` : "translate-y-0"
        }`}
      >
        {" "}
        <AnimatePresence>
          {!isTopPage && !isScrollingDown && (
            <MotionItem
              nohover
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 h-[20rem] bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none z-10"
            >
              {null}
            </MotionItem>
          )}
        </AnimatePresence>
        <MaxWidthWrapper noPadding>
          <div
            className={cn(
              "flex relative z-20 items-center   ",
              !isTopPage && !isScrollingDown ? "justify-center" : "justify-between"
            )}
          >
            <div className="flex w-full justify-between  items-center  gap-20 ">
              <div className=" flex items-center gap-2">
                <div
                  className={`${
                    !isTopPage && !isScrollingDown && "lg:opacity-100  hidden lg:flex  opacity-0"
                  } flex duration-150  items-center`}
                >
                  <Logo />
                </div>
                <Language />
              </div>
              <ul className=" hidden lg:flex z-30 relative items-center  gap-4 xl:gap-8 ">
                {links.map((link) => (
                  <NavLink key={link.text} href={link.href} text={link.text} />
                ))}
              </ul>
            </div>
            <div className="  flex items-center gap-2 ">
              <div className={`z-[999] duration-150 h-full  relative lg:hidden block`}>
                <PhoneNav navigation={links} />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
    </header>
  );
};

export default NavBar;
