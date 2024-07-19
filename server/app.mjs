import express from "express";
import servicesRouter from "./routes/servicecards.mjs";
import cors from "cors";
import authRouter from "./controllers/authController.mjs";
import adminRouter from "./routes/admins.mjs";
import uploadsRouter from "./routes/upload.mjs";
import cartsRouter from "./routes/cart-routes.mjs";
import technicianRouter from "./routes/technicians.mjs";
/*import Stripe from "stripe";
import "dotenv/config";*/

import {
  authenticateToken,
  authorizeAdmin,
  authorizeTechnician,
} from "./middlewares/authVerify.mjs";

const app = express();
const port = 4000;
/*const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = Stripe(stripeSecretKey);*/

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/auth", authRouter);

app.use("/admin", authenticateToken, authorizeAdmin, adminRouter);

app.use("/services", servicesRouter);
app.use("/cart", cartsRouter);
app.use("/uploads", uploadsRouter);
app.use(
  "/technician",
  authenticateToken,
  authorizeTechnician,
  technicianRouter
);

app.use("/", servicesRouter);

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

/*app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "thb",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});*/

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
