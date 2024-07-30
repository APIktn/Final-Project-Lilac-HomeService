import { Router } from "express";
import supabase from "../utils/db.mjs";
import { authenticateToken } from "../middlewares/authVerify.mjs";

const promotionsRouter = Router();

promotionsRouter.post(
  "/apply-promo-code",
  authenticateToken,
  async (req, res) => {
    const { promoCode, netPrice } = req.body;

    if (!promoCode) {
      return res.status(400).send("Promotion code is required");
    }

    try {
      // Check if the promo code is valid
      const { data, error } = await supabase
        .from("promotioncodes")
        .select("*")
        .eq("code", promoCode)
        .single();

      if (error) {
        return res.status(400).send("Invalid promotion code");
      }

      if (!data) {
        return res.status(400).send("Promotion code not found");
      }

      res.status(200).json({
        message: "Promotion code applied successfully",
        discount: data.discount,
      });
    } catch (error) {
      console.error("Error applying promotion code:", error);
      res.status(500).send("Server error");
    }
  }
);

export default promotionsRouter;
