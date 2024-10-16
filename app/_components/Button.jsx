"use client";

import React from "react";

const Button = ({
  children,
  type,
  onClick,
  disabled = false,
  className = "",
}) => {
  const classType =
    type === "primary"
      ? `p-2 transition-all rounded-md text-sm bg-red-500 text-white cursor-pointer hover:bg-red-600 ${className}`
      : type === "third"
      ? `px-3 py-2 border-none buttonShadow transition-all rounded-lg text-sm bg-orange-500 text-white cursor-pointer hover:bg-orange-600 ${className}`
      : type === "fourth"
      ? `px-8 py-3 border-none buttonShadow transition-all rounded-full text-sm bg-orange-500 text-white cursor-pointer hover:bg-orange-600 ${className}`
      : type === "submit"
      ? `p-3 transition-all border bg-orange-400 text-white rounded-md text-base font-semibold hover:bg-orange-500 ${className}`
      : type === "order"
      ? `p-4 px-8 transition-all bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 ${className}`
      : `p-2 transition-all border bg-slate-200 rounded-md text-sm hover:bg-slate-300 ${className}`;

  return (
    <button
      disabled={disabled}
      className={classType}
      onClick={(e) => onClick?.(e)}
    >
      {children}
    </button>
  );
};

export default Button;
