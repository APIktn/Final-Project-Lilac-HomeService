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

    // console.log("user_id", user_id);
    // console.log("orderdetailData", orderdetailData);

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

    // console.log("user_id", user_id);
    // console.log("orderdetailData", orderdetailData);

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
orderRouter.get("/inProgress", authenticateToken, async (req, res) => {
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
      .in("status", ["กำลังดำเนินการ"]);

    // console.log("user_id", user_id);
    // console.log("orderdetailData", orderdetailData);

    if (error || !orderdetailData) {
      return res.status(404).json({ error: "ไม่พบข้อมูลผู้ใช้งาน" });
    }

    res.json({ data: orderdetailData });
  } catch (error) {
    console.error("Error in GET /customer:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน" });
  }
});
//ออเดอร์ ดำเนินการสำเร็จ
orderRouter.get("/completed", authenticateToken, async (req, res) => {
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
      .in("status", ["ดำเนินการสำเร็จ"]);

    // console.log("user_id", user_id);
    // console.log("orderdetailData", orderdetailData);

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
orderRouter.put("/updateOrderStatus", authenticateToken, async (req, res) => {
  try {
    const { user_id } = req.user;
    const { order_detail_id, new_status } = req.body;

    const validStatuses = ["รอดำเนินการ", "กำลังดำเนินการ", "ดำเนินการสำเร็จ"];
    if (!validStatuses.includes(new_status)) {
      return res.status(400).json({ error: "สถานะใหม่ไม่ถูกต้อง" });
    }

    const { data, error } = await supabase
      .from("orderdetails")
      .update({ status: new_status })
      .eq("order_detail_id", order_detail_id);

    if (error) {
      console.error("Error updating status:", error);
      return res.status(500).json({ error: "ไม่สามารถอัพเดตสถานะได้" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "ไม่พบคำสั่งซื้อที่ระบุ" });
    }

    res.json({ message: "อัพเดตสถานะสำเร็จ", data });
  } catch (error) {
    console.error("Error in PUT /updateOrderStatus:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัพเดตสถานะคำสั่งซื้อ" });
  }
});
// อัพเดต technician_name
orderRouter.put("/updateTechnician", authenticateToken, async (req, res) => {
  try {
    const { user_id } = req.user;
    const { order_detail_id, technician_name } = req.body;

    const { data, error } = await supabase
      .from("orderdetails")
      .update({ technician_name })
      .eq("order_detail_id", order_detail_id);
    // .eq("orders.user_id", user_id);

    if (error || !data) {
      return res
        .status(404)
        .json({ error: "ไม่พบข้อมูลคำสั่งซื้อหรือไม่สามารถอัพเดตได้" });
    }

    res.json({ message: "อัพเดตพนักงานสำเร็จ", data });
  } catch (error) {
    console.error("Error in PUT /updateTechnician:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัพเดตพนักงาน" });
  }
});

// เอาช่างจาก users มาแสดง
orderRouter.get("/technicians", authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("firstname, lastname");

    if (error) {
      return res.status(500).json({ error: "ไม่สามารถดึงข้อมูลพนักงานได้" });
    }

    const technicians = data.map((user) => ({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      fullName: `${user.firstname} ${user.lastname}`,
    }));

    res.json(technicians);
  } catch (error) {
    console.error("Error fetching technicians:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลพนักงาน" });
  }
});

export default orderRouter;
