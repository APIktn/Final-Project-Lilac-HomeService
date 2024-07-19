import Navbar_admin from "../components/Navbar_admin";
import CartForm from "../components/cart_components/CartForm";
import StepButtons from "../components/cart_components/stepper/StepButton";
import React, { useState } from "react";

export const CartContext = React.createContext();

function CartPage_admin() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <CartContext.Provider value={{ activeStep, setActiveStep }}>
      <Navbar_admin />
      <CartForm />
      <StepButtons />
    </CartContext.Provider>
  );
}

export default CartPage_admin;
