import Navbar_admin from "../components/Navbar_admin";
import CartForm from "../components/cart_components/CartForm";
import StepButtons from "../components/cart_components/stepper/StepButton";
import React, { useState } from "react";
import CartContextProvider from "../contexts/cartContext";

function CartPage_admin() {
  return (
    <CartContextProvider>
      <Navbar_admin />
      <CartForm />
      <StepButtons />
    </CartContextProvider>
  );
}

export default CartPage_admin;
