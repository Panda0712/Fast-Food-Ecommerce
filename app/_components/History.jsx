"use client";

import { useUser } from "@clerk/nextjs";
import { getSpecificUser } from "../_lib/actions";
import React, { useEffect, useState } from "react";

import Spinner from "./Spinner";
import OrderHistory from "./OrderHistory";

const History = () => {
  const [guestData, setGuestData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUser();

  const email = user?.primaryEmailAddress?.emailAddress;

  const getUser = async (email) => {
    setIsLoading(true);
    const { guest } = await getSpecificUser(email);
    setGuestData(guest);
    setIsLoading(false);
  };

  useEffect(() => {
    getUser(email);
  }, [email]);

  if (isLoading) return <Spinner />;

  return (
    <div className="pt-16 pb-24 px-12">
      <h2 className="text-2xl font-bold text-center mt-4">
        ⌛ Lịch sử mua hàng của bạn ⌛
      </h2>
      {guestData ? (
        <OrderHistory guestData={guestData} />
      ) : (
        <p className="text-lg text-center">
          Bạn chưa có đơn hàng nào! Hãy mua hàng để theo dõi mục này nhé 😍
        </p>
      )}
    </div>
  );
};

export default History;
