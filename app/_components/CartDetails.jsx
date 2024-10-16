"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../_context/CartContext";
import { formatVND } from "../_lib/helper";

import Image from "next/image";

const CartDetails = () => {
  const { cart } = useCart();

  const router = useRouter();

  const totalPrice = cart.reduce(
    (acc, cur) => acc + cur.totalPrice * cur.quantity,
    0
  );

  if (!cart.length) router.push("/");

  return (
    <div className="py-4 px-12 rounded-md bg-[#f5f1e6]">
      <h2 className="font-bold text-xl uppercase mb-5">Chi tiết đơn hàng</h2>
      <div className="flex flex-col gap-4 py-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="py-4 flex gap-4 border border-t-0 border-r-0 border-l-0 border-b-slate-300"
          >
            <Image src={item.image} alt="foodImage" width={100} height={100} />
            <div>
              <p className="uppercase font-medium">{item.foodName}</p>
              <div className="flex gap-16">
                <p className="font-[500]">x {item.quantity}</p>
                <p className="font-medium">
                  + {formatVND(item.totalPrice * item.quantity)}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center gap-2">
          <h2 className="text-xl font-bold">Tổng cộng:</h2>
          <p className="text-xl font-bold text-[#E31837]">
            {formatVND(totalPrice)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;