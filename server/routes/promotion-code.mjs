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

      if (error || !data) {
        return res.status(400).send("Invalid promotion code");
      }

      // Check if the promotion code is active
      if (!data.is_active) {
        return res.status(400).send("Promotion code is no longer available");
      }

      // Calculate the new net price
      let newNetPrice = netPrice;
      if (data.baht_discount) {
        newNetPrice -= data.baht_discount;
      } else if (data.percent_discount) {
        newNetPrice -= (netPrice * data.percent_discount) / 100;
      }

      if (newNetPrice < 0) {
        newNetPrice = 0; // Ensure the net price doesn't go below zero
      }

      newNetPrice = newNetPrice.toFixed(2);

      res.status(200).json({
        message: "Promotion code applied successfully",
        newNetPrice,
      });
    } catch (error) {
      console.error("Error applying promotion code:", error);
      res.status(500).send("Server error");
    }
  }
);

export default promotionsRouter;
