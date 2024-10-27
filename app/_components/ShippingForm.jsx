"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useShippingFormContext } from "../_context/ShippingFormContext";
import { getSpecificUser } from "../_lib/actions";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

import Button from "./Button";

const ShippingForm = () => {
  const [guestData, setGuestData] = useState();

  const { register, handleSubmit, setValue, reset, formState } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
    },
  });
  const { errors } = formState;
  const { user } = useUser();
  const { handleSetFormData } = useShippingFormContext();

  const email = user?.primaryEmailAddress.emailAddress;

  const router = useRouter();

  const handleGetUser = async (email) => {
    const { guest } = await getSpecificUser(email);
    return guest;
  };

  const onSubmit = (data) => {
    const newData = {
      id: data.email === email ? guestData?.id : 0,
      name: data.firstName + " " + data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      observations: data.observations,
    };
    handleSetFormData(newData);
    router.push("/payment/checkout");
    reset();
  };

  useEffect(() => {
    if (email)
      handleGetUser(email).then((data) => {
        setGuestData(data);

        if (data) {
          const name = data.fullName.split(" ");
          const len = name.length;
          const firstName = len > 1 ? name.slice(0, -1).join(" ") : name[0];
          const lastName = len > 1 ? name.slice(-1).join(" ") : name[0];
          setValue("firstName", firstName);
          setValue("lastName", lastName);
          setValue("phone", data.phone || "");
          setValue("email", data.email || "");
          setValue("address", data.address || "");
        }
      });
  }, [email, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-bold text-xl">Giao hàng đến</h2>
      <div className="flex flex-col gap-4 mt-8">
        <div className="flex-1">
          <input
            className="min-w-[300px] sm:min-w-[400px] px-2 py-2 text-base rounded-lg border outline-none transition-all border-slate-300"
            type="text"
            name="firstName"
            defaultValue={
              guestData
                ? guestData.fullName?.split(" ").slice(0, -1).join(" ")
                : ""
            }
            placeholder="Nhập họ"
            {...register("firstName", {
              required: "Hãy nhập họ của bạn!",
            })}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 py-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <input
            className="min-w-[300px] sm:min-w-[400px] px-2 py-2 text-base rounded-lg border outline-none transition-all border-slate-300"
            type="text"
            name="lastName"
            placeholder="Nhập tên"
            defaultValue={
              guestData ? guestData.fullName?.split(" ").slice(-1) : ""
            }
            {...register("lastName", {
              required: "Hãy nhập tên của bạn!",
            })}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500 py-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div>
          <input
            className="min-w-[300px] sm:min-w-[400px] px-2 py-2 text-base rounded-lg border outline-none transition-all border-slate-300"
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            defaultValue={guestData ? guestData.phone : ""}
            {...register("phone", {
              required: "Hãy nhập số điện thoại",
              minLength: {
                value: 10,
                message: "Số điện thoại tối thiểu 10 số",
              },
              pattern: {
                value: /^(0|\+84)(\s?)[35789](\d{2})(\s?)\d{3}(\s?)\d{3}$/,
                message: "Số điện thoại không hợp lệ! Vui lòng nhập lại",
              },
            })}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 py-1">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <input
            className="min-w-[300px] sm:min-w-[400px] px-2 py-2 text-base rounded-lg border outline-none transition-all border-slate-300"
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={guestData ? guestData.email : ""}
            {...register("email", {
              required: "Hãy nhập email của bạn!",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email không hợp lệ! Vui lòng nhập lại!",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500 py-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            className="min-w-[300px] sm:min-w-[400px] px-2 py-2 text-base rounded-lg border outline-none transition-all border-slate-300"
            type="text"
            name="address"
            placeholder="Địa chỉ"
            defaultValue={guestData ? guestData.address : ""}
            {...register("address", {
              required: "Hãy nhập địa chỉ của bạn!",
            })}
          />
          {errors.address && (
            <p className="text-sm text-red-500 py-1">
              {errors.address.message}
            </p>
          )}
        </div>
        <div>
          <textarea
            className="min-w-[300px] sm:min-w-[400px] px-2 py-2 text-base min-h-[100px] rounded-lg border outline-none transition-all border-slate-300"
            type="text"
            name="observations"
            placeholder="Ghi chú đơn hàng"
            {...register("observations")}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <Button
          type="order"
          onClick={() => router.back()}
          className="uppercase bg-slate-400 hover:bg-slate-500"
        >
          Trở lại
        </Button>
        <button
          type="submit"
          className="p-4 px-8 uppercase transition-all bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600"
        >
          Tiếp theo
        </button>
      </div>
    </form>
  );
};

export default ShippingForm;
