import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import vectorCategory from "../assets/icons/Vector-category.svg";
import vectorService from "../assets/icons/Vector-service.svg";
import vectorPromotionCode from "../assets/icons/Vector-promotion-code.svg";
import vectorHouse from "../assets/icons/Vector-house.svg";
import vectorLogout from "../assets/icons/Vector-logout.svg";
import vectorBin from "../assets/icons/Vector-bin.svg";
import vectorEdit from "../assets/icons/Vector-edit.svg";
import vectorAlert from "../assets/icons/Vector-alert.svg";
import vectorClose from "../assets/icons/Vector-close.svg";
import vectorUpload from "../assets/icons/Vector-upload.svg";
import vectorDragDrop from "../assets/icons/Vector-dragdrop.svg";
import axios from "axios";
import { useAdminAuth } from "../contexts/adminAuthentication";

function AdminServiceCreate() {
  const [servicename, setServicename] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [subServiceItems, setSubServiceItems] = useState([
    { name: "", price: "", unit: "" },
  ]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [categoryName, setCategoryName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const { state, logout } = useAdminAuth();
  const { admin } = state;
  const[categories,setCategories] = useState([])

  

  const handleCreate = () => {
    if (categoryName.trim()) {
      onCategoryCreate({
        id: Date.now().toString(),
        category: categoryName.trim(),
        created: new Date().toLocaleString(),
        modified: new Date().toLocaleString(),
      });
      navigate("/admindashboard");
      setCategoryName("");
    } else {
      alert("Please enter a category name.");
    }
  };

  const handleDragStart = (e, draggedIndex) => {
    e.dataTransfer.setData("draggedIndex", draggedIndex.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, droppedIndex) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("draggedIndex"));
    const draggedItem = subServiceItems[draggedIndex];

    let newItems = subServiceItems.filter(
      (item, index) => index !== draggedIndex
    );

    newItems.splice(droppedIndex, 0, draggedItem);

    setSubServiceItems(newItems);
  };

  const handleAddSubService = () => {
    setSubServiceItems([
      ...subServiceItems,
      { id: Date.now(), name: "", price: "", unit: "" },
    ]);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setSubServiceItems(
      subServiceItems.filter((item) => item.id !== itemToDelete.id)
    );
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      file.size <= 5 * 1024 * 1024 &&
      (file.type === "image/png" || file.type === "image/jpeg")
    ) {
      setUploadedImage(file);
      e.target.value = null;
    } else {
      alert(
        "Please upload a valid image file (PNG, JPG) with size up to 5 MB."
      );
      e.target.value = null;
    }
  };

  const handleDeleteImage = () => {
    setUploadedImage(null);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const getCategories = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/categories`);
      console.log("Fetched categories:", result.data.data);
      setCategories(result.data.data);      
    } catch (error) {
      console.error("Error fetching categories:", error);
    } 
  };

  useEffect(() => {
    getCategories();    
  }, []);

  const handleDropUpload = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (
      file &&
      file.size <= 5 * 1024 * 1024 &&
      (file.type === "image/png" || file.type === "image/jpeg")
    ) {
      setUploadedImage(file);
    } else {
      alert(
        "Please upload a valid image file (PNG, JPG) with size up to 5 MB."
      );
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!servicename.trim()) {
    alert("กรุณากรอกชื่อบริการ");
    return;
  }

  if (!categoryName.trim()) {
    alert("กรุณาเลือกหมวดหมู่");
    return;
  }

  const newErrors = {};

  for (let item of subServiceItems) {
    if (!item.price.trim()) {
      newErrors.price = "กรุณากรอกราคา";
    } else if (!/^\d+(\.\d{1,2})?$/.test(item.price)) {
      newErrors.price = "กรุณากรอกราคาให้ถูกต้อง";
    }

    if (!item.name.trim() || !item.price.trim() || !item.unit.trim()) {
      alert(
        "กรุณากรอกข้อมูลในฟิลด์ชื่อรายการ, ค่าบริการต่อหน่วย และหน่วยบริการให้ครบถ้วน"
      );
      return;
    }
  }

  if (Object.keys(newErrors).length > 0) {
    // Display the errors
    alert(newErrors.price);
    return;
  }

  setUploading(true);

 
    try {
      const formData = new FormData();
      formData.append("service_name", servicename);
      formData.append("category_name", categoryName);
      formData.append("image", uploadedImage);

      subServiceItems.forEach((item, index) => {
        formData.append(`subServiceItems[${index}][name]`, item.name);
        formData.append(`subServiceItems[${index}][price]`, item.price);
        formData.append(`subServiceItems[${index}][unit]`, item.unit);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/adminservice/post`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setMessage("อัพโหลดข้อมูลสำเร็จ");
        setServicename("");
        setCategoryName("");
        setSubServiceItems([{ name: "", price: "", unit: "" }]);
        setUploadedImage(null);
        window.location.href = "/admin/service";  
      }
    } catch (error) {
      console.error("Error uploading data", error);
      setMessage("เกิดข้อผิดพลาดในการอัพโหลดข้อมูล");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    handleAddSubService();
  }, []);

  return (
    <form id="upload-form" onSubmit={handleSubmit}>
      <div className="flex h-screen">
       {/* Sidebar */}
      <div className="bg-[#001C59] w-[240px]  flex flex-col justify-between">                    
        <div>
          <div
            className="bg-[#E7EEFF] py-1 rounded-xl flex items-center justify-center mb-12 mx-5 mt-7 w-[192px] h-[46px]"
            onClick={() => navigate("/")}
          >
            <img src={vectorHouse} alt="House" className="w-[26.06px] h-[26.06px] mr-2" />
            <span className="text-[#336DF2] text-[20px] font-medium mt-1">HomeServices</span>
          </div>
          <div>
            <div className="flex items-center  p-4 hover:bg-[#022B87] cursor-pointer" 
              onClick={() => navigate("/admin/category")}>
              <img src={vectorCategory} alt="Category" className="mr-2 ml-2" />
              <span className="text-[#F1F1F1] text-base ml-3">หมวดหมู่</span>
            </div>
            <div
              className="flex items-center  p-4  bg-[#022B87] cursor-pointer"              
            >
              <img src={vectorService} alt="Service" className="mr-2 ml-2" />
              <span className="text-[#F1F1F1] text-base ml-3">บริการ</span>
            </div>
            <div
              className="flex items-center  p-4  hover:bg-[#022B87] cursor-pointer"
              onClick={() => navigate("/admin/promotion")}            
            >
              <img
                src={vectorPromotionCode}
                alt="Promotion Code"
                className="mr-2 ml-2"
              />
              <span className="text-[#F1F1F1] text-base ml-3">Promotion Code</span>
            </div>
          </div>
        </div>
        <div className="flex items-center p-2 hover:bg-[#022B87] cursor-pointer  ml-5 mb-16">
        <img src={vectorLogout} alt="Logout" className="mr-2" />
          <span className="text-[#F1F1F1] text-base ml-2"
                  onClick={() => {
                  logout();
                  navigate("/admin")}}
          >ออกจากระบบ</span>
        </div>
      </div>


        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-[#EFEFF2]">
          {/* Admin Topbar */}
          <div className="bg-white p-4 flex justify-between items-center ">
            <div className="text-[20px] font-medium ml-6">เพิ่มบริการ</div>
            <div className="flex items-center space-x-6 mr-8">
              <button
                onClick={() => navigate("/admin/service")}
                className="border-[#336DF2] border text-[#336DF2] py-2 px-4 rounded-md w-[112px] h-11"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="bg-[#336DF2] text-white py-2 px-4 rounded-md w-[112px] h-11"
                disabled={uploading}
              >
                {uploading ? "อัพโหลด.." : "สร้าง"}
              </button>
            </div>
          </div>

          {/* Workspace */}
          <div className="p-4 pt-8 flex-1 overflow-auto  mx-4 ">
            <div className=" rounded-b-none "></div>
            <div className="bg-white p-4 rounded-t-lg ">
              {/* Form for Uploading Picture for Service */}
              <div className="border-b border-[#CCD0D7] mb-4 pb-4">
                <div className="mb-4 w-[1072px]">
                  <div className="flex items-center mb-10 w-[662px] justify-between">
                    <div>
                      <label className="block ml-3 font-medium text-[16px] text-[#646C80]">
                        ชื่อบริการ<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <input
                      id="servicename"
                      name="servicename"
                      type="text"                     
                      onChange={(event) => {
                        setServicename(event.target.value);
                      }}
                      value={servicename}
                      className="border border-gray-300  p-2 w-[433px] rounded-lg"
                    />
                  </div>
                  <div className="flex items-center mb-10 w-[662px] justify-between">
                    <label className="block ml-3 font-medium text-[16px] text-[#646C80]">
                      หมวดหมู่<span className="text-red-500">*</span>
                    </label>
                    <select
                      className="border border-gray-300  p-2 w-[433px] rounded-lg"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    >
                      <option value="">เลือกหมวดหมู่</option>
                      {categories.map((option, index) => (
                        <option key={index} value={option.category_name}>
                          {option.category_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center mb-2 w-[662px] justify-between">
                    <label className="block ml-3 -mt-32 font-medium text-[16px] text-[#646C80]">
                      รูปภาพ<span className="text-red-500">*</span>
                    </label>
                    <div className="Upload-image">
                      <div
                        className="border border-dashed border-gray-300  p-4 flex flex-col items-center justify-center w-[433px] h-[143px]"
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDropUpload}
                      >
                        {uploadedImage ? (
                          <div className="image-preview-container w-[350px] h-[140px] ">
                            <img
                              className="image-preview w-[350px] h-[140px] object-cover"
                              src={URL.createObjectURL(uploadedImage)}
                              alt="Preview"
                            />
                          </div>
                        ) : (
                          <label htmlFor="upload">
                            <div className="flex flex-col items-center cursor-pointer">
                              <img
                                src={vectorUpload}
                                alt="Upload"
                                className="mb-2 w-[48px] h-[46px]"
                              />
                              <p className="font-normal text-[14px] text-[#646C80]">
                                <span className="text-[#336DF2]">อัพโหลดรูปภาพ</span> หรือ ลากและวางที่นี่
                              </p>
                              <p className="font-normal text-[12px] text-[#646C80]">
                                PNG, JPG ขนาดไม่เกิน 5 MB
                              </p>
                            </div>
                            <input
                              id="upload"                                                         
                              name="image-service"
                              type="file"
                              onChange={handleFileChange}
                              hidden
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="ml-[230px] font-normal text-[14px] text-[#646C80]">
                    ขนาดภาพที่แนะนำ: 1440 x 225 PX
                  </span>
                  <button
                    className="underline prompt text-[16px] text-[#336DF2] ml-[155px] font-semibold"
                    onClick={handleDeleteImage}
                    type="button"
                  >
                    ลบรูปภาพ
                  </button>
                </div>
              </div>
            <p className="ml-2 font-normal text-[16px] text-[#646C80]  mt-12">รายการบริการย่อย</p>
            </div>

            {/* Sub-Service Items */}
            {subServiceItems.map((item, index) => (
              <div
              key={item.id}
              className="bg-white p-4 rounded-md rounded-t-none"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e)}
              onDrop={(e) => handleDrop(e, index)}
              >
                <div className="flex gap-5 items-center  bg-white  p-2 ">
                  
                  <div className="col-span-1 flex items-center cursor-grab mt-2">
                    <img
                      src={vectorDragDrop}
                      alt="DragDrop"
                      className="mr-2 cursor-grab ml-2"
                    />
                    <img
                      src={vectorDragDrop}
                      alt="DragDrop"
                      className="mr-2 cursor-grab -ml-[6px]"
                    />
                  </div>
                  <div className="col-span-1 w-[422px] font-normal text-[16px] text-[#646C80]">
                    <p className="font-normal mb-2">ชื่อรายการ</p>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      value={item.name}
                      onChange={(e) =>
                        setSubServiceItems((prevItems) =>
                          prevItems.map((prevItem, idx) =>
                            idx === index
                              ? { ...prevItem, name: e.target.value }
                              : prevItem
                          )
                        )
                      }
                    />
                  </div>
                  <div className="col-span-3 w-[240px] font-normal text-[16px] text-[#646C80] ">
                    <p className=" mb-2">ค่าบริการ / 1 หน่วย</p>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      value={item.price}
                      placeholder="฿"
                      style={{ textAlign: 'right' }}
                      onChange={(e) =>
                        setSubServiceItems((prevItems) =>
                          prevItems.map((prevItem, idx) =>
                            idx === index
                              ? { ...prevItem, price: e.target.value }
                              : prevItem
                          )
                        )
                      }
                    />
                  </div>
                  <div className="col-span-3 w-[240px] font-normal text-[16px] text-[#646C80]">
                    <p className=" mb-2">หน่วยบริการ</p>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      value={item.unit}
                      onChange={(e) =>
                        setSubServiceItems((prevItems) =>
                          prevItems.map((prevItem, idx) =>
                            idx === index
                              ? { ...prevItem, unit: e.target.value }
                              : prevItem
                          )
                        )
                      }
                    />
                  </div>
                  <div>
                    <p
                      className="text-[#336DF2] underline decoration-solid cursor-pointer font-semibold text-[16px]"
                      onClick={() => handleDeleteClick(item)}
                    >
                      ลบรายการ
                    </p>
                  </div>
                  <div className="col-span-1 flex space-x-2 justify-between"></div>
                </div>
              </div>
            ))
            }
            <div className=" bg-white p-4 rounded-b-lg">
              <button
                onClick={handleAddSubService}
                className="border-[#336DF2] border text-[#336DF2] py-2 px-4 ml-2 mb-6 rounded-lg w-[185px] h-11 flex items-center justify-cent text-[16px] font-medium"
                type="button"
              >
                <span className="ml-6">เพิ่มบริการ</span><span className="text-[25px] ml-3" >+</span>
              </button>
            </div>
          </div>
        </div>
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-md ">
              <div className="text-lg mb-4">
                คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleDeleteCancel}
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="bg-red-500 text-white py-2 px-4 rounded-md"
                >
                  ลบ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

export default AdminServiceCreate;