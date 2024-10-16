import React from "react";
import CategoriesList from "../_components/CategoriesList";
import Foods from "../_components/Foods";
import Cart from "../_components/Cart";

const page = () => {
  return (
    <div className="relative bg-[#F9F6EE]">
      <CategoriesList />
      <Foods />
      <Cart />
    </div>
  );
};

export default page;
