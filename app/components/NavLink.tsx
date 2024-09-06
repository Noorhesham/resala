"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ title, icon, href }: { title: string; icon: any; href: string }) => {
  const pathName = usePathname();
  const t = useTranslations("navbar");
  return (
    <div className="flex p-2  text-sm md:text-base w-full text-left  flex-col  gap-2">
      <Link
        className={`flex w-full  dark:hover:bg-slate-800 duration-150 py-2 px-4 rounded-xl  md:px-2 items-center  text-left  gap-2 ${
          pathName.replace("/en" || "/ar", "") === `/${href}` ||
          (pathName.includes(t("course")) && href.includes(t("course")))
            ? "darK:bg-slate-800 text-gray-100 font-medium bg-primary"
            : ""
        }`}
        href={`/${href}`}
      >
        {icon}
        <span>{title}</span>
      </Link>
    </div>
  );
};

export default NavLink;
