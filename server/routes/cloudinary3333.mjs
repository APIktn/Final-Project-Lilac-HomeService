import { Router } from "express";
import supabase from "../utils/db.mjs";
import multer from "multer";
import { cloudinaryUpload } from "../utils/cloudinary.mjs";

const upload = multer({ dest: "uploads/" });

const cloudRouter = Router();
const avatarUpload = upload.single("image");

cloudRouter.post("/create", avatarUpload, async (req, res) => {
  const { service_name, category_name, service_list, price, units } = req.body;

  try {
    const uploadedFiles = await cloudinaryUpload([req.file]);

    const { data, error } = await supabase.from("service").insert([
      {
        service_name,
        category_name,
        image: uploadedFiles[0].url,
        service_list,
        price,
        units,
      },
    ]);

    if (error) throw error;

    res.status(201).json({ message: "Service created successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error creating service: " + error.message });
  }
});

export default cloudRouter;
