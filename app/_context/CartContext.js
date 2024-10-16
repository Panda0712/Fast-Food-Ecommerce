import { createContext, useContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) ?? []
  );

  const addToCart = (item) => {
    const checkedFood = cart.filter((food) => food.id === Number(item.id));
    if (checkedFood.length) {
      const newCart = [...cart].map((food) =>
        food.id === Number(item.id)
          ? { ...food, quantity: food.quantity + 1 }
          : food
      );
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      setCart((cart) => {
        const updateCart = [...cart, item];
        localStorage.setItem("cart", JSON.stringify(updateCart));
        return updateCart;
      });
    }
  };

  const handleIncrement = (id) => {
    const newCart = cart.map((food) =>
      food.id === Number(id) ? { ...food, quantity: food.quantity + 1 } : food
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleDecrement = (id) => {
    const foodToDecrement = cart.find((food) => food.id === Number(id));
    if (foodToDecrement.quantity === 1) removeFromCart(id);
    else {
      const newCart = cart.map((food) =>
        food.id === Number(id) ? { ...food, quantity: food.quantity - 1 } : food
      );
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const removeFromCart = (id) => {
    const newCart = [...cart].filter((item) => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const resetCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        handleIncrement,
        handleDecrement,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
};

export default CartProvider;
