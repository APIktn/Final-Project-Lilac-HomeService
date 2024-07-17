import Navbar_user from "../components/Navbar_user";
import CartForm from "../components/cart_components/CartForm";
import StepButtons from "../components/cart_components/stepper/StepButton";
import React, { useState } from "react";

export const CartContext = React.createContext();
export const SummaryContext = React.createContext();

function CartPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [netPrice, setNetPrice] = useState(0);

  return (
    <CartContext.Provider value={{ activeStep, setActiveStep }}>
      <Navbar_user />
      <SummaryContext.Provider value={{ netPrice, setNetPrice }}>
        <CartForm />
        <StepButtons />
      </SummaryContext.Provider>
    </CartContext.Provider>
  );
}

export default CartPage;
