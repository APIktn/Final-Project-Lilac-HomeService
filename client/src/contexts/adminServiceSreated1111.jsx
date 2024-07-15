import axios from "axios";

const adminCreated = async (data) => {
  try {
    const formData = new FormData();
    formData.append("service_name", data.service_name);
    formData.append("category_name", data.category_name);
    formData.append("image", data.image);
    formData.append("service_list", JSON.stringify(data.service_list));
    formData.append("price", data.price);
    formData.append("units", data.units);

    await axios.post("http://localhost:4000/admin/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

export default adminCreated;
  
 