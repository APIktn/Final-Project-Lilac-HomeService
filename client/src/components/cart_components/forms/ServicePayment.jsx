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
import { TextField } from "@mui/material";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

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

function ServicePayment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [expCard, setExpCard] = useState("");
  const [cvcCard, setCVCCard] = useState("");
  const [nameCard, setNameCard] = useState("");

  const handleCardNumber = (event) => {
    let numberInput = event.target.value.replace(/\D/g, "");
    if (numberInput.length <= 16) {
      setCardNumber(numberInput.replace(/(\d{4})/g, "$1 ").trim());
    }
  };

  const handleExpCard = (event) => {
    let input = event.target.value.replace(/\D/g, "");
    if (input.length <= 4) {
      const month = input.substring(0, 2);
      const year = input.substring(2, 4);
      if (parseInt(month) > 12) {
        setTextAlert("Expiry month can only be 12 or less.");
      } else {
        setTextAlert("");
        setExpCard(`${month}/${year}`);
      }
    }
  };

  const handleCVCCard = (event) => {
    let input = event.target.value.replace(/\D/g, "");
    if (input.length <= 3) {
      setCVCCard(input);
    }
  };

  const handleNameCard = (event) => {
    setNameCard(event.target.value);
  };

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post(
          `http://localhost:4000/create-payment-intent`,
          { amount: 43000, currency: "thb" }
        );
        const { clientSecret } = response.data;
        setClientSecret(clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    createPaymentIntent();
  }, []);

  useEffect(() => {
    const getConfig = async () => {
      try {
        const response = await axios.get("http://localhost:4000/config");
        const { publishableKey } = response.data;
        setStripePromise(loadStripe(publishableKey));
      } catch (error) {
        console.error("Error fetching config:", error);
      }
    };

    getConfig();
  }, []);

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
