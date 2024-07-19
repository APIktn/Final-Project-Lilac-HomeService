import { Router } from "express";
import supabase from "../utils/db.mjs";

const adminserviceslistRouter = Router();

adminserviceslistRouter.get("/", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select('*,categories(*)')
        .order('category_id', { ascending: true });
  
      if (error) {
        throw error;
      }
  
      // Group data by category_id
      // const groupedData = data.reduce((acc, service) => {
      //   const categoryId = service.category_id;
      //   if (!acc[categoryId]) {
      //     acc[categoryId] = [];
      //   }
      //   acc[categoryId].push(service);
      //   return acc;
      // }, {});
  
      return res.status(200).json({
        message: "Successfully retrieved and formatted the list of services.",
        data: data
      });
    } catch (error) {
      console.error("Error retrieving services:", error.message);
      return res.status(500).json({
        message: "Server could not retrieve services due to a database error.",
      });
    }
  });
  
  export default adminserviceslistRouter;