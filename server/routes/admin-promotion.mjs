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

// Fetch a single promotion code by ID
promotionRouter.get("/:promo_id", async (req, res) => {
  const promoId = req.params.promo_id;

  try {
    const { data, error } = await supabase
      .from("promotioncodes")
      .select("*")
      .eq("promo_id", promoId)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        message: `Promotion code with promo_id ${promo_id} not found`,
      });
    }

    res.status(200).json({
      message: "Promotion code retrieved successfully",
      data,
    });
  } catch (error) {
    console.error("Error retrieving promotion code:", error.message);
    res.status(500).json({
      message: "Error retrieving promotion code",
      error: error.message,
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

  console.log(req.body)
  if (baht_discount === null && !percent_discount) {
    return res.status(400).json({
      message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
    });
  }

  if (
    percent_discount !== null &&
    (percent_discount < 1 || percent_discount > 100)
  ) {
    return res.status(400).json({
      message: "Percent discount must be between 1 and 100, or null",
    });
  }

  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
  });
  const expirationTime = new Date(expired_date).toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
  });

  if (new Date(expired_date) < new Date()) {
    return res.status(400).json({
      message: "Expired date cannot be set in the past",
    });
  }

  try {
    const { data: existingCode, error: codeError } = await supabase
      .from("promotioncodes")
      .select("promo_id")
      .eq("code", code);

    if (codeError) throw codeError;

    if (existingCode.length > 0) {
      return res.status(400).json({
        message: "มีหมวดหมู่นี้แล้วกรุณากรอกชื่ออื่น",
      });
    }

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

// Update (patch) promotion code
promotionRouter.patch("/edit/:promo_id", async (req, res) => {
  const { promo_id } = req.params;
  const {
    code,
    baht_discount,
    percent_discount,
    total_code,
    updated_at,
    created_at,
    expired_date,
  } = req.body;

  console.log(req.body)
  if (baht_discount ===null && !percent_discount) {
    return res.status(400).json({
      message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
    });
  }

  // Validate percent_discount is between 1 and 100 or null
  if (
    percent_discount !== null &&
    (percent_discount < 1 || percent_discount > 100)
  ) {
    return res.status(400).json({
      message: "Percent discount must be between 1 and 100, or null",
    });
  }

  // Ensure expired_date is not set to a time in the past
  const currentTime = new Date().toLocaleString();
  const expirationTime = new Date(expired_date).toLocaleString();

  if (new Date(expirationTime) < new Date(currentTime)) {
    return res.status(400).json({
      message: "Expired date cannot be set in the past",
    });
  }

  try {
    // Update the promotion code
    const { data, error } = await supabase
      .from("promotioncodes")
      .update({
        code,
        baht_discount,
        percent_discount,
        total_code,
        created_at,
        expired_date,
        updated_at, // Set updated_at to the current time
      })
      .eq("promo_id", promo_id);

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: `Promotion code with promo_id ${promo_id} not found`,
      });
    }

    res.status(200).json({
      message: `Promotion code with promo_id ${promo_id} updated successfully`,
      data,
    });
  } catch (error) {
    console.error("Error updating promotion code:", error.message);
    res.status(500).json({
      message: "Error updating promotion code",
      error: error.message,
    });
  }
});

export default promotionRouter;