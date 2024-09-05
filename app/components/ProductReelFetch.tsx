import React from "react";
import { unstable_cache } from "next/cache";
import { getCourses } from "../actions/actions";
import ProductCard from "./Product";
import GridContainer from "./defaults/GridContainer";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { PaginationDemo } from "./Pagination";
import ToolBox from "./ToolBox";
import Empty from "./Empty";

// Define a caching function that accepts page and filter parameters
const fetchProducts = async (page = 1, filter = "") => {
  return await getCourses(page, filter);
};

// Cache the fetch function with search parameters
const cachedFetchProducts = (page: number, filter: string) =>
  unstable_cache(() => fetchProducts(page, filter), [`products-${page}-${filter}`], { revalidate: 1 });

const ProductReelFetch = async ({ page = 1, filter = "" }) => {
  // Use the cached function to fetch products with the specific page and filter
  const res = await cachedFetchProducts(page, filter)();
  console.log(res);
  if (!res || !res.data) {
    return null; // Handle the case where the response is invalid or empty
  }

  const { courses, totalPages } = res.data;

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
        <PaginationDemo page={page} totalPages={totalPages} filter={filter} />
      </GridContainer>
    </MaxWidthWrapper>
  );
};

export default ProductReelFetch;
