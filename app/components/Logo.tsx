import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className=" w-20 h-20 relative aspect-square">
      <Image src={"/ai-logo-AzG7MR1QJ6IJNkJK (1).svg"} alt="logo" className=" object-contain" fill />
    </Link>
  );
};

export default Logo;
