// client/src/pages/AdminServicesCreated.jsx

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

  const categories = [
    { category: "บริการห้องครัว" },
    { category: "บริการห้องน้ำ" },
    { category: "บริการห้องนั่งเล่น" },
    { category: "บริการทั่วไป" },
  ];

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

    for (let item of subServiceItems) {
      if (!item.name.trim() || !item.price.trim() || !item.unit.trim()) {
        alert(
          "กรุณากรอกข้อมูลในฟิลด์ชื่อรายการ, ค่าบริการต่อหน่วย และหน่วยบริการให้ครบถ้วน"
        );
        return;
      }
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
        "http://localhost:4000/adminservice/post",
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
        <div className="bg-[#001C59] w-[240px] p-4 flex flex-col justify-between">
          <div>
            <div className="bg-[#E7EEFF] p-2 rounded-lg flex items-center justify-center mb-6">
              <img src={vectorHouse} alt="House" className="mr-2" />
              <span>Homeservice</span>
            </div>
            <div
              className="flex items-center mb-4 p-2 rounded-md hover:bg-[#022B87] cursor-pointer"
              onClick={() => navigate("/admin")}
            >
              <img src={vectorCategory} alt="Category" className="mr-2" />
              <span className="text-white">หมวดหมู่</span>
            </div>
            <div
              className="flex items-center mb-4 p-2 rounded-md hover:bg-[#022B87] cursor-pointer"
              onClick={() => navigate("/admin/service")}
            >
              <img src={vectorService} alt="Service" className="mr-2" />
              <span className="text-white">บริการ</span>
            </div>
            <div className="flex items-center p-2 rounded-md hover:bg-[#022B87] cursor-pointer">
              <img
                src={vectorPromotionCode}
                alt="Promotion Code"
                className="mr-2"
              />
              <span className="text-white">Promotion Code</span>
            </div>
          </div>
          <div className="flex items-center p-2 rounded-md hover:bg-[#022B87] cursor-pointer">
            <img src={vectorLogout} alt="Logout" className="mr-2" />
            <span className="text-white">ออกจากระบบ</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-[#EFEFF2]">
          {/* Admin Topbar */}
          <div className="bg-white p-4 flex justify-between items-center">
            <div className="text-lg">เพิ่มบริการใหม่</div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/admindashboard")}
                className="border-[#336DF2] border text-[#336DF2] py-2 px-4 rounded-md w-40 h-11"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="bg-[#336DF2] text-white py-2 px-4 rounded-md w-40 h-11"
                disabled={uploading}
              >
                {uploading ? "กำลังอัพโหลด..." : "สร้าง"}
              </button>
            </div>
          </div>

          {/* Workspace */}
          <div className="p-4 pt-8 flex-1 overflow-auto rounded-md shadow-md">
            <div className="rounded-md shadow-md rounded-b-none"></div>
            <div className="bg-white p-4 rounded-md shadow-md ">
              {/* Form for Uploading Picture for Service */}
              <div className="border-b border-[#CCD0D7] mb-4 pb-4">
                <div className="mb-4 w-[1072px]">
                  <div className="flex items-center mb-2">
                    <div>
                      <label className="block">
                        ชื่อบริการ<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <input
                      id="servicename"
                      name="servicename"
                      type="text"
                      placeholder="Enter service name here"
                      onChange={(event) => {
                        setServicename(event.target.value);
                      }}
                      value={servicename}
                      className="border border-gray-300 rounded-md p-2 w-[433px]"
                    />
                  </div>
                  <div className="flex items-center mb-2">
                    <label className="block">
                      หมวดหมู่<span className="text-red-500">*</span>
                    </label>
                    <select
                      className="border border-gray-300 rounded-md p-2 w-[433px]"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    >
                      <option value="">เลือกหมวดหมู่</option>
                      {categories.map((option, index) => (
                        <option key={index} value={option.category}>
                          {option.category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center mb-2">
                    <label className="block">
                      รูปภาพ<span className="text-red-500">*</span>
                    </label>
                    <div className="Upload-image">
                      <div
                        className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center w-[433px] h-[143px]"
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDropUpload}
                      >
                        {uploadedImage ? (
                          <div className="image-preview-container w-[350px] h-[140px]">
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
                              <p className="text-gray-500">
                                อัพโหลดรูปภาพ หรือลากและวางที่นี่
                              </p>
                              <p className="text-gray-500">
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
                  <span className="text-gray-500 mt-2 ml-[50px]">
                    ขนาดภาพที่แนะนำ: 1440px x 225px
                  </span>
                  <button
                    className="underline prompt text-[16px] text-[#336DF2] ml-[120px]"
                    onClick={handleDeleteImage}
                    type="button"
                  >
                    ลบรูปภาพ
                  </button>
                </div>
              </div>
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
                <div className="flex gap-4 items-center mb-4 bg-white rounded-md p-2 shadow-sm">
                  <div className="col-span-1 flex items-center cursor-grab">
                    <img
                      src={vectorDragDrop}
                      alt="DragDrop"
                      className="mr-2 cursor-grab"
                    />
                  </div>
                  <div className="col-span-1 w-[422px]">
                    <p className="font-normal">ชื่อรายการ</p>
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
                  <div className="col-span-3 w-[240px]">
                    <p>ค่าบริการ / 1 หน่วย</p>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      value={item.price}
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
                  <div className="col-span-3 w-[240px]">
                    <p>หน่วยบริการ</p>
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
                      className="text-[#B3B8C4] underline decoration-solid cursor-pointer"
                      onClick={() => handleDeleteClick(item)}
                    >
                      ลบรายการ
                    </p>
                  </div>
                  <div className="col-span-1 flex space-x-2 justify-between"></div>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <button
                onClick={handleAddSubService}
                className="text-[#336DF2] font-medium"
                type="button"
              >
                เพิ่มรายการ +
              </button>
            </div>
          </div>
        </div>
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-md shadow-md">
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
