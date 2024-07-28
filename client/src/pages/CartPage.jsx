import Navbar_user from "../components/Navbar_user";
import CartForm from "../components/cart_components/CartForm";
import StepButtons from "../components/cart_components/stepper/StepButton";
import React from "react";
import CartContextProvider from "../contexts/cartContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function CartPage() {
  const stripePromise = loadStripe(
    "pk_test_51Pd5PtRuueEv9DGjDVcq53KQhCXnPthtn8Ua0El6SAkY3IecUvvETIuHa2O1QYBBKmK8jxbXKw2eqmnrmiokYgD000yWzkvOgY"
  );
  return (
    <CartContextProvider>
      <Navbar_user />
      <Elements stripe={stripePromise}>
        <CartForm />
        <StepButtons />
      </Elements>
    </CartContextProvider>
  );
}

export default CartPage;
