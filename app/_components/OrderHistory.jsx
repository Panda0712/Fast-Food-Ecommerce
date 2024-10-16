"use client";

import React, { useEffect, useState } from "react";
import { getSpecificFoods, getSpecificOrders } from "../_lib/actions";
import { formatVND, parseDateTime } from "../_lib/helper";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Button from "./Button";

const OrderHistory = ({ guestData }) => {
  const [orders, setOrders] = useState();
  const [foodsData, setFoodsData] = useState();

  const { id } = guestData;
  const router = useRouter();

  const getOrders = async (id) => {
    const { orderData } = await getSpecificOrders(id);
    const foodIds = orderData.map((order) => order.foodId);
    const { foods } = await getSpecificFoods(foodIds);

    setOrders(orderData);
    setFoodsData(foods);
  };

  useEffect(() => {
    if (id) getOrders(id);
  }, [id]);

  console.log(orders);

  return (
    <div>
      <p className="mt-4 text-xl text-center">
        Có {orders?.length} đơn hàng trong lịch sử mua hàng của bạn
      </p>
      <div className="flex flex-col mt-12">
        {orders?.map((order, index) => (
          <div
            className={`border-2 xl:w-[1200px] xl:mx-auto flex flex-col gap-4 rounded-lg border-slate-400 px-8 pt-8 pb-6 ${
              index === orders.length - 1
                ? ""
                : "rounded-bl-none rounded-br-none"
            } ${
              index !== 0 ? "rounded-tl-none rounded-tr-none" : "border-b-[1px]"
            }`}
            key={order.id}
          >
            <div className="flex justify-between">
              <div className="flex gap-4">
                <Image
                  src={
                    foodsData[index]?.image ||
                    foodsData.filter((food) => food.id === order.foodId)[0]
                      .image
                  }
                  alt="foodImage"
                  width={200}
                  height={0}
                  className="w-[150px] h-[120px]"
                />
                <div>
                  <h3 className="text-xl">
                    {foodsData[index]?.name ||
                      foodsData.map((food) => food.id === order.foodId)[0].name}
                  </h3>
                  <p className="text-lg">Số lượng: {order.numFood}</p>
                  <p className="text-lg">Mã đơn hàng: #{order.id}</p>
                  <p className="text-lg">
                    {order.isPaid ? "☑️ Đã thanh toán" : "✖️ Chưa thanh toán"}
                  </p>
                </div>
              </div>

              <p className="text-xl font-semibold">
                {formatVND(order.totalPrice)}
              </p>
            </div>

            <div className="flex justify-between items-center gap-8 xl:gap-16">
              <div className="flex items-center gap-1">
                <span className="text-lg">✅</span>
                <span className="text-lg text-slate-500">
                  Thời gian đặt hàng:{" "}
                  {parseDateTime(order.orderTime).formattedDate}
                </span>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => router.push(`/foods/${order.foodId}`)}
                  type="order"
                  className="uppercase"
                >
                  Xem sản phẩm
                </Button>
                <Button
                  onClick={() => router.push("/foods")}
                  type="order"
                  className="uppercase"
                >
                  Mua lại
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
