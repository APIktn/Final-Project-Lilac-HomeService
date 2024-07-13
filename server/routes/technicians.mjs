import { Router } from "express";

const technicianRouter = Router();

technicianRouter.get("/", (req, res) => {
  res.json({ message: "ยินดีต้อนรับสู่เข้าสู่ระบบช่างเทคนิค" });
});

technicianRouter.get("/getdata", (req, res) => {
  res.json({ message: "ข้อมูลสำหรับช่างเทคนิค" });
});

export default technicianRouter;
