import express from "express";
import servicesRouter from "./routes/servicecards.mjs";
import cors from "cors";
import authRouter from "./controllers/authController.mjs";
import adminRouter from "./routes/admins.mjs";
import serviceDetailRouter from "./routes/serviceDetail.mjs";

import cartsRouter from "./routes/cart-routes.mjs";

import technicianRouter from "./routes/technicians.mjs";

import {
  authenticateToken,
  authorizeAdmin,
  authorizeTechnician,
} from "./middlewares/authVerify.mjs";

const app = express();
const port = 4000;

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

app.use(
  "/technician",
  authenticateToken,
  authorizeTechnician,
  technicianRouter
);

app.use("/", servicesRouter);
app.use("/", serviceDetailRouter);


app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
