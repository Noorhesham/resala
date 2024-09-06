import React from "react";
import { unstable_cache } from "next/cache";
import { getCourses, getEntities } from "../actions/actions";
import ProductCard from "./Product";
import GridContainer from "./defaults/GridContainer";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { PaginationDemo } from "./Pagination";
import ToolBox from "./ToolBox";
import Empty from "./Empty";

const fetchProducts = async (page = 1, filter = "", locale = "en") => {
  return await getEntities("Course", page, filter, false, locale);
};

const cachedFetchProducts = (page: number, filter: any, locale?: string) =>
  unstable_cache(() => fetchProducts(page, filter, locale), [`products-${page}-${JSON.stringify(filter)}-${locale}`], {
    revalidate: 1,
  });

const ProductReelFetch = async ({
  page = 1,
  filter = {},
  locale = "en",
}: {
  page: number;
  filter: any;
  locale?: string;
}) => {
  // Use the cached function to fetch products with the specific page and filter,
  const res = await cachedFetchProducts(page, filter, locale)();
  console.log(res);
  if (!res || !res.data) {
    return null; // Handle the case where the response is invalid or empty
  }

  const { data, totalPages } = res.data;
  const courses = data;
  console.log(courses);
  return (
    <MaxWidthWrapper className="flex flex-col items-center gap-5">
      <h1 className="text-6xl font-bold text-center blue_gradient mb-2">Courses</h1>
      <ToolBox />
      <GridContainer cols={3}>
        {courses.length > 0 ? (
          <>
            {courses.map((product: any, i: number) => (
              <ProductCard index={i} key={product.id} product={product} />
            ))}
          </>
        ) : (
          <Empty />
        )}
        <PaginationDemo totalPages={totalPages} />
      </GridContainer>
    </MaxWidthWrapper>
  );
};

export default ProductReelFetch;
