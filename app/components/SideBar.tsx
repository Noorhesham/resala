import React from "react";
import NavLink from "./NavLink";
import { Home } from "lucide-react";
import { PersonIcon } from "@radix-ui/react-icons";
import { FaBook } from "react-icons/fa";
import { TbCategory } from "react-icons/tb";
import { useTranslations } from "next-intl";

const SideBar = () => {
  const t = useTranslations('navbar');
  return (
    <div>
      <div className="flex   h-full  flex-col items-center md:items-start md:ml-4 gap-2">
        <div className="flex flex-col items-center mx-auto ">{/* <Logo /> */}</div>
        <h4 className=" text-gray-400 md:text-xl text-sm ">Menu</h4>
        <NavLink href={`dashboard`} title={t("courses")} icon={<Home />} />
        <NavLink href={`dashboard/course`} title={t("course")} icon={<FaBook />} />
        <NavLink href={`dashboard/categories`} title={t("categories")} icon={<TbCategory />} />
        <NavLink href={`dashboard/certificates`} title={t("certificates")} icon={<TbCategory />} />
        <NavLink href={`dashboard/signup`} title={t("addadmin")} icon={<PersonIcon />} />
      </div>
    </div>
  );
};

export default SideBar;
