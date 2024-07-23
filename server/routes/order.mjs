import { Router } from "express";
import supabase from "../utils/db.mjs";
import { authenticateToken } from "../middlewares/authVerify.mjs";
import { generateAvatarUrl } from "../utils/avatarGenerator.mjs";
import {
  validateUpdateProfile,
  validateUpdatePassword,
} from "../middlewares/validators.mjs";
import cloudinary from "../utils/cloudinary.mjs";
import upload from "../middlewares/upload.mjs";
import bcrypt from "bcrypt";

const orderRouter = Router();

// ออเดอร์ที่เสร็จแล้ว
orderRouter.get("/completeorder", authenticateToken, async (req, res) => {
  try {
    const { user_id } = req.user;

    const { data: orderdetailData, error } = await supabase
      .from("orderdetails")
      .select(
        `
          order_detail_id,
          orders (
            order_id,
            user_id
          ),
          service_lists,
          service_id,
          status,
          order_date,
          time,
          quantity_per_order,
          total_amount
          ,technician_name,
          technician_id,
          order_code
        `
      )
      .eq("orders.user_id", user_id)
      .in("status", ["ดำเนินการสำเร็จ"]);

    console.log("user_id", user_id);
    console.log("orderdetailData", orderdetailData);

    if (error || !orderdetailData) {
      return res.status(404).json({ error: "ไม่พบข้อมูลผู้ใช้งาน" });
    }

    res.json({ data: orderdetailData });
  } catch (error) {
    console.error("Error in GET /customer:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน" });
  }
});
//ออเดอร์กำลังดำเนินการ
orderRouter.get("/incompleteorder", authenticateToken, async (req, res) => {
  try {
    const { user_id } = req.user;

    const { data: orderdetailData, error } = await supabase
      .from("orderdetails")
      .select(
        `
          order_detail_id,
          orders (
            order_id,
            user_id
          ),
          service_lists,
          service_id,
          status,
          order_date,
          time,
          quantity_per_order,
          total_amount
          ,technician_name,
          technician_id,
          order_code
        `
      )
      .eq("orders.user_id", user_id)
      .in("status", ["รอดำเนินการ", "กำลังดำเนินการ"]);

    console.log("user_id", user_id);
    console.log("orderdetailData", orderdetailData);

    if (error || !orderdetailData) {
      return res.status(404).json({ error: "ไม่พบข้อมูลผู้ใช้งาน" });
    }

    res.json({ data: orderdetailData });
  } catch (error) {
    console.error("Error in GET /customer:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน" });
  }
});

//ออเดอร์รอดำเนินการ
orderRouter.get("/pending", authenticateToken, async (req, res) => {
  try {
    const { user_id } = req.user;

    const { data: orderdetailData, error } = await supabase
      .from("orderdetails")
      .select(
        `
          order_detail_id,
          orders (
            order_id,
            user_id
          ),
          service_lists,
          service_id,
          status,
          order_date,
          time,
          quantity_per_order,
          total_amount
          ,technician_name,
          technician_id,
          order_code
        `
      )
      .in("status", ["รอดำเนินการ"]);

    console.log("user_id", user_id);
    console.log("orderdetailData", orderdetailData);

    if (error || !orderdetailData) {
      return res.status(404).json({ error: "ไม่พบข้อมูลผู้ใช้งาน" });
    }

    res.json({ data: orderdetailData });
  } catch (error) {
    console.error("Error in GET /customer:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน" });
  }
});

//อัพเดท status บริการ

export default orderRouter;
