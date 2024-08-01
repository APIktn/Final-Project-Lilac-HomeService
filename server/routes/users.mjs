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

const userRouter = Router();

userRouter.get("/profile", authenticateToken, async (req, res) => {
  try {
    const { user_id } = req.user;

    const { data: user, error } = await supabase
      .from("users")
      .select(
        "user_id, firstname, lastname, email, tel_num, profile_image, upload_image, select_image, ad_detail, ad_subdistrict, ad_district, ad_province, ad_moredetail"
      )
      .eq("user_id", user_id)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: "ไม่พบข้อมูลผู้ใช้งาน" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error in GET /profile:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน" });
  }
});

userRouter.post(
  "/upload-profile-image",
  authenticateToken,
  upload.single("profile_image"),
  async (req, res) => {
    try {
      const { user_id } = req.user;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: "ไม่มีไฟล์ที่อัปโหลด" });
      }

      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profile_images" },
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

      const { secure_url } = uploadResult;

      const { data, error } = await supabase
        .from("users")
        .update({ upload_image: secure_url })
        .eq("user_id", user_id);

      if (error) {
        console.error("เกิดข้อผิดพลาดในการอัปเดตรูปโปรไฟล์ผู้ใช้งาน:", error);
        return res.status(500).json({ error: "อัปเดตรูปโปรไฟล์ล้มเหลว" });
      }

      res.json({
        message: "อัปโหลดรูปโปรไฟล์สำเร็จ",
        imageUrl: secure_url,
      });
    } catch (error) {
      console.error("Error in /upload-profile-image:", error);
      res.status(500).json({ error: "เกิดข้อผิดพลาด" });
    }
  }
);

userRouter.put(
  "/profile",
  authenticateToken,
  validateUpdateProfile,
  async (req, res) => {
    try {
      const { user_id } = req.user;
      const { firstname, lastname, email, tel_num, select_image } = req.body;

      const { data: user, error } = await supabase
        .from("users")
        .select("firstname, lastname")
        .eq("user_id", user_id)
        .single();

      if (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน:", error);
        return res.status(400).json({ error: "ดึงข้อมูลผู้ใช้งานล้มเหลว" });
      }

      let profileImage = user.profile_image;
      if (firstname !== user.firstname || lastname !== user.lastname) {
        profileImage = generateAvatarUrl(firstname, lastname);
      }

      const updateData = {
        firstname,
        lastname,
        email,
        tel_num,
        profile_image: profileImage,
        select_image,
      };

      const { data, error: updateError } = await supabase
        .from("users")
        .update(updateData)
        .eq("user_id", user_id);

      if (updateError) {
        console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้งาน:", updateError);
        return res.status(400).json({ error: "อัปเดตข้อมูลผู้ใช้งานล้มเหลว" });
      }

      console.log("User updated successfully:", data);
      res.json({ message: "อัปเดตข้อมูลผู้ใช้สำเร็จ", data });
    } catch (error) {
      console.error("Error in PUT /profile:", error);
      res
        .status(500)
        .json({ error: "เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้งาน" });
    }
  }
);

userRouter.put(
  "/change-password",
  authenticateToken,
  validateUpdatePassword,
  async (req, res) => {
    const { user_id } = req.user;
    const { currentPassword, newPassword } = req.body;

    try {
      const { data: user, error } = await supabase
        .from("users")
        .select("password")
        .eq("user_id", user_id)
        .single();

      if (error || !user) {
        return res.status(404).json({ error: "ไม่พบผู้ใช้งานในระบบ" });
      }

      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(400).json({ error: "รหัสผ่านปัจจุบันไม่ถูกต้อง" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const { data, error: updateError } = await supabase
        .from("users")
        .update({ password: hashedPassword })
        .eq("user_id", user_id);

      if (updateError) {
        console.error("เกิดข้อผิดพลาดในการอัปเดตรหัสผ่าน:", updateError);
        return res.status(400).json({ error: "อัปเดตรหัสผ่านล้มเหลว" });
      }

      res.json({ message: "เปลี่ยนรหัสผ่านสำเร็จ" });
    } catch (error) {
      console.error("Error in PUT /change-password:", error);
      res.status(500).json({ error: "เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน" });
    }
  }
);

export default userRouter;
