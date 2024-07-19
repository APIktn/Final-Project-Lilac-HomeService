import { Router } from "express";
import supabase from "../utils/db.mjs";

const promotionRouter = Router();

promotionRouter.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("promotioncodes").select("*");

    if (error) {
      throw error;
    }

    const formattedData = data.map((discount) => {
      if (discount.baht_discount !== null) {
        discount.baht_discount = discount.baht_discount.toFixed(2);
      }
      if (discount.percent_discount !== null) {
        discount.percent_discount = discount.percent_discount.toFixed(2);
      }
      return discount;
    });

    return res.status(200).json({
      message:
        "Successfully retrieved and formatted the list of promotion codes.",
      data: formattedData,
    });
  } catch (error) {
    console.error("Error retrieving promotion codes:", error.message);
    return res.status(500).json({
      message:
        "Server could not retrieve promotion codes due to a database error.",
    });
  }
});

//post promotion
promotionRouter.post("/", async (req, res) => {
  const {
    code,
    baht_discount,
    percent_discount,
    total_code,
    created_at,
    expired_date,
  } = req.body;

  // Validate percent_discount is between 1 and 100 or null
  if (
    percent_discount !== null &&
    (percent_discount < 1 || percent_discount > 100)
  ) {
    return res.status(400).json({
      message: "Percent discount must be between 1 and 100, or null",
    });
  }

  try {
    const { data, error } = await supabase.from("promotioncodes").insert([
      {
        code,
        baht_discount,
        percent_discount,
        total_code,
        created_at,
        expired_date,
      },
    ]);

    if (error) throw error;

    res
      .status(201)
      .json({ message: "Promotion code created successfully", data });
  } catch (error) {
    console.error("Error inserting promotion code:", error);
    res.status(500).json({ message: "Error inserting promotion code", error });
  }
});

// delete promotion
promotionRouter.delete("/:promo_id", async (req, res) => {
  const { promo_id } = req.params;

  try {
    const { data, error } = await supabase
      .from("promotioncodes")
      .delete()
      .eq("promo_id", promo_id);

    if (error) throw error;

    if (data && data.length === 0) {
      return res.status(404).json({
        message: `Promotion code with promo_id ${promo_id} not found`,
      });
    }

    res.status(200).json({
      message: `Promotion code with promo_id ${promo_id} deleted successfully`,
      data,
    });
  } catch (error) {
    console.error("Error deleting promotion code:", error);
    res.status(500).json({
      message: "Error deleting promotion code",
      error: error.message,
    });
  }
});

export default promotionRouter;
