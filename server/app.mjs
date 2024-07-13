import express from "express";
import servicesRouter from "./routes/services.mjs";
import cors from "cors";
import authRouter from "./controllers/authController.mjs";
import adminRouter from "./routes/admins.mjs";
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

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
