"use client";

import { getCategories } from "../_lib/actions";
import { useEffect, useState } from "react";

import CategoryItem from "./CategoryItem";
import Image from "next/image";

const CategoriesList = () => {
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    handleGetCategories();
  }, []);

  const handleGetCategories = async () => {
    const { categories } = await getCategories();

    setCategoriesList(categories);
  };

  return (
    <div className="py-16 bg-[url('/bg-top-main1.png')] bg-center bg-cover">
      <div className="flex items-center justify-center gap-4">
        <Image src="/icon1.png" alt="icon" width={30} height={30} />
        <h3 className="text-center text-2xl font-bold">Các loại mặt hàng</h3>
        <Image src="/icon2.png" alt="icon" width={30} height={30} />
      </div>
      <div className="relative scrollbar-hide mt-16 flex gap-4 px-6 xl:justify-center overflow-x-auto">
        {categoriesList.map((category, index) => (
          <CategoryItem key={category.id} category={category} index={index} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
