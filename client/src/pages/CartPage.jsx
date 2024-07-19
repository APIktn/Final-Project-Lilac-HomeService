import Navbar_user from "../components/Navbar_user";
import CartForm from "../components/cart_components/CartForm";
import StepButtons from "../components/cart_components/stepper/StepButton";
import React from "react";
import CartContextProvider from "../contexts/cartContext";

function CartPage() {
  return (
    <CartContextProvider>
      <Navbar_user />
      <CartForm />
      <StepButtons />
    </CartContextProvider>
  );
}

export default CartPage;
