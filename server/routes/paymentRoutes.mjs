// routes/paymentRoutes.mjs
import { Router } from "express";
import Stripe from "stripe";
import "dotenv/config";

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

router.post("/create-payment-intent", async (req, res) => {
  const { amount, currency } = req.body;

  // Validate amount and currency
  if (!amount || !currency) {
    return res.status(400).send({ error: "Amount and currency are required" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"], // Ensure this matches your payment method
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("PaymentIntent creation error:", error); // Log error for debugging
    res.status(500).send({
      error: error.message,
    });
  }
});

export default router;
