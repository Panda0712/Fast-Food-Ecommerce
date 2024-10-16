import { createContext, useContext, useState } from "react";

const ShippingFormContext = createContext();

const ShippingFormProvider = ({ children }) => {
  const [formData, setFormData] = useState(
    JSON.parse(localStorage.getItem("formData")) ?? {}
  );

  const handleSetFormData = (newData) => {
    setFormData(newData);
    localStorage.setItem("formData", JSON.stringify(newData));
  };

  const resetFormData = () => {
    setFormData({});
    localStorage.removeItem("formData");
  };

  return (
    <ShippingFormContext.Provider
      value={{ formData, setFormData, handleSetFormData, resetFormData }}
    >
      {children}
    </ShippingFormContext.Provider>
  );
};

export const useShippingFormContext = () => {
  const context = useContext(ShippingFormContext);
  return context;
};

export default ShippingFormProvider;
