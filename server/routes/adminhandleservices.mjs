import { Router } from "express";
import supabase from "../utils/db.mjs";
import upload from "../middlewares/upload.mjs";
import cloudinary from "../utils/cloudinary.mjs";

const adminserviceRouter = Router();

adminserviceRouter.post("/post", upload.single("image"), async (req, res) => {
  try {
    const { service_name, category_name, subServiceItems } = req.body;

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

    const { data: lastService, error: lastServiceError } = await supabase
      .from("services")
      .select("position_id")
      .eq("category_id", category_id)
      .order("position_id", { ascending: false })
      .limit(1)
      .single();

    if (lastServiceError && lastServiceError.code !== "PGRST116") {
      throw lastServiceError;
    }

    const position_id = lastService ? lastService.position_id + 1 : 1;

    const file = req.file;
    let imageUrl = null;

    if (file) {
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

      imageUrl = uploadResult.secure_url;
    }

    const { data: serviceData, error: serviceError } = await supabase
      .from("services")
      .insert([{ service_name, category_id, position_id, image: imageUrl }])
      .select("service_id")
      .single();

    if (serviceError) {
      throw serviceError;
    }

    const service_id = serviceData.service_id;

    const subServiceInserts = subServiceItems.map((item) => ({
      service_id,
      service_lists: item.name,
      price: item.price ? parseFloat(item.price) : 0,
      units: item.unit,
      quantity: 0,
    }));

    const { error: subServiceError } = await supabase
      .from("service_list")
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

adminserviceRouter.get("/:service_name", async (req, res) => {
  const serviceName = req.params.service_name; // Fixing this line
  let result;
  try {
    result = await supabase
      .from("services")
      .select('*,service_list(*),categories(*)')
      .eq("service_name", serviceName)
      
  } catch {
    return res.status(500).json({
      message: "Error fetching category",
    });
  }

  if (!result.data || result.data.length === 0) {
    return res.status(404).json({
      "Not Found": "Not Found",
    });
  }

  return res.status(200).json({
    OK: "Successfully .",
    data: result.data,
  });
});


export default adminserviceRouter;
