"use client";

import { useCart } from "../_context/CartContext";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Button from "./Button";

const FoodItem = ({ food }) => {
  const router = useRouter();

  const { addToCart } = useCart();

  const description =
    food.description.length > 35
      ? food.description.slice(0, 35) + "..."
      : food.description;

  const handleClick = (id) => {
    router.push(`/foods/${id}`);
  };

  const handleCart = (e) => {
    e.stopPropagation();
    addToCart({
      id: food.id,
      foodName: food.name,
      regularPrice: food.regularPrice,
      discount: food.discount,
      totalPrice: food.regularPrice - food.discount,
      image: food.image,
      quantity: 1,
    });
  };

  return (
    <div
      onClick={() => handleClick(food.id)}
      className="h-[300px] bg-white shadow-lg boxHover cursor-pointer overflow-hidden w-[300px] border rounded-lg"
    >
      <Image
        width={250}
        height={0}
        src={food.image}
        alt={`${food.name} image`}
        className="w-full iconHoverSm transition-all h-[150px] object-cover rounded-tr-lg rounded-tl-lg"
      />
      <div className="px-3 py-4">
        <p className="text-md font-semibold">{food.name}</p>
        <span className="text-sm">{description}</span>
      </div>
      <div className="px-3 py-3 flex items-center justify-between">
        <span className="font-semibold">đ{food.regularPrice}</span>
        <Button type="third" onClick={handleCart}>
          Thêm vào giỏ
        </Button>
      </div>
    </div>
  );
};

export default FoodItem;
