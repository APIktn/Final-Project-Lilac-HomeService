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

    const { data: orderdetailData, error: orderError } = await supabase
      .from("orderdetails")
      .select(
        `
          order_detail_id,
          order_id,
          orders!inner (
            order_id
          ),
          *
        `
      )
      .eq("orders.user_id", user_id)
      .in("status", ["ดำเนินการสำเร็จ"]);

    if (orderError || !orderdetailData) {
      return res.status(404).json({ error: "ไม่พบข้อมูลคำสั่งซื้อ" });
    }

    // Accumulate data for each order_id
    const accumulatedOrderDetails = orderdetailData.reduce((acc, order) => {
      if (!acc[order.order_id]) {
        acc[order.order_id] = {
          ...order,
          service_lists: Array.isArray(order.service_lists)
            ? order.service_lists
            : [order.service_lists],
          quantity_per_order: Array.isArray(order.quantity_per_order)
            ? order.quantity_per_order
            : [order.quantity_per_order],
          technicians: [order.technician_id], // Add an array for technicians
        };
      } else {
        acc[order.order_id] = {
          ...acc[order.order_id],
          ...order,
          service_lists: acc[order.order_id].service_lists.concat(
            Array.isArray(order.service_lists)
              ? order.service_lists
              : [order.service_lists]
          ),
          quantity_per_order: acc[order.order_id].quantity_per_order.concat(
            Array.isArray(order.quantity_per_order)
              ? order.quantity_per_order
              : [order.quantity_per_order]
          ),
          technicians: [
            ...new Set([
              ...acc[order.order_id].technicians,
              order.technician_id,
            ]), // Ensure unique technician IDs
          ],
        };
      }
      return acc;
    }, {});

    const filteredOrderDetails = Object.values(accumulatedOrderDetails);

    const technicianIds = [
      ...new Set(
        filteredOrderDetails.flatMap((order) => order.technicians) // Collect all unique technician IDs
      ),
    ];

    const { data: technicianData, error: techError } = await supabase
      .from("users")
      .select("firstname, lastname, user_id")
      .in("user_id", technicianIds); // Fetch technicians using IDs

    if (techError) {
      return res.status(500).json({ error: "ไม่สามารถดึงข้อมูลพนักงานได้" });
    }

    const techniciansMap = technicianData.reduce((acc, tech) => {
      acc[tech.user_id] = `${tech.firstname} ${tech.lastname}`;
      return acc;
    }, {});

    const enrichedOrderDetails = filteredOrderDetails.map((order) => ({
      ...order,
      technician_name: [
        ...new Set(
          order.technicians // Remove duplicate technician names
            .map((id) => techniciansMap[id] || "ไม่พบชื่อพนักงาน")
        ),
      ].join(", "), // Concatenate unique technician names
    }));

    enrichedOrderDetails.sort((a, b) => b.order_id - a.order_id);
    res.json({ data: enrichedOrderDetails });
  } catch (error) {
    console.error("Error in GET /completeorder", error);
    res
      .status(500)
      .json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลคำสั่งซื้อและพนักงาน" });
  }
});

