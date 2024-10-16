"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShippingFormContext } from "../_context/ShippingFormContext";

import toast from "react-hot-toast";
import Button from "./Button";

const SuccessPage = () => {
  const [second, setSecond] = useState(15);

  const { formData, resetFormData } = useShippingFormContext();

  const router = useRouter();

  useEffect(() => {
    toast.success("Đơn hàng đã được đặt thành công");

    const countdown = setInterval(() => {
      setSecond((prevSeconds) => prevSeconds - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.push("/");
      resetFormData();
    }, 15000);

    return () => {
      clearInterval(countdown);
      clearTimeout(timeout);
    };
  }, [router, resetFormData, formData]);

  if (!formData.name) {
    router.push("/");
    return;
  }

  return (
    <div className="flex flex-col items-center gap-4 py-16">
      <h2 className="text-center text-3xl">
        🎉 Đơn hàng đã được đặt thành công 🎉
      </h2>
      <p className="text-center text-xl">
        Chân thành cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi.
      </p>
      <p className="text-center text-xl">
        ⌚ Đơn hàng sẽ được giao một cách sớm nhất. Vui lòng chú ý điện thoại!
        ⌚
      </p>
      <p className="text-lg">Tự động về trang chủ trong {second} giây</p>
      <div className="mt-4 mb-4">
        <p className="text-lg">Mã khách hàng #{formData.id}</p>
        <p className="text-lg">Khách hàng: {formData.name}</p>
        <p className="text-lg">Email: {formData.email}</p>
        <p className="text-lg">Địa chỉ: {formData.address}</p>
        <p className="text-lg">Số điện thoại: {formData.phone}</p>
      </div>
      <Button
        onClick={() => router.push("/")}
        type="order"
        className="bg-slate-400 hover:bg-slate-500 uppercase"
      >
        Trở về trang chủ
      </Button>
    </div>
  );
};

export default SuccessPage;
