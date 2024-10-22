"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useCart } from "../_context/CartContext";
import { formatVND } from "../_lib/helper";
import { useRouter } from "next/navigation";
import {
  faAngleDown,
  faShoppingCart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import Button from "./Button";

const Cart = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { cart, removeFromCart, handleIncrement, handleDecrement } = useCart();

  const router = useRouter();

  const totalPrice = cart.reduce(
    (acc, cur) => acc + cur.totalPrice * cur.quantity,
    0
  );

  return (
    <>
      {isVisible && (
        <div className="scrollbar fixed flex flex-col gap-4 py-12 z-[1000] px-6 rounded-xl rounded-bl-none rounded-br-none bg-[#FAC437] min-w-[80%] max-h-[50%] overflow-auto right-10 bottom-0">
          <div
            onClick={() => setIsVisible(false)}
            className="cursor-pointer absolute right-4 top-3"
          >
            <FontAwesomeIcon icon={faAngleDown} style={{ fontSize: 24 }} />
          </div>
          {cart.length === 0 ? (
            <span className="text-center">
              Bạn không có sản phẩm nào trong giỏ hàng của bạn
            </span>
          ) : (
            <div className="flex flex-col gap-6 z-[1000]">
              {cart.map((food) => (
                <div key={food.id} className="relative flex items-center gap-6">
                  <Image
                    src={food.image}
                    alt="food image"
                    width={100}
                    height={100}
                  />
                  <div>
                    <p>{food.foodName}</p>
                    <div className="mt-2 flex gap-2 items-center">
                      <div
                        onClick={() => handleDecrement(food.id)}
                        className="transition-all hover:opacity-80 cursor-pointer flex text-lg font-bold items-center justify-center w-[40px] h-[40px] bg-[#e31837] rounded-lg text-white"
                      >
                        -
                      </div>
                      <div className="flex text-lg font-bold items-center justify-center w-[70px] h-[40px] rounded-lg bg-white">
                        {food.quantity}
                      </div>
                      <div
                        onClick={() => handleIncrement(food.id)}
                        className="transition-all hover:opacity-80 cursor-pointer flex text-lg font-bold items-center justify-center w-[40px] h-[40px] bg-[#e31837] rounded-lg text-white"
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <p className="text-[#E31837] ml-4 font-bold text-lg">
                    {formatVND(food.totalPrice * food.quantity)}
                  </p>
                  <div
                    onClick={() => removeFromCart(food.id)}
                    className="cursor-pointer absolute right-5 transition-all hover:opacity-60 flex items-center justify-center rounded-full h-[40px] w-[40px] bg-[#E31837]"
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ fontSize: 16, color: "#fff" }}
                    />
                  </div>
                </div>
              ))}
              <div className="flex w-full items-center justify-between">
                <p className="font-bold text-xl">Tổng Cộng :</p>
                <p className="font-bold text-xl text-[#E31837]">
                  {formatVND(totalPrice)}
                </p>
              </div>
              <div className="flex justify-end mt-1">
                <Button
                  type="order"
                  className="bg-[#e31837] uppercase font-bold text-lg max-w-[200px]"
                  onClick={() => router.push("/payment/shipping")}
                >
                  Thanh toán
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      {!isVisible && (
        <div
          onClick={() => setIsVisible(true)}
          className="fixed boxHover flex gap-4 justify-center items-center cursor-pointer z-10 py-4 px-4 rounded-xl rounded-bl-none rounded-br-none bg-[#FAC437] min-w-[200px] right-10 bottom-0"
        >
          <div className="iconHoverMd transition-all">
            <FontAwesomeIcon
              icon={faShoppingCart}
              style={{ fontSize: 24, color: "black" }}
            />
          </div>
          <span className="font-bold text-xl flex gap-1">
            {formatVND(totalPrice)}
          </span>
        </div>
      )}
    </>
  );
};

export default Cart;
