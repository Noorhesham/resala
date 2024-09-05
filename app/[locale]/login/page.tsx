import React from "react";
import Login from "../../components/Login";
import { unstable_setRequestLocale } from "next-intl/server";
import connect from "@/lib/clientPromise";

const page = async ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  await connect();

  return (
    <main className=" w-full h-screen flex justify-center items-center">
      <Login />
    </main>
  );
};

export default page;
