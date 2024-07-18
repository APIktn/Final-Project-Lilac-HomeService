import express from "express";
import servicesRouter from "./routes/servicecards.mjs";
import cors from "cors";
import authRouter from "./controllers/authController.mjs";
import adminRouter from "./routes/admins.mjs";
import uploadsRouter from "./routes/upload.mjs";
import cartsRouter from "./routes/cart-routes.mjs";
import technicianRouter from "./routes/technicians.mjs";
import promotionRouter from "./routes/admin-promotion.mjs";
import categoriesRouter from "./routes/admin-categories.mjs";
import adminserviceRouter from "./routes/adminpost.mjs";

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
app.use("/promotion", promotionRouter);

app.use("/categories", categoriesRouter);
app.use("/services", servicesRouter);
app.use("/cart", cartsRouter);
app.use("/uploads", uploadsRouter);
app.use(
  "/technician",
  authenticateToken,
  authorizeTechnician,
  technicianRouter
);

app.use("/adminservice", adminserviceRouter);

app.use("/", servicesRouter);

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
