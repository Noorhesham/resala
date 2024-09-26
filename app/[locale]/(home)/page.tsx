import Hero from "../../components/Hero";
import Categories from "../../components/Categories";
import ProductReelFetch from "../../components/ProductReelFetch";
import { unstable_setRequestLocale } from "next-intl/server";
import Category from "../../models/Category";
import connect from "@/lib/clientPromise";

export default function Home({
  searchParams,
  params: { locale },
}: {
  searchParams: { page: string; filter: string };
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return (
    <main className="h-full w-full relative">
      <Hero />
      <Categories />
      {/*@ts-ignore*/}
      <ProductReelFetch locale={locale} page={searchParams.page} filter={{ category: searchParams.category }} />
    </main>
  );
}
