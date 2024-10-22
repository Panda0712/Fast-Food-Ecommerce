"use client";

import { useCart } from "../_context/CartContext";
import { formatVND } from "../_lib/helper";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import React from "react";
import Image from "next/image";
import Button from "./Button";

const CartPage = () => {
  const { cart, removeFromCart, handleIncrement, handleDecrement } = useCart();

  const router = useRouter();

  const totalPrice = cart.reduce(
    (acc, cur) => acc + cur.totalPrice * cur.quantity,
    0
  );

  return (
    <>
      <div className="flex justify-center items-center gap-5">
        <Image src="/cart.png" alt="cartIcon" width={45} height={45} />
        <h2 className="text-xl font-semibold text-center">Giỏ hàng của bạn</h2>
        <Image src="/cart1.png" alt="cartIcon" width={45} height={45} />
      </div>
      {cart.length > 0 ? (
        <p className="text-center pt-5 pb-4">
          Có <span className="font-semibold">{cart.length} sản phẩm</span> trong
          giỏ hàng của bạn
        </p>
      ) : (
        <p className="text-center pt-5 pb-4">
          Bạn chưa có sản phẩm nào trong giỏ hàng của mình
        </p>
      )}
      {cart.length > 0 && (
        <>
          <div className="pt-16 pb-8 flex flex-col gap-12">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex pb-8 justify-center flex-wrap gap-24 sm:gap-8 md:gap-12 items-center border-2 border-l-0 border-t-0 border-r-0 border-b-slate-200"
              >
                <div className="flex flex-col shadow-lg bg-white pb-4 rounded-md gap-3">
                  <Image
                    src={item.image}
                    alt="productImage"
                    width={200}
                    height={0}
                    className="h-[100px] object-cover rounded-md"
                  />
                  <h4 className="font-medium text-lg ml-2">{item.foodName}</h4>
                </div>
                <div className="flex flex-wrap sm:flex-row sm:flex-nowrap items-center gap-4 sm:gap-16">
                  <div>
                    <p className="text-lg font-medium">Giá</p>
                    <p>{formatVND(item.regularPrice)}</p>
                  </div>
                  <div className="mt-2 flex gap-2 items-center">
                    <div
                      onClick={() => handleDecrement(item.id)}
                      className="transition-all hover:opacity-80 cursor-pointer flex text-lg font-bold items-center justify-center w-[40px] h-[40px] bg-[#e31837] rounded-lg text-white"
                    >
                      -
                    </div>
                    <div className="flex text-lg font-bold items-center justify-center w-[70px] h-[40px] rounded-lg bg-white">
                      {item.quantity}
                    </div>
                    <div
                      onClick={() => handleIncrement(item.id)}
                      className="transition-all hover:opacity-80 cursor-pointer flex text-lg font-bold items-center justify-center w-[40px] h-[40px] bg-[#e31837] rounded-lg text-white"
                    >
                      +
                    </div>
                  </div>
                  <div>
                    <p className="text-lg">Tổng giá</p>
                    <p>{formatVND(item.totalPrice * item.quantity)}</p>
                  </div>
                  <div
                    onClick={() => removeFromCart(item.id)}
                    className="cursor-pointer transition-all hover:opacity-60 flex items-center justify-center rounded-full h-[40px] w-[40px] bg-[#E31837]"
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ fontSize: 16, color: "#fff" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end items-center gap-8 mt-1">
            <p className="font-bold text-xl">
              Tổng cộng:{" "}
              <span className="text-[#E31837]">{formatVND(totalPrice)}</span>
            </p>
            <Button
              type="order"
              className="bg-[#e31837] uppercase font-bold text-lg max-w-[200px]"
              onClick={() => router.push("/payment/shipping")}
            >
              Thanh toán
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default CartPage;
