"use client";

import { formatVND } from "../_lib/helper";
import { useCart } from "../_context/CartContext";

import Image from "next/image";
import React from "react";
import Button from "./Button";

const SpecificFood = ({ food }) => {
  const { addToCart } = useCart();

  return (
    <div
      onClick={() =>
        addToCart({
          id: food.id,
          foodName: food.name,
          regularPrice: food.regularPrice,
          discount: food.discount,
          totalPrice: food.regularPrice - food.discount,
          image: food.image,
          quantity: 1,
        })
      }
      className="bg-[url('/bg-top-main.jpg')] relative bg-center bg-cover bg-i px-12 py-24 flex flex-wrap justify-center gap-6"
    >
      <div className="relative">
        {food.discount > 0 && (
          <div className="absolute rounded-bl-md flex justify-center items-center right-0 w-20 h-7 bg-red-500">
            <span className="text-white">
              -{Math.floor((food.discount / food.regularPrice) * 100)}%
            </span>
          </div>
        )}
        <Image
          className="object-cover rounded-sm max-w-[500px] max-h-[500px] h-auto"
          src={food.image}
          width={450}
          height={0}
          alt={`${food.name} image`}
        />
      </div>
      <div>
        <h3 className="text-xl mb-2 font-bold">{food.name}</h3>
        <p className="text-base font-semibold mb-4">{food.description}</p>
        <span className="font-semibold">
          {food.discount > 0 ? (
            <div className="flex items-center gap-1">
              <span className="line-through text-sm">{food.regularPrice}</span>
              <span className="font-bold text-xl text-red-600">
                {formatVND(food.regularPrice - food.discount)}
              </span>
            </div>
          ) : (
            `${formatVND(food.regularPrice)}`
          )}
        </span>
        <Button type="fourth" className="mt-6">
          Thêm vào giỏ
        </Button>
      </div>
    </div>
  );
};

export default SpecificFood;
