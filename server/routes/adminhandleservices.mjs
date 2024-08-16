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
  const serviceName = req.params.service_name; 
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



adminserviceRouter.delete("/:service_list_id", async (req, res) => {
  const { service_list_id } = req.params;

  try {
    const { data, error } = await supabase
      .from("service_list")
      .delete()
      .eq("service_list_id", service_list_id);

    if (error) throw error;

    if (data && data.length === 0) {
      return res.status(404).json({
        message: `${service_list_id} not found`,
      });
    }

    res.status(200).json({
      message: `${service_list_id} deleted successfully`,
      data,
    });
  } catch (error) {
    console.error("Error deleting:", error);
    res.status(500).json({
      message: "Error deleting ",
      error: error.message,
    });
  }
});

adminserviceRouter.put(
  "/update/:service_name",
  upload.single("image"),
  async (req, res) => {
    const oldServiceName = req.params.service_name;

    try {
      const {
        service_name: newServiceName,
        category_name,
        subServiceItems,
      } = req.body;

      if (!newServiceName || !category_name || !subServiceItems) {
        return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบถ้วน" });
      }

      const validSubServiceItems = subServiceItems.filter(
        (item) =>
          item.name &&
          item.unit &&
          item.name !== "undefined" &&
          item.unit !== "undefined"
      );

      if (validSubServiceItems.length === 0) {
        return res
          .status(400)
          .json({ error: "กรุณากรอกข้อมูลที่ถูกต้องในรายการย่อย" });
      }

      const { data: category, error: categoryError } = await supabase
        .from("categories")
        .select("category_id")
        .eq("category_name", category_name)
        .single();

      if (categoryError || !category) {
        throw new Error(
          "Error occurred while fetching category: " +
            (categoryError ? categoryError.message : "Category not found")
        );
      }

      const category_id = category.category_id;

      const file = req.file;
      let imageUrl = req.body.image;

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

      const { data: existingService, error: serviceFetchError } = await supabase
        .from("services")
        .select("*")
        .eq("service_name", oldServiceName)
        .single();

      if (serviceFetchError || !existingService) {
        return res.status(404).json({ error: "Service not found" });
      }

      const { service_id } = existingService; 

      const { error: serviceError } = await supabase
        .from("services")
        .update({ service_name: newServiceName, category_id, image: imageUrl })
        .eq("service_id", service_id);

      if (serviceError) {
        throw serviceError;
      }

      const { data: existingSubServices, error: fetchSubServiceError } =
        await supabase
          .from("service_list")
          .select("service_list_id, service_lists, price, units")
          .eq("service_id", service_id);

      if (fetchSubServiceError) {
        throw fetchSubServiceError;
      }

      for (const item of validSubServiceItems) {
        const existingItem = existingSubServices.find(
          (subItem) => subItem.service_lists === item.name
        );

        if (existingItem) {
          await supabase
            .from("service_list")
            .update({
              price: item.price ? parseFloat(item.price) : 0,
              units: item.unit,
            })
            .eq("service_id", service_id)
            .eq("service_list_id", existingItem.service_list_id);
        } else {
          await supabase.from("service_list").insert({
            service_id: service_id,
            service_lists: item.name,
            price: item.price ? parseFloat(item.price) : 0,
            units: item.unit,
            quantity: 0,
          });
        }
      }

      const subServiceNames = validSubServiceItems.map((item) => item.name);
      const subServicesToDelete = existingSubServices.filter(
        (subItem) => !subServiceNames.includes(subItem.service_lists)
      );

      for (const subItem of subServicesToDelete) {
        await supabase
          .from("service_list")
          .delete()
          .eq("service_list_id", subItem.service_list_id);
      }

      res.status(200).json({ message: "อัพเดตข้อมูลสำเร็จ" });
    } catch (error) {
      console.error("Error updating data", error);
      res
        .status(500)
        .json({ error: "เกิดข้อผิดพลาดในการอัพเดตข้อมูล: " + error.message });
    }
  }
);

export default adminserviceRouter;