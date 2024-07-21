import { Router } from "express";
import supabase from "../utils/db.mjs";

const adminserviceslistRouter = Router();

// Route to get services grouped by categories
adminserviceslistRouter.get("/", async (req, res) => {
  try {
    const { data: services, error: servicesError } = await supabase
      .from("services")
      .select("*, categories(*), service_list(*)")
      .order("category_id", { ascending: true })
      .order("position_id", { ascending: true });

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

adminserviceslistRouter.patch("/reorder", async (req, res) => {
  const { services: reorderedServices } = req.body;

  try {
    // Update positions
    for (const service of reorderedServices) {
      const { error: updateError } = await supabase
        .from("services")
        .update({
          position_id: service.position_id,
        })
        .eq("service_id", service.service_id);

      if (updateError) {
        throw updateError;
      }
    }

    res.status(200).json({ message: "Services reordered successfully" });
  } catch (error) {
    console.error("Error reordering services:", error);
    res.status(500).json({ message: "Error reordering services", error });
  }
});

export default adminserviceslistRouter;
