"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCaategoriesCache } from "../actions/actions";
import { useRouter, useSearchParams } from "next/navigation";
export const useGetCategories = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCaategoriesCache(),
  });
  return { data, isLoading };
};
const ToolBox = () => {
  const { data, isLoading } = useGetCategories();
  console.log(data);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isChosen = searchParams.get("filter");
  return (
    <div>
      <div className=" flex justify-center gap-5 pb-10 pt-5">
        {data?.map((item) => (
          <p
            className={` font-semibold text-lg hover:underline duration-150 cursor-pointer ${
              isChosen === item._id && "text-blue-600 underline"
            }`}
            onClick={() => {
              const params = new URLSearchParams(window.location.filter);
              params.set("filter", item._id);
              router.push(`?${params.toString()}`, { scroll: false });
            }}
            key={item.id}
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ToolBox;
