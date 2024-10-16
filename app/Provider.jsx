"use client";

import React from "react";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import CartProvider from "./_context/CartContext";
import ShippingFormProvider from "./_context/ShippingFormContext";

const Provider = ({ children }) => {
  return (
    <CartProvider>
      <ShippingFormProvider>
        <div className="min-h-screen scrollbar-thin flex flex-col justify-between">
          <Header />
          {children}
          <Footer />
        </div>
      </ShippingFormProvider>
    </CartProvider>
  );
};

export default Provider;
