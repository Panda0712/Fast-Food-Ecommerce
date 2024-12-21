"use client";

import { useCart } from "../_context/CartContext";
import { useRouter } from "next/navigation";
import { capitalizeFirstLetter, formatVND } from "../_lib/helper";

import Image from "next/image";
import Button from "./Button";

const FoodItem = ({ food }) => {
  const router = useRouter();

  const { addToCart } = useCart();

  const description =
    food.description.length > 35
      ? capitalizeFirstLetter(food.description.slice(0, 35) + "...")
      : capitalizeFirstLetter(food.description);

  const handleClick = (id) => {
    router.push(`/foods/${id}`);
  };

  const handleCart = (e) => {
    e.stopPropagation();
    addToCart({
      id: food.id,
      foodName: capitalizeFirstLetter(food.name),
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
      className="md:h-[300px] h-[350px] flex flex-col justify-between md:flex-none relative bg-white shadow-lg boxHover cursor-pointer w-[160px] md:w-[300px] border rounded-lg overflow-hidden"
    >
      {food.discount > 0 && (
        <div className="z-10 absolute rounded-bl-md rounded-tr-md flex justify-center items-center right-0 w-20 h-7 bg-red-500">
          <span className="text-white">
            -{Math.floor((food.discount / food.regularPrice) * 100)}%
          </span>
        </div>
      )}
      <div className="overflow-hidden">
        <Image
          width={250}
          height={0}
          src={food.image}
          alt={`${food.name} image`}
          className="w-full iconHoverSm transition-all h-[120px] md:h-[150px] object-cover rounded-tr-lg rounded-tl-lg"
        />
      </div>
      <div className="px-3 py-4 relative">
        <span className="absolute right-3 font-semibold">⭐ {food.rating}</span>
        <p className="text-md font-semibold">
          {capitalizeFirstLetter(food.name)}
        </p>
        <span className="text-sm h-16 md:h-none">{description}</span>
      </div>
      <div className="px-3 py-3 flex md:flex-row flex-col md:gap-2 gap-4 items-center justify-between">
        <span className="font-semibold">
          {food.discount > 0 ? (
            <div className="flex items-center gap-1">
              <span className="line-through text-sm">{food.regularPrice}</span>
              <span className="font-bold text-lg text-red-600">
                {formatVND(food.regularPrice - food.discount)}
              </span>
            </div>
          ) : (
            `${formatVND(food.regularPrice)}`
          )}
        </span>
        <Button type="third" onClick={handleCart}>
          Thêm vào giỏ
        </Button>
      </div>
    </div>
  );
};

export default FoodItem;
