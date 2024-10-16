"use client";

import React from "react";
import Button from "./_components/Button";

const Error = ({ error, reset }) => {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Có lỗi xảy ra!</h1>
      <p className="text-lg">{error.message}</p>

      <Button type="primary" onClick={reset}>
        Thử lại
      </Button>
    </main>
  );
};

export default Error;
