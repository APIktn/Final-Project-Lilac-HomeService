import express from "express";
import servicesRouter from "./routes/servicecards.mjs";
import cors from "cors";
import authRouter from "./controllers/authController.mjs";
import adminRouter from "./routes/admins.mjs";
import userRouter from "./routes/users.mjs";
import uploadsRouter from "./routes/upload.mjs";
import cartsRouter from "./routes/cart-routes.mjs";
import technicianRouter from "./routes/technicians.mjs";
import "dotenv/config";
import paymentRoutes from "./routes/paymentRoutes.mjs";
import orderRouter from "./routes/order.mjs";
import adminserviceslistRouter from "./routes/admin-serviceslist.mjs";
import promotionRouter from "./routes/admin-promotion.mjs";
import categoriesRouter from "./routes/admin-categories.mjs";
import adminserviceRouter from "./routes/adminhandleservices.mjs";
import promotionsRouter from "./routes/promotion-code.mjs";
import {
  authenticateToken,
  authorizeAdmin,
  authorizeTechnician,
} from "./middlewares/authVerify.mjs";
import bodyParser from "body-parser";
import _ from "lodash";

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = [
  process.env.VITE_BACKEND_URL,
  'https://lilac-homeservices.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  }
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRouter);

app.use("/admin", authenticateToken, authorizeAdmin, adminRouter);
app.use("/promotion", promotionRouter);
app.use("/adminserviceslist", adminserviceslistRouter);
app.use("/adminservice", adminserviceRouter);

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

app.use("/api/payments", paymentRoutes);
app.use("/", orderRouter);
app.use("/", promotionsRouter);

app.use("/user", userRouter);

app.use("/", servicesRouter);

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
