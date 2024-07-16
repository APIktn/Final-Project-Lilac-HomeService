import { Router } from "express";
import supabase from "../utils/db.mjs";
import { authenticateToken } from "../middlewares/authVerify.mjs";
import { generateAvatarUrl } from "../utils/avatarGenerator.mjs";
import { validateUpdateProfile } from "../middlewares/validators.mjs";

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

userRouter.put(
  "/profile",
  authenticateToken,
  validateUpdateProfile,
  async (req, res) => {
    try {
      const { user_id } = req.user;
      const {
        firstname,
        lastname,
        email,
        tel_num,
        select_image,
        ad_detail,
        ad_subdistrict,
        ad_district,
        ad_province,
        ad_moredetail,
      } = req.body;

      const { data: user, error } = await supabase
        .from("users")
        .select("firstname, lastname")
        .eq("user_id", user_id)
        .single();

      if (error) {
        console.error("Error fetching user:", error);
        return res
          .status(400)
          .json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน" });
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
        ad_detail,
        ad_subdistrict,
        ad_district,
        ad_province,
        ad_moredetail,
      };

      const { data, error: updateError } = await supabase
        .from("users")
        .update(updateData)
        .eq("user_id", user_id);

      if (updateError) {
        console.error("Error updating user:", updateError);
        return res
          .status(400)
          .json({ error: "เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้งาน" });
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

export default userRouter;