//ออเดอร์ยังไม่เสร็จ
orderRouter.get("/incompleteorder", authenticateToken, async (req, res) => {
  try {
    const { user_id } = req.user;

    const { data: orderdetailData, error: orderError } = await supabase
      .from("orderdetails")
      .select(
        `
          order_detail_id,
          order_id,
          orders!inner (
            order_id
          ),
          *
        `
      )
      .eq("orders.user_id", user_id)
      .in("status", ["รอดำเนินการ", "กำลังดำเนินการ"]);

    if (orderError || !orderdetailData) {
      return res.status(404).json({ error: "ไม่พบข้อมูลคำสั่งซื้อ" });
    }

    // Accumulate data for each order_id
    const accumulatedOrderDetails = orderdetailData.reduce((acc, order) => {
      if (!acc[order.order_id]) {
        acc[order.order_id] = {
          ...order,
          service_lists: Array.isArray(order.service_lists)
            ? order.service_lists
            : [order.service_lists],
          quantity_per_order: Array.isArray(order.quantity_per_order)
            ? order.quantity_per_order
            : [order.quantity_per_order],
          technicians: [order.technician_id], // Add an array for technicians
        };
      } else {
        acc[order.order_id] = {
          ...acc[order.order_id],
          ...order,
          service_lists: acc[order.order_id].service_lists.concat(
            Array.isArray(order.service_lists)
              ? order.service_lists
              : [order.service_lists]
          ),
          quantity_per_order: acc[order.order_id].quantity_per_order.concat(
            Array.isArray(order.quantity_per_order)
              ? order.quantity_per_order
              : [order.quantity_per_order]
          ),
          technicians: acc[order.order_id].technicians.concat(
            order.technician_id
          ), // Append technician IDs
        };
      }
      return acc;
    }, {});

    const filteredOrderDetails = Object.values(accumulatedOrderDetails);

    const technicianIds = [
      ...new Set(filteredOrderDetails.flatMap((order) => order.technicians)), // Collect all technician IDs
    ];

    const { data: technicianData, error: techError } = await supabase
      .from("users")
      .select("firstname, lastname, user_id")
      .in("user_id", technicianIds); // Fetch technicians using IDs

    if (techError) {
      return res.status(500).json({ error: "ไม่สามารถดึงข้อมูลพนักงานได้" });
    }

    const techniciansMap = technicianData.reduce((acc, tech) => {
      acc[tech.user_id] = `${tech.firstname} ${tech.lastname}`;
      return acc;
    }, {});

    const enrichedOrderDetails = filteredOrderDetails.map((order) => {
      // Create a set to ensure unique technician names
      const uniqueTechnicians = [
        ...new Set(
          order.technicians.map(
            (id) => techniciansMap[id] || "ไม่พบชื่อพนักงาน"
          )
        ),
      ];
      return {
        ...order,
        technician_name: uniqueTechnicians.join(", "), // Join unique technician names
      };
    });

    enrichedOrderDetails.sort((a, b) => b.order_id - a.order_id);

    res.json({ data: enrichedOrderDetails });
  } catch (error) {
    console.error("Error in GET /incompleteorder", error);
    res
      .status(500)
      .json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลคำสั่งซื้อและพนักงาน" });
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
          *
        `
      )

      .in("status", ["รอดำเนินการ"]);

    if (error || !orderdetailData) {
      return res.status(404).json({ error: "ไม่พบข้อมูลผู้ใช้งาน" });
    }

    const userIds = [
      ...new Set(orderdetailData.map((order) => order.orders.user_id)),
    ];

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("firstname, lastname, user_id, tel_num")
      .in("user_id", userIds);

    if (userError) {
      return res.status(500).json({ error: "ไม่สามารถดึงข้อมูลผู้ใช้งานได้" });
    }

    // Map user details to include both full name and phone number
    const usersMap = userData.reduce((acc, user) => {
      acc[user.user_id] = {
        fullname: `${user.firstname} ${user.lastname}`,
        tel: user.tel_num,
      };
      return acc;
    }, {});

    // Enrich order details with both full name and phone number
    const enrichedOrderDetails = orderdetailData.map((order) => {
      const user = usersMap[order.orders.user_id] || {
        fullname: "ไม่พบชื่อผู้ใช้งาน",
        tel: "ไม่พบหมายเลขโทรศัพท์",
      };
      return {
        ...order,
        userfullname: user.fullname,
        usertel: user.tel,
      };
    });

    res.json({ data: enrichedOrderDetails });
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
          *
        `
      )

      .in("status", ["กำลังดำเนินการ"]);

    if (error || !orderdetailData) {
      return res.status(404).json({ error: "ไม่พบข้อมูลผู้ใช้งาน" });
    }

    const userIds = [
      ...new Set(orderdetailData.map((order) => order.orders.user_id)),
    ];

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("firstname, lastname, user_id, tel_num")
      .in("user_id", userIds);

    if (userError) {
      return res.status(500).json({ error: "ไม่สามารถดึงข้อมูลผู้ใช้งานได้" });
    }

    // Map user details to include both full name and phone number
    const usersMap = userData.reduce((acc, user) => {
      acc[user.user_id] = {
        fullname: `${user.firstname} ${user.lastname}`,
        tel: user.tel_num,
      };
      return acc;
    }, {});

    // Enrich order details with both full name and phone number
    const enrichedOrderDetails = orderdetailData.map((order) => {
      const user = usersMap[order.orders.user_id] || {
        fullname: "ไม่พบชื่อผู้ใช้งาน",
        tel: "ไม่พบหมายเลขโทรศัพท์",
      };
      return {
        ...order,
        userfullname: user.fullname,
        usertel: user.tel,
      };
    });

    enrichedOrderDetails.sort((a, b) => b.order_id - a.order_id);

    res.json({ data: enrichedOrderDetails });
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
          *
        `
      )

      .in("status", ["ดำเนินการสำเร็จ"]);

    if (error || !orderdetailData) {
      return res.status(404).json({ error: "ไม่พบข้อมูลผู้ใช้งาน" });
    }

    const userIds = [
      ...new Set(orderdetailData.map((order) => order.orders.user_id)),
    ];

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("firstname, lastname, user_id, tel_num")
      .in("user_id", userIds);

    if (userError) {
      return res.status(500).json({ error: "ไม่สามารถดึงข้อมูลผู้ใช้งานได้" });
    }

    // Map user details to include both full name and phone number
    const usersMap = userData.reduce((acc, user) => {
      acc[user.user_id] = {
        fullname: `${user.firstname} ${user.lastname}`,
        tel: user.tel_num,
      };
      return acc;
    }, {});

    // Enrich order details with both full name and phone number
    const enrichedOrderDetails = orderdetailData.map((order) => {
      const user = usersMap[order.orders.user_id] || {
        fullname: "ไม่พบชื่อผู้ใช้งาน",
        tel: "ไม่พบหมายเลขโทรศัพท์",
      };
      return {
        ...order,
        userfullname: user.fullname,
        usertel: user.tel,
      };
    });

    enrichedOrderDetails.sort((a, b) => b.order_id - a.order_id);

    res.json({ data: enrichedOrderDetails });
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

    // Prepare the update data object
    const updateData = { status: new_status };

    // If the new status is "ดำเนินการสำเร็จ", set the finish_date and finish_time
    if (new_status === "ดำเนินการสำเร็จ") {
      const currentDate = new Date();
      updateData.finish_date = currentDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      updateData.finish_time = currentDate.toTimeString().split(" ")[0]; // Format as HH:MM:SS
    }

    const { data, error } = await supabase
      .from("orderdetails")
      .update(updateData)
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

// อัพเดต technician_id
orderRouter.put("/updateTechnician", authenticateToken, async (req, res) => {
  try {
    const { user_id } = req.user;
    // const { order_detail_id, technician_name } = req.body;
    const { order_detail_id, technician_id } = req.body;
    // console.log(technician_id);

    const { data, error } = await supabase
      .from("orderdetails")
      // .update({ technician_name })
      .update({ technician_id })
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
      .select("firstname, lastname, work_status, user_id")
      .in("role", ["technician"]);

    if (error) {
      return res.status(500).json({ error: "ไม่สามารถดึงข้อมูลพนักงานได้" });
    }

    const technicians = data.map((user) => {
      let fullName = `${user.firstname} ${user.lastname}`;
      // if (user.work_status === "กำลังทำงาน") {
      //   fullName += " (working)";
      // }

      return {
        id: user.user_id,
        // firstname: user.firstname,
        // lastname: user.lastname,
        work_status: user.work_status,
        fullName: fullName,
      };
    });

    res.json(technicians);
  } catch (error) {
    console.error("Error fetching technicians:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลพนักงาน" });
  }
});
//
//ตัวอย่าง
orderRouter.get(
  "/orderdetails-with-technician-names",
  authenticateToken,
  async (req, res) => {
    try {
      const { user_id } = req.user;

      // Step 1: Fetch order details
      const { data: orderdetailData, error: orderError } = await supabase
        .from("orderdetails")
        .select(
          `
          order_detail_id,
          order_id,
          orders!inner (
            order_id
          ),
          service_lists,
          service_id,
          status,
          order_date,
          time,
          quantity_per_order,
          total_amount,
          technician_id,
          order_code
        `
        )
        .eq("orders.user_id", user_id)
        .in("status", ["ดำเนินการสำเร็จ"]);

      if (orderError || !orderdetailData) {
        return res.status(404).json({ error: "ไม่พบข้อมูลคำสั่งซื้อ" });
      }

      // Collect unique technician IDs from order details
      const technicianIds = [
        ...new Set(orderdetailData.map((order) => order.technician_id)),
      ];

      // Step 2: Fetch technician details
      const { data: technicianData, error: techError } = await supabase
        .from("users")
        .select("firstname, lastname, user_id")
        .in("user_id", technicianIds);

      if (techError) {
        return res.status(500).json({ error: "ไม่สามารถดึงข้อมูลพนักงานได้" });
      }

      // Map technician data for quick lookup
      const techniciansMap = technicianData.reduce((acc, tech) => {
        acc[tech.user_id] = `${tech.firstname} ${tech.lastname}`;
        return acc;
      }, {});

      // Step 3: Add technician names to order details
      const enrichedOrderDetails = orderdetailData.map((order) => ({
        ...order,
        technician_name:
          techniciansMap[order.technician_id] || "ไม่พบชื่อพนักงาน",
      }));

      res.json({ data: enrichedOrderDetails });
    } catch (error) {
      console.error("Error in GET /orderdetails-with-technician-names:", error);
      res
        .status(500)
        .json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลคำสั่งซื้อและพนักงาน" });
    }
  }
);

// ข้อมูลรอดำเนินงานเฉพาะของช่างแต่ละคน
orderRouter.get("/TechPending", authenticateToken, async (req, res) => {
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
          *
        `
      )
      .eq("technician_id", user_id)
      .in("status", ["รอดำเนินการ"]);

    if (error || !orderdetailData) {
      return res.status(404).json({ error: "ไม่พบข้อมูลผู้ใช้งาน" });
    }

    const userIds = [
      ...new Set(orderdetailData.map((order) => order.orders.user_id)),
    ];

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("firstname, lastname, user_id, tel_num")
      .in("user_id", userIds);

    if (userError) {
      return res.status(500).json({ error: "ไม่สามารถดึงข้อมูลผู้ใช้งานได้" });
    }

    // Map user details to include both full name and phone number
    const usersMap = userData.reduce((acc, user) => {
      acc[user.user_id] = {
        fullname: `${user.firstname} ${user.lastname}`,
        tel: user.tel_num,
      };
      return acc;
    }, {});

    // Enrich order details with both full name and phone number
    const enrichedOrderDetails = orderdetailData.map((order) => {
      const user = usersMap[order.orders.user_id] || {
        fullname: "ไม่พบชื่อผู้ใช้งาน",
        tel: "ไม่พบหมายเลขโทรศัพท์",
      };
      return {
        ...order,
        userfullname: user.fullname,
        usertel: user.tel,
      };
    });

    enrichedOrderDetails.sort((a, b) => b.order_id - a.order_id);

    res.json({ data: enrichedOrderDetails });
  } catch (error) {
    console.error("Error in GET /customer:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน" });
  }
});
// ข้อมูลกำลังดำเนินงานเฉพาะของช่างแต่ละคน
orderRouter.get("/TechinProgress", authenticateToken, async (req, res) => {
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
          *
        `
      )
      .eq("technician_id", user_id)
      .in("status", ["กำลังดำเนินการ"]);

    if (error || !orderdetailData) {
      return res.status(404).json({ error: "ไม่พบข้อมูลผู้ใช้งาน" });
    }

    const userIds = [
      ...new Set(orderdetailData.map((order) => order.orders.user_id)),
    ];

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("firstname, lastname, user_id, tel_num")
      .in("user_id", userIds);

    if (userError) {
      return res.status(500).json({ error: "ไม่สามารถดึงข้อมูลผู้ใช้งานได้" });
    }

    // Map user details to include both full name and phone number
    const usersMap = userData.reduce((acc, user) => {
      acc[user.user_id] = {
        fullname: `${user.firstname} ${user.lastname}`,
        tel: user.tel_num,
      };
      return acc;
    }, {});

    // Enrich order details with both full name and phone number
    const enrichedOrderDetails = orderdetailData.map((order) => {
      const user = usersMap[order.orders.user_id] || {
        fullname: "ไม่พบชื่อผู้ใช้งาน",
        tel: "ไม่พบหมายเลขโทรศัพท์",
      };
      return {
        ...order,
        userfullname: user.fullname,
        usertel: user.tel,
      };
    });

    enrichedOrderDetails.sort((a, b) => b.order_id - a.order_id);

    res.json({ data: enrichedOrderDetails });
  } catch (error) {
    console.error("Error in GET /customer:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน" });
  }
});

// ข้อมูลดำเนินการสำเร็จเฉพาะของช่างแต่ละคน
orderRouter.get("/TechCompleted", authenticateToken, async (req, res) => {
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
          *
        `
      )
      .eq("technician_id", user_id)
      .in("status", ["ดำเนินการสำเร็จ"]);

    if (error || !orderdetailData) {
      return res.status(404).json({ error: "ไม่พบข้อมูลผู้ใช้งาน" });
    }

    const userIds = [
      ...new Set(orderdetailData.map((order) => order.orders.user_id)),
    ];

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("firstname, lastname, user_id, tel_num")
      .in("user_id", userIds);

    if (userError) {
      return res.status(500).json({ error: "ไม่สามารถดึงข้อมูลผู้ใช้งานได้" });
    }

    // Map user details to include both full name and phone number
    const usersMap = userData.reduce((acc, user) => {
      acc[user.user_id] = {
        fullname: `${user.firstname} ${user.lastname}`,
        tel: user.tel_num,
      };
      return acc;
    }, {});

    // Enrich order details with both full name and phone number
    const enrichedOrderDetails = orderdetailData.map((order) => {
      const user = usersMap[order.orders.user_id] || {
        fullname: "ไม่พบชื่อผู้ใช้งาน",
        tel: "ไม่พบหมายเลขโทรศัพท์",
      };
      return {
        ...order,
        userfullname: user.fullname,
        usertel: user.tel,
      };
    });

    enrichedOrderDetails.sort((a, b) => b.order_id - a.order_id);

    res.json({ data: enrichedOrderDetails });
  } catch (error) {
    console.error("Error in GET /customer:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน" });
  }
});

