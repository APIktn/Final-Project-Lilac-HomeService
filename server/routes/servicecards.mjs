import { Router } from "express";
import supabase from "../utils/db.mjs";

const servicesRouter = Router();

//-------Get Top Services------//
servicesRouter.get("/top3services", async (req, res) => {
  try {
    // Extract query parameters for filtering
    const { lowerprice, higherprice, top } = req.query;

    // Initialize the base query to get top services based on quantity
    let baseQuery = supabase
      .from('service_list')
      .select('service_id, quantity')
      .order('quantity', { ascending: false });

    // Apply filters based on the provided price range
    if (top) {
      baseQuery = baseQuery.gte('quantity', parseFloat(top));
    }
    if (lowerprice) {
      baseQuery = baseQuery.gte('price', parseFloat(lowerprice));
    }
    if (higherprice) {
      baseQuery = baseQuery.lte('price', parseFloat(higherprice));
    }

    // Execute the base query to get service IDs
    const { data: baseData, error: baseError } = await baseQuery;
    if (baseError) {
      console.error("Base query error:", baseError.message);
      throw baseError; // This is not causing "Assignment to constant variable" error
    }

    if (baseData.length === 0) {
      return res.status(200).json({
        message: "No services found matching the criteria.",
        data: [],
        totalQuantity: 0,
      });
    }

    // Extract service IDs
    const serviceIds = baseData.map(item => item.service_id);

    // Initialize the query to get detailed service data based on service IDs
    let detailedQuery = supabase
      .from('services')
      .select(`
        service_id,
        image, 
        service_name,       
        category_id, 
        service_list (
          price,
          quantity
        ), 
        categories (
          category_name
        )
      `)
      .in('service_id', serviceIds);

    // Execute the detailed query
    let { data: detailedData, error: detailedError } = await detailedQuery; // Note the use of 'let' instead of 'const' here
    if (detailedError) {
      console.error("Detailed query error:", detailedError.message);
      throw detailedError;
    }

    // Calculate the total quantity for all services and sort by total_quantity
    if (detailedData) {
      detailedData.forEach(service => {
        if (Array.isArray(service.service_list)) {
          service.total_quantity = service.service_list.reduce((sum, item) => sum + item.quantity, 0);
        } else {
          service.total_quantity = 0;
        }
      });

      // Sort by total_quantity descending
      detailedData.sort((a, b) => b.total_quantity - a.total_quantity);

      // Limit to top 3 services by total_quantity
      detailedData = detailedData.slice(0, 3); // Reassigning 'detailedData' is causing the error

      // Calculate totalQuantity for the top 3 services
      let totalQuantity = detailedData.reduce((sum, service) => sum + service.total_quantity, 0);

      return res.status(200).json({
        message: "Successfully retrieved the list of top services.",
        data: detailedData,
        totalQuantity: totalQuantity,
      });
    } else {
      return res.status(200).json({
        message: "No services found matching the criteria.",
        data: [],
        totalQuantity: 0,
      });
    }
  } catch (error) {
    console.error("Error fetching services:", error.message);

    return res.status(500).json({
      message: "Server could not retrieve services due to a database error.",
    });
  }
});
//-------Get All------//
servicesRouter.get("/serviceslist", async (req, res) => {
  try {
    const { lowerprice, higherprice, top } = req.query;   
    let baseQuery = supabase
      .from('services')
      .select(`
        service_id,
        image,
        service_name,
        service_list (price),
        categories (
          category_name
        )
      `)
      .order('service_id', { ascending: true }); 
   
    if (lowerprice) {
      baseQuery = baseQuery.gt('service_list:price', parseFloat(lowerprice));
    }
    if (higherprice) {
      baseQuery = baseQuery.lt('service_list:price', parseFloat(higherprice));
    }
   
    const { data, error } = await baseQuery;
    if (error) {
      throw error;
    }
    
    data.forEach(service => {
      service.service_list.sort((a, b) => a.price - b.price);
    });

    
    return res.status(200).json({
      message: "Successfully retrieved and sorted the list of top services.",
      data: data
    });

  } catch (error) {
    console.error("Error retrieving services:", error.message);
    return res.status(500).json({
      message: "Server could not retrieve services due to a database error."
    });
  }
});
export default servicesRouter;
