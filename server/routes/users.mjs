import { Router } from "express";
import supabase from "../utils/db.mjs";
import { authenticateToken } from "../middlewares/authVerify.mjs";

const userRouter = Router();

userRouter.get("/profile", authenticateToken, async (req, res) => {
  try {
    const { user_id } = req.user;

    const { data: user, error } = await supabase
      .from("users")
      .select("user_id, firstname, lastname, email, tel_num, profile_image")
      .eq("user_id", user_id)
      .single();

    console.log(user);

    if (error || !user) {
      return res.status(404).json({ error: "ไม่พบข้อมูลผู้ใช้งาน" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน" });
  }
});

export default userRouter;
