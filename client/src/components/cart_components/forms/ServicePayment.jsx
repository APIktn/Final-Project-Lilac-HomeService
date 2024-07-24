// src/PaymentForm.js
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51Pd5PtRuueEv9DGjDVcq53KQhCXnPthtn8Ua0El6SAkY3IecUvvETIuHa2O1QYBBKmK8jxbXKw2eqmnrmiokYgD000yWzkvOgY"
);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Create Payment Intent on the server
      const response = await axios.post(
        "http://localhost:4000/api/payments/create-payment-intent",
        {
          amount: amount * 100, //
          currency: "thb",
        }
      );

      const { clientSecret } = response.data;

      // Confirm the payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: email,
          },
        },
      });
// src/PaymentForm.js
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51Pd5PtRuueEv9DGjDVcq53KQhCXnPthtn8Ua0El6SAkY3IecUvvETIuHa2O1QYBBKmK8jxbXKw2eqmnrmiokYgD000yWzkvOgY"
);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Create Payment Intent on the server
      const response = await axios.post(
        "http://localhost:4000/api/payments/create-payment-intent",
        {
          amount: amount * 100, //
          currency: "thb",
        }
      );

      const { clientSecret } = response.data;

      // Confirm the payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: email,
          },
        },
      });

const theme = createTheme({
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "26.25px",
          "@media (min-width:768px)": {
            fontSize: "35px",
          },
        },
      },
    },
  },
});

      if (result.error) {
        console.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment successful");
          navigate("/success"); // Redirect to the success page
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

      if (result.error) {
        console.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment successful");
          navigate("/success"); // Redirect to the success page
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Amount
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>
      <label>
        Card Details
        <CardElement />
      </label>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

const WrappedPaymentForm = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default WrappedPaymentForm;
