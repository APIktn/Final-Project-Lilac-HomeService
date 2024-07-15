import Navbar_user from "../components/Navbar_user";
import CartForm from "../components/cart_components/CartForm";
import StepButtons from "../components/cart_components/stepper/StepButton";
import React, { useState } from "react";

export const CartContext = React.createContext();

function CartPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <CartContext.Provider value={{ activeStep, setActiveStep }}>
      <Navbar_user />
      <CartForm />
      <StepButtons />
    </CartContext.Provider>
  );
}

export default CartPage;
