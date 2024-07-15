import { Router } from "express";
import supabase from "../utils/db.mjs";

const serviceDetailRouter = Router();

//-------Get All------//
serviceDetailRouter.get("/servicedetail", async (req, res) => {
  try {
    // Fetch questions from Supabase
    const { data } = await supabase.from("service_detail").select("*").limit(4);

    return res.status(200).json({
      message: "Successfully retrieved the list of services.",
      data: data,
    });
  } catch (error) {
    //console.error("Error fetching questions:", error.message);
    return res.status(500).json({
      message: "Server could not retrieve services due to a database error.",
    });
  }
});
export default serviceDetailRouter;
