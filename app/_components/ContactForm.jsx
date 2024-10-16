"use client";

import { useForm } from "react-hook-form";
import { insertContact } from "../_lib/actions";

import React from "react";
import Button from "./Button";
import toast from "react-hot-toast";

const ContactForm = () => {
  const { register, handleSubmit, formState, reset } = useForm();

  const { errors } = formState;

  const onSubmit = async (data) => {
    const newData = {
      name: data.firstName + " " + data.lastName,
      email: data.email,
      phone: data.phone,
      content: data.content,
    };
    const { error } = await insertContact(newData);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Gửi ý kiến thành công. Cảm ơn đóng góp của quý khách!");
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 px-8 py-8"
    >
      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-2">
          <label className="text-base font-semibold" for="firstName">
            Họ
          </label>
          <input
            className="px-2 py-2 text-base rounded-lg border outline-none transition-all border-slate-300"
            type="text"
            name="firstName"
            placeholder="Nhập họ"
            {...register("firstName", {
              required: "Hãy nhập họ",
            })}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 py-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-base font-semibold" for="lastName">
            Tên
          </label>
          <input
            className="px-2 py-2 text-base rounded-lg border outline-none transition-all border-slate-300"
            type="text"
            name="lastName"
            placeholder="Nhập tên"
            {...register("lastName", {
              required: "Hãy nhập tên",
            })}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500 py-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label for="email" className="text-base font-semibold">
          Email
        </label>
        <input
          className="px-2 py-2 text-base rounded-lg border outline-none transition-all border-slate-300"
          type="email"
          name="email"
          placeholder="Nhập email"
          {...register("email", {
            required: "Hãy nhập email của bạn",
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
      <div className="flex flex-col gap-2">
        <label for="phone" className="text-base font-semibold">
          Điện thoại
        </label>
        <input
          className="px-2 py-2 text-base rounded-lg border outline-none transition-all border-slate-300"
          type="text"
          name="phone"
          placeholder="Nhập số điện thoại"
          {...register("phone", {
            required: "Hãy nhập số điện thoại của bạn",
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
      <div className="flex flex-col gap-2">
        <label className="text-base font-semibold" for="content">
          Nội dung
        </label>
        <textarea
          className="px-2 py-2 text-base min-h-[100px] rounded-lg border outline-none transition-all border-slate-300"
          type="text"
          name="content"
          placeholder="Nhập nội dung"
          {...register("content", {
            required: "Hãy nhập ý kiến của bạn",
          })}
        />
        {errors.content && (
          <p className="text-sm text-red-500 py-1">{errors.content.message}</p>
        )}
      </div>
      <Button type="submit">Gửi</Button>
    </form>
  );
};

export default ContactForm;