//รับงาน

orderRouter.put("/updateJob", authenticateToken, async (req, res) => {
  try {
    const { user_id, new_status } = req.body;

    // ตรวจสอบว่าค่าสถานะใหม่ถูกต้องหรือไม่
    const validStatuses = ["กำลังรองาน", "กำลังทำงาน"];
    if (!validStatuses.includes(new_status)) {
      return res.status(400).json({ error: "สถานะใหม่ไม่ถูกต้อง" });
    }

    // อัพเดตสถานะในตาราง users
    const { data, error } = await supabase
      .from("users")
      .update({ work_status: new_status })
      .eq("user_id", user_id);

    // ตรวจสอบข้อผิดพลาดในการอัพเดต
    if (error) {
      console.error("Error updating status:", error.message);
      return res.status(500).json({ error: "ไม่สามารถอัพเดตสถานะได้" });
    }

    // ส่งข้อมูลตอบกลับเมื่ออัพเดตสำเร็จ
    res.json({ message: "อัพเดตสถานะสำเร็จ", data });
  } catch (error) {
    console.error("Error in PUT /updateJob:", error.message);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัพเดตสถานะผู้ใช้" });
  }
});

///อัพเดทการ์ด tech
orderRouter.put("/updateTechCard", authenticateToken, async (req, res) => {
  try {
    const { user_id, order_detail_id, new_status } = req.body;

    // ตรวจสอบว่าค่าสถานะใหม่ถูกต้องหรือไม่
    const validOrderStatuses = [
      "รอดำเนินการ",
      "กำลังดำเนินการ",
      "ดำเนินการสำเร็จ",
    ];
    const validWorkStatuses = ["กำลังรองาน", "กำลังทำงาน"];

    if (
      !validOrderStatuses.includes(new_status) &&
      !validWorkStatuses.includes(new_status)
    ) {
      return res.status(400).json({ error: "สถานะใหม่ไม่ถูกต้อง" });
    }

    // อัพเดตสถานะในตาราง orderdetails
    if (validOrderStatuses.includes(new_status)) {
      const { data: orderData, error: orderError } = await supabase
        .from("orderdetails")
        .update({ status: new_status })
        .eq("order_detail_id", order_detail_id);

      if (orderError) {
        console.error("Error updating order status:", orderError);
        return res
          .status(500)
          .json({ error: "ไม่สามารถอัพเดตสถานะคำสั่งซื้อได้" });
      }

      res.json({ message: "อัพเดตสถานะคำสั่งซื้อสำเร็จ", data: orderData });
    }

    // อัพเดตสถานะในตาราง users
    else if (validWorkStatuses.includes(new_status)) {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .update({ work_status: new_status })
        .eq("user_id", user_id);

      if (userError) {
        console.error("Error updating work status:", userError.message);
        return res.status(500).json({ error: "ไม่สามารถอัพเดตสถานะผู้ใช้ได้" });
      }

      res.json({ message: "อัพเดตสถานะผู้ใช้สำเร็จ", data: userData });
    }
  } catch (error) {
    console.error("Error in PUT /updateOrderStatus:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัพเดตสถานะ" });
  }
});

export default orderRouter;
