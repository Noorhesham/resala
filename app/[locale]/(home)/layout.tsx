import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import NavBar from "../../components/nav/NavBar";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  return (
    <main>
      <NavBar />
      {children}
      <Footer />
    </main>
  );
}
