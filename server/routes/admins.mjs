import { Router } from "express";

const adminRouter = Router();

adminRouter.get("/", (req, res) => {
  res.json({ message: "ยินดีต้อนรับสู่เข้าสู่ระบบแอดมิน" });
});

adminRouter.get("/getdata", (req, res) => {
  res.json({ message: "ข้อมูลสำหรับแอดมิน" });
});

export default adminRouter;
