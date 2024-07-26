import { Router } from "express";
import supabase from "../utils/db.mjs";

const categoriesRouter = Router();

categoriesRouter.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("position_id", { ascending: true });

    if (error) {
      throw error;
    }

    return res.status(200).json({
      message:
        "Successfully retrieved and formatted the list of promotion codes.",
      data: data,
    });
  } catch (error) {
    console.error("Error retrieving promotion codes:", error.message);
    return res.status(500).json({
      message:
        "Server could not retrieve promotion codes due to a database error.",
    });
  }
});

categoriesRouter.delete("/:category_id", async (req, res) => {
  const { category_id } = req.params;

  try {
    // Step 1: Get the position_id of the category to be deleted
    const { data: categoryData, error: categoryError } = await supabase
      .from("categories")
      .select("position_id")
      .eq("category_id", category_id)
      .single();

    if (categoryError) throw categoryError;
    if (!categoryData) {
      return res.status(404).json({
        message: `Category with category_id ${category_id} not found`,
      });
    }

    const { position_id } = categoryData;

    // Step 2: Delete the specified category
    const { error: deleteError } = await supabase
      .from("categories")
      .delete()
      .eq("category_id", category_id);

    if (deleteError) throw deleteError;

    // Step 3: Get all categories with position_id greater than the deleted one
    const { data: remainingCategories, error: remainingCategoriesError } =
      await supabase
        .from("categories")
        .select("*")
        .gt("position_id", position_id);

    if (remainingCategoriesError) throw remainingCategoriesError;

    // Step 4: Update the position_id of the remaining categories
    const updates = remainingCategories.map(async (category) => {
      const newPositionId = category.position_id - 1;
      await supabase
        .from("categories")
        .update({ position_id: newPositionId })
        .eq("category_id", category.category_id);
    });

    await Promise.all(updates);

    res.status(200).json({
      message: `Category with category_id ${category_id} deleted successfully and remaining categories reordered`,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({
      message: "Error deleting category",
      error: error.message,
    });
  }
});

categoriesRouter.patch("/reorder", async (req, res) => {
  const { categories: reorderedCategories } = req.body;

  const offset = 1000; // Ensure this is sufficiently large to avoid conflicts with existing positions

  const client = supabase; // Use your Supabase client

  try {
    // Step 1: Update to temporary positions
    for (const category of reorderedCategories) {
      const tempPositionId = category.position_id + offset; // Adding an offset to avoid conflicts
      const { error: tempUpdateError } = await client
        .from("categories")
        .update({ position_id: tempPositionId })
        .eq("category_id", category.category_id);

      if (tempUpdateError) {
        throw tempUpdateError;
      }
    }

    // Step 2: Update to final positions
    for (const category of reorderedCategories) {
      const { error: finalUpdateError } = await client
        .from("categories")
        .update({
          position_id: category.position_id,
          category_name: category.category_name,
        })
        .eq("category_id", category.category_id);

      if (finalUpdateError) {
        throw finalUpdateError;
      }
    }

    res.status(200).json({ message: "Categories reordered successfully" });
  } catch (error) {
    console.error("Error reordering categories:", error);
    res.status(500).json({ message: "Error reordering categories", error });
  }
});

/////create
categoriesRouter.post("/create", async (req, res) => { 
  const { category_name, created_at, updated_at } = req.body;
  
  if (!category_name) {
    return res.status(400).json({
      message: 'กรุณากรอกข้อมูล "ชื่อหมวดหมู่"',
    });
  }
  try {
    // Check if category_name already exists
    const { data: existingCategoryData, error: existingCategoryError } =
      await supabase
        .from("categories")
        .select("category_name")
        .eq("category_name", category_name)
        .single();

    if (existingCategoryError && existingCategoryError.code !== "PGRST116")
      throw existingCategoryError;

    if (existingCategoryData) {
      return res.status(400).json({
        message: "มีหมวดหมู่นี้แล้วกรุณากรอกชื่ออื่น",
      });
    }

    // Get the maximum position_id
    const { data: maxPositionData, error: maxPositionError } = await supabase
      .from("categories")
      .select("position_id")
      .order("position_id", { ascending: false })
      .limit(1)
      .single();

    if (maxPositionError) throw maxPositionError;

    // Determine the new position_id
    const newPositionId = maxPositionData ? maxPositionData.position_id + 1 : 1;

    // Insert the new category (exclude category_id)
    const { data, error } = await supabase
      .from("categories")
      .insert({
        category_name,
        created_at,
        updated_at,
        position_id: newPositionId,
      })
      .select();

    if (error) throw error;

    res.status(201).json({
      message: "Category created successfully",
      data: data[0],
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({
      message: "Error creating category",
      error: error.message,
    });
  }
});

///get to edit
categoriesRouter.get("/:category_id", async (req, res) => {
  const categoryId = req.params.category_id; // Fixing this line
  let result;
  try {
    result = await supabase
      .from("categories")
      .select("category_name, created_at, updated_at")
      .eq("category_id", categoryId)
      .single();
  } catch {
    return res.status(500).json({
      message: "Error fetching category",
    });
  }

  if (!result.data || result.data.length === 0) {
    return res.status(404).json({
      "Not Found": "Not Found",
    });
  }

  return res.status(200).json({
    OK: "Successfully .",
    data: result.data,
  });
});

//update category
categoriesRouter.patch("/edit/:category_id", async (req, res) => {
  const { category_id } = req.params;
  const { category_name, updated_at } = req.body;
  if (!category_name) {
    return res.status(400).json({
      message: 'กรุณากรอกข้อมูล "ชื่อหมวดหมู่"',
    });
  }

  try {
    // Check if the updated category name already exists in the table
    const { data: existingCategory, error: checkError } = await supabase
      .from("categories")
      .select()
      .eq("category_name", category_name);

    if (checkError) throw checkError;

    if (
      existingCategory &&
      existingCategory.length > 0 &&
      existingCategory[0].category_id !== category_id
    ) {
      return res.status(400).json({
        message: "มีหมวดหมู่นี้แล้วกรุณากรอกชื่ออื่น",
      });
    }

    // Update the category with the given category_id
    const { data, error } = await supabase
      .from("categories")
      .update({ category_name, updated_at })
      .eq("category_id", category_id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: `Category with category_id ${category_id} not found`,
      });
    }

    res.status(200).json({
      message: "Category updated successfully",
      data: data[0],
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({
      message: "Error updating category",
      error: error.message,
    });
  }
});


export default categoriesRouter;