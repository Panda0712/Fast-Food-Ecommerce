"use client";

import { useRouter, useSearchParams } from "next/navigation";

import CategoriesInfo from "../_lib/icon";

const CategoryItem = ({ category, index }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryTag = CategoriesInfo.CategoriesTag[index];
  const activeCategoryFromUrl = searchParams.get("category") || "all";

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("category", categoryTag);
    router.push(`?${params.toString()}`);
  };

  const isActive = categoryTag === activeCategoryFromUrl;

  return (
    <div
      onClick={handleClick}
      className={`border boxHover justify-center items-center bg-slate-200 gap-2 min-w-28 min-h-24 flex flex-col text-center px-2 py-4 rounded-lg cursor-pointer transition-all hover:bg-red-200 overflow-hidden ${
        isActive ? "bg-[#F0EAD6] scale-105" : ""
      }`}
      key={category.id}
    >
      {CategoriesInfo.CategoriesIcon[index]}
      <span className="text-center text-sm font-semibold">{category.name}</span>
    </div>
  );
};

export default CategoryItem;
