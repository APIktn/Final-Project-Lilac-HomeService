import { Router } from "express";
import supabase from "../utils/db.mjs";
import upload from "../middlewares/upload.mjs"; // เพิ่ม import นี้
import cloudinary from "../utils/cloudinary.mjs"; // เพิ่ม import นี้

const adminserviceRouter = Router();

adminserviceRouter.post("/post", upload.single("file"), async (req, res) => {
  try {
    const { servicename, category_name, sub_services } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "กรุณาอัพโหลดรูปภาพ" });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "service_images" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(file.buffer);
    });

    const imageUrl = uploadResult.secure_url;

    const { data: categoryData, error: categoryError } = await supabase
      .from("categories")
      .select("category_id")
      .eq("category_name", category_name)
      .single();

    if (categoryError || !categoryData) {
      return res.status(400).json({ error: "ไม่พบหมวดหมู่ที่ระบุ" });
    }

    const category_id = categoryData.category_id;

    const { data: serviceCount, error: serviceCountError } = await supabase
      .from("services")
      .select("id")
      .eq("category_id", category_id);

    if (serviceCountError) {
      throw serviceCountError;
    }

    const newId = serviceCount.length + 1;

    const { data: serviceData, error: serviceError } = await supabase
      .from("services")
      .insert([
        {
          service_name: servicename,
          category_id,
          id: newId,
        },
      ])
      .select("*");

    if (serviceError) {
      throw serviceError;
    }

    const serviceId = serviceData[0].service_id;

    const subServiceData = sub_services.map((sub_service) => ({
      service_id: serviceId,
      service_lists: sub_service.name,
      price: sub_service.price,
      quantity: sub_service.quantity || 1,
      units: sub_service.unit,
    }));

    const { error: subServiceError } = await supabase
      .from("service_list")
      .insert(subServiceData);

    if (subServiceError) {
      throw subServiceError;
    }

    res.status(200).json({ message: "อัพโหลดข้อมูลสำเร็จ" });
  } catch (error) {
    console.error("Error uploading data", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัพโหลดข้อมูล" });
  }
});

export default adminserviceRouter;
