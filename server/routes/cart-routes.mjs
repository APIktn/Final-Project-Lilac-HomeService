import { Router } from "express";
import supabase from "../utils/db.mjs";

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
    netPrice += item.price * item.count;
  });

  console.log("Calculated net price:", netPrice);
  res.json({ netPrice });
});

export default cartsRouter;
