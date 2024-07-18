import { Router } from "express";
import supabase from "../utils/db.mjs";

const categoriesRouter = Router();

categoriesRouter.get("/", async (req, res) => {
    try {
      const { data ,error} = await supabase.from("categories").select("*")
      .order('position_id', { ascending: true });
  
      if (error) {
        throw error;
      }
         
      return res.status(200).json({
        message:
          "Successfully retrieved and formatted the list of promotion codes.",
        data: data
      });
    } catch (error) {
      console.error("Error retrieving promotion codes:", error.message);
      return res.status(500).json({
        message:
          "Server could not retrieve promotion codes due to a database error.",
      });
    }
  });

  // categoriesRouter.delete("/:category_id", async (req, res) => {
  //   const { category_id } = req.params;
  
  //   try {
  //     const { data, error } = await supabase
  //       .from("categories")
  //       .delete()
  //       .eq("category_id", category_id);
  
  //     if (error) throw error;
  
  //     if (data && data.length === 0) {
  //       return res.status(404).json({
  //         message: `Promotion code with promo_id ${category_id} not found`,
  //       });
  //     }
  
  //     res.status(200).json({
  //       message: `Promotion code with promo_id ${category_id} deleted successfully`,
  //       data,
  //     });
  //   } catch (error) {
  //     console.error("Error deleting promotion code:", error);
  //     res.status(500).json({
  //       message: "Error deleting promotion code",
  //       error: error.message,
  //     });
  //   }
  // });

  // categoriesRouter.delete("/:category_id", async (req, res) => {
  //   const { category_id } = req.params;
  
  //   try {
  //     // Delete service lists associated with services in the category
  //     const { error: deleteServiceListsError } = await supabase
  //       .from("service_list2")
  //       .delete()
  //       .in(
  //         "service_id",
  //         supabase
  //           .from("services")
  //           .select("service_id")
  //           .eq("category_id", category_id)
  //       );
  
  //     if (deleteServiceListsError) throw deleteServiceListsError;
  
  //     // Delete services associated with the category
  //     const { error: deleteServicesError } = await supabase
  //       .from("services")
  //       .delete()
  //       .eq("category_id", category_id);
  
  //     if (deleteServicesError) throw deleteServicesError;
  
  //     // Delete the category
  //     const { data, error } = await supabase
  //       .from("categories")
  //       .delete()
  //       .eq("category_id", category_id);
  
  //     if (error) throw error;
  
  //     if (data && data.length === 0) {
  //       return res.status(404).json({
  //         message: `Category with category_id ${category_id} not found`,
  //       });
  //     }
  
  //     res.status(200).json({
  //       message:` Category with category_id ${category_id} deleted successfully`,
  //       data,
  //     });
  //   } catch (error) {
  //     console.error("Error deleting category:", error);
  //     res.status(500).json({
  //       message: "Error deleting category",
  //       error: error.message,
  //     });
  //   }
  // });

  categoriesRouter.delete("/:category_id", async (req, res) => {
    const { category_id } = req.params;
  
    try {
      const { data, error } = await supabase
        .from("categories")
        .delete()
        .eq("category_id", category_id);
  
      console.log("Supabase response:", { data, error });
  
      if (error) throw error;
  
      if (!data || data.length === 0) {
        return res.status(404).json({
          message: `Category with category_id ${category_id} not found`,
        });
      }
  
      res.status(200).json({
        message: `Category with category_id ${category_id} deleted successfully`,
        data,
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({
        message: "Error deleting category",
        error: error.message,
      });
    }
  });

  categoriesRouter.patch('/order', async (req, res) => {
    const { categories } = req.body;
  
    try {
      await supabase.transaction(async (trx) => {
        for (const { category_id, position_id } of categories) {
          const { error } = await trx
            .from('categories')
            .update({ position: position_id })
            .eq('category_id', category_id);
  
          if (error) throw error;
        }
  
        // Optionally, update services if needed
      });
  
      res.status(200).json({ message: 'Categories reordered successfully' });
    } catch (error) {
      console.error('Error updating category order:', error);
      res.status(500).json({ message: 'Error updating category order', error });
    }
  });
  
  categoriesRouter.put("/reorder", async (req, res) => {
    const { reorderedCategories } = req.body;
  
    try {
      for (const [index, category] of reorderedCategories.entries()) {
        const { error } = await supabaseClient
          .from('categories')
          .update({ position_id: index + 1 })
          .eq('category_id', category.category_isd);
  
        if (error) {
          throw error;
        }
      }
  
      res.status(200).json({ message: "Categories reordered successfully" });
    } catch (error) {
      console.error("Error reordering categories:", error);
      res.status(500).json({ message: "Error reordering categories", error });
    }
  });
  
  categoriesRouter.patch("/reorder1", async (req, res) => {
    const { categories: reorderedCategories } = req.body; // Ensure the destructured property matches what is sent from the frontend
  console.log(req.body)
    try {
      for (const category of reorderedCategories) {
        const { error } = await supabase
        .from('categories')
        .update({ 
          position_id: category.position_id, // Update position_id 
          category_name: category.category_name // Update category_name
        })
        .eq('category_id', category.category_id);
       
        if (error) {
          throw error;
        }
      }
  
      res.status(200).json({ message: "Categories reordered successfully" });
    } catch (error) {
      console.error("Error reordering categories:", error);
      res.status(500).json({ message: "Error reordering categories", error });
    }
  });
  
export default categoriesRouter;