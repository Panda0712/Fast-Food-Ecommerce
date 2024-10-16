import React from "react";
import CartDetails from "../../_components/CartDetails";
import ShippingForm from "../../_components/ShippingForm";

const page = () => {
  return (
    <div className="pt-12 pb-16 px-8">
      <h2 className="text-center mb-12 text-[#E31837] text-3xl font-bold uppercase">
        Thông tin đơn hàng
      </h2>
      <div className="flex flex-wrap justify-center gap-12">
        <ShippingForm />
        <CartDetails />
      </div>
    </div>
  );
};

export default page;
