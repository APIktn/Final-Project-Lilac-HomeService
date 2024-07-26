import React, { useState } from "react";
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
import { useAdminAuth } from "../contexts/adminAuthentication";

import axios from "axios";
import dayjs from "dayjs";

function AdminCategoryCreate() {
  const { state, logout } = useAdminAuth();
  const { admin } = state;
  const [message, setMessage] = useState("");
  const [createCategory, setCreateCategory] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!categoryName.trim()) {
      setValidationMessage("กรุณากรอกชื่อหมวดหมู่ที่จะสร้าง");
      return;
    }

    if (categoryName.length > 30) {
      setValidationMessage("กรุณาสร้างหมวดหมู่ที่มีตัวอักษรไม่เกิน 30 ตัว");
      return;
    }

    //  Pass the new category name back to the parent component for creation
    // onCategoryCreate({
    //   id: Date.now().toString(),
    //   category: categoryName.trim(),
    //   created: new Date().toLocaleString(),
    //   modified: new Date().toLocaleString(),
    // });

    setValidationMessage("");
    setCreateCategory(true);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setItems(items.filter((item) => item.id !== itemToDelete.id));
    setFilteredItems(
      filteredItems.filter((item) => item.id !== itemToDelete.id)
    );
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleCancel = () => {
    setCreateCategory(false);
  };

  const categoryPost = async (data) => {
    try {
      await axios.post("http://localhost:4000/categories/create", data);

      console.log(data);
      setMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("กรุณากรอกข้อมูลให้ครบ หรือ มีชื่อหมวดหมู่นี้แล้ว");
      }
      console.error("Error creating promotion code:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      category_name: categoryName,
      created_at: dayjs().format(),
      updated_at: dayjs().format(),
    };

    await categoryPost(formData);
    navigate("/admin/category");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="bg-[#001C59] w-[240px]  flex flex-col justify-between">
          <div>
            <div
              className="bg-[#E7EEFF] py-1 rounded-xl flex items-center justify-center mb-12 mx-5 mt-7 w-[192px] h-[46px]"
              onClick={() => navigate("/")}
            >
              <img
                src={vectorHouse}
                alt="House"
                className="w-[26.06px] h-[26.06px] mr-2"
              />
              <span className="text-[#336DF2] text-[20px] font-medium mt-1">
                HomeServices
              </span>
            </div>
            <div>
              <div className="flex items-center  p-4 bg-[#022B87] cursor-pointer">
                <img
                  src={vectorCategory}
                  alt="Category"
                  className="mr-2 ml-2"
                />
                <span className="text-[#F1F1F1] text-base ml-3">หมวดหมู่</span>
              </div>
              <div
                className="flex items-center  p-4  hover:bg-[#022B87] cursor-pointer"
                onClick={() => navigate("/admin/service")}
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
                <span className="text-[#F1F1F1] text-base ml-3">
                  Promotion Code
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center p-2 rounded-md hover:bg-[#022B87] cursor-pointer ml-5 mb-16">
          <img src={vectorLogout} alt="Logout" className="mr-2" />
          <span className="text-[#F1F1F1] text-base ml-2"  
                onClick={() => {
                logout();
                navigate("/admin");
              }}>ออกจากระบบ</span>
        </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-[#EFEFF2]">
          {/* Admin Topbar */}
          <div className="bg-white p-4 flex justify-between items-center">
            <div className="text-lg">
              {createCategory ? (
                <div className="ml-5">
                  <h1 className="text-xs text-[#646C80]">หมวดหมู่</h1>
                  <p>{categoryName}</p>
                </div>
              ) : (
                <div className="ml-5">เพิ่มหมวดหมู่</div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <div
                onClick={handleCancel}
                className="border-[#336DF2] border text-[#336DF2] py-2 px-4 rounded-md w-40 h-11 text-center cursor-pointer"
              >
                ยกเลิก
              </div>
              {createCategory ? (
                <button
                  className="bg-[#336DF2] text-white py-2 px-4 rounded-md w-40 h-11"
                  type="submit"
                  onClick={handleSubmit}
                >
                  ยืนยัน
                </button>
              ) : null}

              {!createCategory ? (
                <button
                  className="bg-[#336DF2] text-white py-2 px-4 rounded-md w-40 h-11 justify-center"
                  onClick={handleCreate}
                >
                  สร้าง
                </button>
              ) : null}
            </div>
          </div>

          {/* Workspace */}
          <div className="p-10 pt-12 flex-1 overflow-auto rounded-md ">
            <div className="rounded-md  rounded-b-none"></div>
            <div className="bg-white p-4 rounded-md rounded-b-none h-[124px]">
              <div className="flex items-center mt-5">
                <div className="w-[205px] text-[#646C80]">
                  ชื่อหมวดหมู่<span className="text-red-600">*</span>
                </div>               
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-[433px] border border-[#CCD0D7] p-[10px_16px] rounded-[8px] ml-16"
                  disabled={createCategory === true}
                />
              </div>
              
              {validationMessage && (
                <div className="text-red-600 mt-2 ml-52">{validationMessage}</div>
              )}
              {createCategory && (
                <div className="flex flex-col gap-7 -mx-4 rounded-t-none mb-4 mt-10 pb-4 h-[180px] w-[380] pt-10 bg-white rounded-lg">
                  <div className="">                    
                    <hr className="border-t-2 border-[#CCD0D7] w-[1235px] ml-5 -mt-10 mb-14" />
                    <div>
                    <span className="block ml-5 font-medium text-[16px] text-[#646C80] ">
                       สร้างเมื่อ
                     <span className="ml-[210px] font-normal text-[16px] text-[#000000]">
                      {dayjs().format("DD/MM/YYYY")} {" "}
                      {dayjs().format("HH:mm A")}           
                    </span>                        
                    </span>
                    <span className="block ml-5 font-medium text-[16px] text-[#646C80] pt-7 mb-5 ">
                      แก้ไขล่าสุด
                     <span className="ml-[195px] font-normal text-[16px] text-[#000000]">
                      {dayjs().format("DD/MM/YYYY")} {" "}
                      {dayjs().format("HH:mm A")}           
                    </span>                        
                    </span>                    
                  </div>
                </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AdminCategoryCreate;
