import React from "react";
import CheckoutDetails from "../../_components/CheckoutDetails";
import CheckoutForm from "../../_components/CheckoutForm";

const page = () => {
  return (
    <div className="pt-12 pb-16 px-8">
      <h2 className="text-center mb-12 text-[#E31837] text-3xl font-bold uppercase">
        Hoàn tất thanh toán
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        <CheckoutForm />
        <CheckoutDetails />
      </div>
    </div>
  );
};

export default page;
