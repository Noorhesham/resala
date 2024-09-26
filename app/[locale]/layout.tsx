import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import QueryProvider from "../utils/QueryProvider";

import { Cairo, Roboto } from "next/font/google"; // Load both fonts

// Load fonts
const cairoFont = Cairo({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-cairo", // Define a custom variable for font
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
    locale: "en_US", // Default language, change based on locale
  },
  twitter: {
    card: "summary_large_image",
    title: "Resala - Training Courses",
    description: "Discover the best training courses for in-depth learning, skill development, and success stories.",
    images: ["https://www.resala-courses.com/images/og-image.jpg"],
  },
};

// Define JSON-LD for SEO
const generateJSONLD = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Resala",
    url: "https://www.resala-courses.com",
    logo: "https://www.resala-courses.com/images/logo.png",
    sameAs: ["https://www.facebook.com/resala", "https://www.instagram.com/resala", "https://www.twitter.com/resala"],
    description: "Discover the best training courses for in-depth learning, skill development, and success stories.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-555-5555",
      contactType: "Customer Service",
      areaServed: "World",
      availableLanguage: ["English", "Arabic"],
    },
  };
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
  const selectedFont = isArabic ? cairoFont.variable : robotoFont.variable;
  return (
    <html lang={locale}>
      {" "}
      <head>
        <meta
          name="description"
          content="Discover the best training courses for in-depth learning, skill development, and success stories."
        />
        <meta property="og:title" content="Resala - Training Courses" />
        <meta
          property="og:description"
          content="Discover the best training courses for in-depth learning, skill development, and success stories."
        />
        <meta property="og:image" content="https://www.resala-courses.com/images/og-image.jpg" />
        <meta property="og:url" content="https://www.resala-courses.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Resala - Training Courses" />
        <meta
          name="twitter:description"
          content="Discover the best training courses for in-depth learning, skill development, and success stories."
        />
        <meta name="twitter:image" content="https://www.resala-courses.com/images/og-image.jpg" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJSONLD()) }} />
      </head>
      <body
        style={{ textAlign: locale === "ar" ? "right" : "left", direction: locale === "ar" ? "rtl" : "ltr" }}
        className={isArabic ? "font-cairo" : "font-roboto"}
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
