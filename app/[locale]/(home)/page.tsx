import Hero from "../../components/Hero";
import Categories from "../../components/Categories";
import ProductReelFetch from "../../components/ProductReelFetch";
import { unstable_setRequestLocale } from "next-intl/server";
import Category from "../../models/Category";
import connect from "@/lib/clientPromise";

export async function generateStaticParams() {
  // Fetch all categories from the database
  await connect();
  const categories = await Category.find({}).lean();
  const categoriesArray = categories.map((category) => category.name);

  // Define the range of pages you want to pre-render (from 1 to 10)
  const pages = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

  // Generate all combinations of page and filter
  const staticPaths: any = [];

  categoriesArray.forEach((filter) => {
    pages.forEach((page) => {
      staticPaths.push({ page, filter });
    });
  });
  return staticPaths;
}

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
      <ProductReelFetch page={searchParams.page} filter={searchParams.filter} />
    </main>
  );
}
