import { Router } from "express";
import supabase from "../utils/db.mjs";

const adminserviceslistRouter = Router();

// Route to get services grouped by categories
adminserviceslistRouter.get("/", async (req, res) => {
  try {
    const { data: services, error: servicesError } = await supabase
      .from("services")
      .select("*, categories(*), service_list(*)")
      .order("category_id", { ascending: true });

    if (servicesError) {
      throw servicesError;
    }

    // Group data by category_id for better structure
    const groupedData = services.reduce((acc, service) => {
      const categoryId = service.category_id;
      if (!acc[categoryId]) {
        acc[categoryId] = {
          category: service.categories,
          services: [],
        };
      }
      acc[categoryId].services.push(service);
      return acc;
    }, {});

    return res.status(200).json({
      message: "Successfully retrieved and formatted the list of services.",
      data: groupedData,
    });
  } catch (error) {
    console.error("Error retrieving services:", error.message);
    return res.status(500).json({
      message: "Server could not retrieve services due to a database error.",
    });
  }
});

// New route for updating service order
adminserviceslistRouter.post("/reorder", async (req, res) => {
  const { categoryId, servicesOrder } = req.body;

  try {
    // Ensure the order array is sorted by position_id1
    const updatedServices = servicesOrder.map((service, index) => ({
      service_id: service.service_id,
      position_id1: index + 1,
    }));

    // Update the position_id1 for each service in the given category
    const { error } = await supabase
      .from("services")
      .upsert(updatedServices, { onConflict: ["service_id"] });

    if (error) {
      throw error;
    }

    return res.status(200).json({
      message: "Services reordered successfully.",
    });
  } catch (error) {
    console.error("Error updating service order:", error.message);
    return res.status(500).json({
      message: "Server could not update the service order.",
    });
  }
});

export default adminserviceslistRouter;
