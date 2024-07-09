import { Router } from "express";
import supabase from "../utils/db.mjs";

const servicesRouter = Router();

//-------Get Top Services------//
// servicesRouter.get("/", async (req, res) => {
//   try {
//     // Fetch questions from Supabase
//     const { data } = await supabase.from("service").select("*");

//     return res.status(200).json({
//       message: "Successfully retrieved the list of services.",
//       data: data,
//     });
//   } catch (error) {
//     //console.error("Error fetching questions:", error.message);
//     return res.status(500).json({
//       message: "Server could not retrieve services due to a database error.",
//     });
//   }
// });

//-------Get All------//
servicesRouter.get("/serviceslist", async (req, res) => {
  try {
    // Fetch questions from Supabase
    const { data } = await supabase.from("service").select("*");

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
export default servicesRouter;
