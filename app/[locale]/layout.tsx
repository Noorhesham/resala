import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import QueryProvider from "../utils/QueryProvider";

import { Cairo, Roboto } from "next/font/google"; // Load both fonts

const cairoFont = Cairo({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-cairo",
});

const robotoFont = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

// Define Open Graph metadata
export const metadata: Metadata = {
  title: "Resala - Training Courses",
  description: "Discover the best training courses for in-depth learning, skill development, and success stories.",
  openGraph: {
    type: "website",
    title: "Resala - Training Courses",
    description: "Discover the best training courses for in-depth learning, skill development, and success stories.",
    url: "https://www.resala-courses.com",
    siteName: "Resala",
    images: [
      {
        url: "https://www.resala-courses.com/images/og-image.jpg", // Replace with your image
        width: 1200,
        height: 630,
        alt: "Resala Training Courses",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resala - Training Courses",
    description: "Discover the best training courses for in-depth learning, skill development, and success stories.",
    images: ["https://www.resala-courses.com/images/og-image.jpg"],
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  unstable_setRequestLocale(locale);
  const isArabic = locale === "ar";
  return (
    <html lang={locale}>
      <body
        style={{ textAlign: locale === "ar" ? "right" : "left", direction: locale === "ar" ? "rtl" : "ltr" }}
        className={isArabic ? cairoFont.className : robotoFont.className}
      >
        <QueryProvider>
          <ToastContainer
            position="top-center"
            autoClose={3500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover={false}
            theme="light"
          />{" "}
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
