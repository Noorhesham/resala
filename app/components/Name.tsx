import { useLocale } from "next-intl";
import Link from "next/link";
import React from "react";

const Name = ({ name, href }: { name: any; href?: string }) => {
  const lang = useLocale();
  return href ? (
    <Link href={href}>{name[lang || "en"] || name}</Link>
  ) : (
    <div className="text-left font-medium">{name[lang || "en"]}</div>
  );
};

export default Name;
