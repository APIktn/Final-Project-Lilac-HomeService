import { Router } from "express";
import supabase from "../utils/db.mjs";

const adminserviceRouter = Router();

adminserviceRouter.post("/post", async (req, res) => {
  try {
    const { service_name, category_name, subServiceItems } = req.body;

    // ค้นหา category_id จาก category_name
    const { data: category, error: categoryError } = await supabase
      .from("categories")
      .select("category_id")
      .eq("category_name", category_name)
      .single();

    if (categoryError) {
      throw new Error(
        "Error occurred while fetching category: " + categoryError.message
      );
    }

    if (!category) {
      throw new Error("Category not found");
    }

    const category_id = category.category_id;

    // หา position_id ล่าสุดสำหรับ category_id ที่กำหนด
    const { data: lastService, error: lastServiceError } = await supabase
      .from("service")
      .select("position_id")
      .eq("category_id", category_id)
      .order("position_id", { ascending: false })
      .limit(1)
      .single();

    if (lastServiceError && lastServiceError.code !== "PGRST116") {
      throw lastServiceError;
    }

    const position_id = lastService ? lastService.position_id + 1 : 1;

    // Insert the service name into the services table and get the inserted service_id
    const { data: serviceData, error: serviceError } = await supabase
      .from("service")
      .insert([{ service_name, category_id, position_id }])
      .select("service_id")
      .single();

    if (serviceError) {
      throw serviceError;
    }

    const service_id = serviceData.service_id;

    // Prepare subServiceItems for insertion
    const subServiceInserts = subServiceItems.map((item) => ({
      service_id,
      service_lists: item.name,
      price: item.price ? parseFloat(item.price) : 0,
      units: item.unit,
      quantity: 0,
    }));

    // Insert subServiceItems into service_lists table
    const { error: subServiceError } = await supabase
      .from("service_lists")
      .insert(subServiceInserts);

    if (subServiceError) {
      throw subServiceError;
    }

    res.status(200).json({ message: "อัพโหลดข้อมูลสำเร็จ" });
  } catch (error) {
    console.error("Error uploading data", error);
    res
      .status(500)
      .json({ error: "เกิดข้อผิดพลาดในการอัพโหลดข้อมูล: " + error.message });
  }
});

export default adminserviceRouter;
