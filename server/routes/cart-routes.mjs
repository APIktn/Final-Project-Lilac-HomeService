import { Router } from "express";
import supabase from "../utils/db.mjs";
import { authenticateToken } from "../middlewares/authVerify.mjs";
import { v4 as uuidv4 } from "uuid";

const cartsRouter = Router();

//---------Get CART ID------////
cartsRouter.get("/:service_name", async (req, res) => {
  const cartIDFromClient = req.params.service_name;

  let result;
  try {
    result = await supabase
      .from("services") // Replace 'carts' with the actual table name
      .select("*,service_list(*)")
      .eq("service_name", cartIDFromClient);
  } catch {
    return res.status(500).json({
      message:
        "Server could not read cart because of a database connection error",
    });
  }

  if (!result.data || result.data.length === 0) {
    return res.status(404).json({
      "Not Found": "Cart not found",
    });
  }

  return res.status(200).json({
    OK: "Successfully retrieved the cart.",
    data: result.data,
  });
});

//---------Calculate Net Price------////
cartsRouter.post("/:service_name", (req, res) => {
  const { summaryData } = req.body;
  let netPrice = 0;

  summaryData.forEach((item) => {
    netPrice += parseFloat(item.price) * item.count;
  });

  netPrice = netPrice.toFixed(2);

  console.log("Calculated net price:", netPrice);
  res.json({ netPrice });
});

//---------Store Bill Info------////
cartsRouter.post("/:service_name/bill", authenticateToken, async (req, res) => {
  try {
    const { user_id } = req.user;

    const billInfo = req.body;

    let {
      serviceId,
      order,
      date,
      times,
      detail,
      subdistrict,
      district,
      province,
      discountPrice,
      moredetail,
      promoCode,
    } = billInfo;

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert([{ user_id }])
      .select();

    if (orderError) {
      console.error("Error inserting order:", orderError);
      return res
        .status(500)
        .json({ message: "Error inserting order", error: orderError.message });
    }

    if (!orderData || orderData.length === 0) {
      console.error("No data returned from order insertion");
      throw new Error("No data returned from order insertion");
    }

    console.log("Order inserted:", orderData);

    const order_id = orderData[0].order_id;

    if (!promoCode) {
      promoCode = null;
    }

    discountPrice = Number(discountPrice);
    const order_code = `HS${user_id + order_id + uuidv4().slice(0, 2)}`;
    // const order_code = `HS${uuidv4().slice(0, 4)}`;

    const orderDetails = order.serviceInfo.map((item) => ({
      order_id,
      service_id: serviceId,
      service_lists: item.service_name,
      quantity_per_order: item.service_amount,
      order_date: date,
      time: times,
      ad_detail: detail,
      ad_subdistrict: subdistrict,
      ad_district: district,
      ad_province: province,
      ad_moredetail: moredetail,
      total_amount: discountPrice,
      order_code,
      promotion_code: promoCode,
    }));

    const { data: orderDetailData, error: orderDetailError } = await supabase
      .from("orderdetails")
      .insert(orderDetails);

    if (orderDetailError) {
      console.error("Error inserting order details:", orderDetailError);
      return res.status(500).json({
        message: "Error inserting order details",
        error: orderDetailError.message,
      });
    }

    console.log("Order details inserted:", orderDetailData);

    if (promoCode) {
      // Fetch current total_code
      const { data: promoData, error: promoFetchError } = await supabase
        .from("promotioncodes")
        .select("count")
        .eq("code", promoCode)
        .single();

      if (promoFetchError) {
        console.error("Error fetching promotion code:", promoFetchError);
        return res.status(500).json({
          message: "Error fetching promotion code",
          error: promoFetchError.message,
        });
      }

      const newTotalCode = promoData.count + 1;

      // Update total_code
      const { data: promoUpdateData, error: promoUpdateError } = await supabase
        .from("promotioncodes")
        .update({ count: newTotalCode })
        .eq("code", promoCode);

      if (promoUpdateError) {
        console.error("Error updating promotion code:", promoUpdateError);
        return res.status(500).json({
          message: "Error updating promotion code",
          error: promoUpdateError.message,
        });
      }

      console.log("Promotion code updated:", promoUpdateData);
    }

    res.status(200).json({
      message: "Bill info received and stored successfully",
      order_id,
    });
  } catch (error) {
    console.error("Error inserting order details:", error);
    res
      .status(500)
      .json({ message: "Server error, could not store bill info" });
  }

  //------Fetch Bill Info -----////
  cartsRouter.get("/bill/:order_id", authenticateToken, async (req, res) => {
    const { order_id } = req.params;

    try {
      const { data: orderDetails, error } = await supabase
        .from("orderdetails")
        .select("*")
        .eq("order_id", order_id);

      if (error) {
        throw error;
      }

      if (!orderDetails) {
        return res.status(404).json({ message: "Order details not found" });
      }

      res.status(200).json(orderDetails);
    } catch (error) {
      console.error("Error fetching order details:", error);
      res
        .status(500)
        .json({ message: "Server error, could not fetch order details" });
    }
  });
});

export default cartsRouter;
