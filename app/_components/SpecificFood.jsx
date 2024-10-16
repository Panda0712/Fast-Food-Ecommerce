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
      className="bg-[url('/bg-top-main.jpg')] bg-center bg-cover bg-i px-12 py-24 flex flex-wrap justify-center gap-6"
    >
      <Image
        className="object-cover rounded-sm max-w-[500px] max-h-[500px] h-auto"
        src={food.image}
        width={450}
        height={0}
        alt={`${food.name} image`}
      />
      <div>
        <h3 className="text-xl mb-2 font-bold">{food.name}</h3>
        <p className="text-base font-semibold mb-4">{food.description}</p>
        <p>
          <span className="text-base font-semibold">Giá: </span>{" "}
          {formatVND(food.regularPrice)}
        </p>
        <p className="mb-8">
          <span className="text-base font-semibold">Khuyến mãi:</span>{" "}
          {formatVND(food.discount)}
        </p>
        <Button type="fourth">Thêm vào giỏ</Button>
      </div>
    </div>
  );
};

export default SpecificFood;
