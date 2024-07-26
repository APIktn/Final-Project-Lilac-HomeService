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

adminserviceslistRouter.delete("/:service_id", async (req, res) => {
  const { service_id } = req.params;

  try {
    // Step 1: Get the position_id of the service to be deleted
    const { data: serviceData, error: serviceError } = await supabase
      .from("services")
      .select("service_id, position_id")
      .eq("service_id", service_id)
      .single();

    if (serviceError) throw serviceError;
    if (!serviceData) {
      return res.status(404).json({
        message: `Service with service_id ${service_id} not found`,
      });
    }

    const { position_id } = serviceData;

    // Step 2: Delete the specified service
    const { error: deleteError } = await supabase
      .from("services")
      .delete()
      .eq("service_id", service_id);

    if (deleteError) throw deleteError;

    // Step 3: Get all services with position_id greater than the deleted one
    const { data: remainingServices, error: remainingServicesError } = await supabase
      .from("services")
      .select("*")
      .gt("position_id", position_id);

    if (remainingServicesError) throw remainingServicesError;

    // Step 4: Update the position_id of the remaining services
    const updates = remainingServices.map((service) => {
      const newPositionId = service.position_id - 1;
      return supabase
        .from("services")
        .update({ position_id: newPositionId })
        .eq("service_id", service.service_id);
    });

    await Promise.all(updates);

    res.status(200).json({
      message: `Service with service_id ${service_id} deleted successfully and remaining services reordered`,
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({
      message: "Error deleting service",
      error: error.message,
    });
  }
});


export default adminserviceslistRouter;