"use client";

import { getFoods } from "../_lib/actions";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import FoodItem from "./FoodItem";
import Image from "next/image";

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "all";

  const handleGetFoods = async () => {
    const { foods } = await getFoods();
    setFoods(foods);
  };

  useEffect(() => {
    handleGetFoods();
  }, []);

  let filterFoods = [];

  if (category === "all") {
    filterFoods = [...foods];
  } else {
    filterFoods = foods.filter(
      (food) => food.category.toLowerCase() === category.toLowerCase()
    );
  }

  return (
    <div className="bg-[url('/bg-bottom-main1.png')] bg-center bg-cover pt-16 pb-24 px-2 md:px-4">
      <div className="flex items-center justify-center gap-4">
        <Image src="/icon3.png" alt="icon" width={30} height={30} />
        <h3 className="text-center text-2xl font-bold">Danh sách món ăn</h3>
        <Image src="/icon4.png" alt="icon" width={30} height={30} />
      </div>
      <div className="mt-16 flex justify-center items-center flex-wrap gap-4 md:gap-8">
        {filterFoods.map((food) => (
          <FoodItem key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default Foods;
