import React from "react";
import Login from "../../components/Login";
import { unstable_setRequestLocale } from "next-intl/server";

const page = async ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);

  return (
    <main className=" w-full h-screen flex justify-center items-center">
      <Login />
    </main>
  );
};

export default page;
