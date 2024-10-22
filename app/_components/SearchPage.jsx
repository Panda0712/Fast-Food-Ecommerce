"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getFoods } from "../_lib/actions";

import Button from "./Button";
import FoodItem from "./FoodItem";
import Image from "next/image";

const SearchPage = () => {
  const [foods, setFoods] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("searchQuery");
  const category = searchParams.get("category") ?? "";

  let filterFoods = [...foods];

  const handleGetFoods = async () => {
    const { foods } = await getFoods();
    setFoods(foods);
  };

  useEffect(() => {
    handleGetFoods();
  }, []);

  if (category && query) {
    filterFoods = foods.filter(
      (food) =>
        food.name.toLowerCase().includes(query) && food.category === category
    );
  }

  if (query) {
    filterFoods = foods.filter(
      (food) =>
        food.name.toLowerCase().includes(query) ||
        food.category.toLowerCase() === query
    );
  }

  if (category) {
    filterFoods = foods.filter((food) => food.category === category);
  }

  return (
    <div>
      {!query ? (
        <div className="py-8 px-4 flex flex-col items-center gap-6">
          <p className="text-center text-lg">
            Bạn chưa nhập tìm kiếm! Vui lòng thử lại 😉
          </p>
          <Button type="order" onClick={() => router.back()}>
            Quay lại
          </Button>
        </div>
      ) : filterFoods.length > 0 ? (
        <div className="bg-[url('/bg-bottom-main1.png')] bg-center bg-cover pt-16 pb-24 px-2 md:px-4">
          <div className="flex items-center justify-center gap-4">
            <Image src="/icon3.png" alt="icon" width={30} height={30} />
            <h3 className="text-center text-2xl font-bold">Kết quả tìm kiếm</h3>
            <Image src="/icon4.png" alt="icon" width={30} height={30} />
          </div>
          <div className="mt-16 flex justify-center items-center flex-wrap gap-4 md:gap-8">
            {filterFoods.map((food) => (
              <FoodItem key={food.id} food={food} />
            ))}
          </div>
        </div>
      ) : (
        <div className="py-8 px-4 flex flex-col items-center gap-6">
          <p className="text-center text-lg">
            Không có kết quả khớp với tìm kiếm của bạn! Thử lại sau nhé 😉
          </p>
          <Button type="order" onClick={() => router.back()}>
            Quay lại
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
