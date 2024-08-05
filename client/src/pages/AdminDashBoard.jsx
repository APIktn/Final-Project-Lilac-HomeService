import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import vectorCategory from "../assets/icons/Vector-category.svg";
import vectorService from "../assets/icons/Vector-service.svg";
import vectorPromotionCode from "../assets/icons/Vector-promotion-code.svg";
import vectorHouse from "../assets/icons/Vector-house.svg";
import vectorLogout from "../assets/icons/Vector-logout.svg";
import vectorDragDrop from "../assets/icons/Vector-dragdrop.svg";
import vectorBin from "../assets/icons/Vector-bin.svg";
import vectorEdit from "../assets/icons/Vector-edit.svg";
import vectorAlert from "../assets/icons/Vector-alert.svg";
import vectorClose from "../assets/icons/Vector-close.svg";
import vectorSearch from "../assets/icons/Vector-search.svg";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { format } from "date-fns";
import { useAdminAuth } from "../contexts/adminAuthentication";

function AdminDashboard() {
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const { state, logout } = useAdminAuth();
  const { admin } = state;
  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/categories`);
      console.log("Fetched categories:", result.data.data);
      setCategories(result.data.data);
      setFilteredItems(result.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleDragStart = (e, draggedIndex) => {
    e.dataTransfer.setData("draggedIndex", draggedIndex.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, droppedIndex) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("draggedIndex"));
    const draggedItem = categories[draggedIndex];

    let newItems = categories.filter((item, index) => index !== draggedIndex);
    newItems.splice(droppedIndex, 0, draggedItem);

    newItems = newItems.map((item, index) => ({
      ...item,
      position_id: index + 1, // Assuming you use this for ordering
    }));

    setCategories(newItems);
    setFilteredItems(newItems);

    // Update the order on the server
    try {
      await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/categories/reorder`, {
        categories: newItems.map((item) => ({
          category_id: item.category_id,
          position_id: item.position_id,
          category_name: item.category_name,
        })),
      });
    } catch (error) {
      console.error("Error updating category order on the server:", error);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = categories.filter((item) =>
      item.category_name.toLowerCase().includes(searchValue)
    );
    setFilteredItems(filtered);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/categories/${itemToDelete.category_id}`
      );
      setCategories((prevItems) =>
        prevItems.filter(
          (prevItem) => prevItem.category_id !== itemToDelete.category_id
        )
      );
      setFilteredItems((prevItems) =>
        prevItems.filter(
          (prevItem) => prevItem.category_id !== itemToDelete.category_id
        )
      );
      setShowDeleteModal(false);
      setItemToDelete(null);
      window.location.href = "/admin/category";
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const formatDateTime = (dateString) => {
    return format(new Date(dateString), "dd/MM/yyyy hh:mma");
  };

  return (
    <div className="flex h-screen w-full">
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
              <img src={vectorCategory} alt="Category" className="mr-2 ml-2" />
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
          <span
            className="text-[#F1F1F1] text-base ml-2"
            onClick={() => {
              logout();
              navigate("/admin");
            }}
          >
            ออกจากระบบ
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#EFEFF2]">
        {/* Admin Topbar */}
        <div className="bg-white p-4 flex items-center justify-between">
          <div className="text-[20px] font-medium ml-4  w-[76px]">หมวดหมู่</div>
          <div className="flex items-center ">
            <div className="flex w-72 h-11 border rounded-md p-2 items-center ">
              <img
                src={vectorSearch}
                alt="search-icon"
                className="ml-2 mr-2 h-[18px] w-[18px] "
              />
              <input
                type="text"
                placeholder="ค้นหาหมวดหมู่..."
                value={searchTerm}
                onChange={handleSearch}
                className="outline-none text-[16px] font-light"
              />
            </div>
            <button
              onClick={() => navigate("/admin/category/create")}
              className="bg-[#336DF2] text-white -pt-[6px] px-4 rounded-md w-40 h-11 font-medium text-[16px] flex items-center justify-center ml-6 mr-5"
            >
              <span>เพิ่มหมวดหมู่</span>
              <span className="text-[25px] ml-3">+</span>
            </button>
          </div>
        </div>

        {/* Workspace */}
        {loading ? (
          <div className="flex justify-center items-center w-full h-[500px]">
            <ClipLoader size={200} color={"#123abc"} loading={loading} />
          </div>
        ) : (
          <div className="p-4 pt-8 flex-1 overflow-auto rounded-md mx-4 ">
            <div className="rounded-md rounded-b-none">
              <div
                style={{ fontWeight: 400 }}
                className="grid grid-cols-12 gap-1 items-center bg-[#E6E7EB] rounded-md p-2 border border-[#EFEFF2] text-[14px] text-[#646C80] h-[41px] "
              >
                <div className="col-span-1"></div>
                <div className="col-span-1 -ml-6">ลำดับ</div>
                <div className="col-span-3 -ml-3">ชื่อหมวดหมู่</div>
                <div className="col-span-3 ">สร้างเมื่อ</div>
                <div className="col-span-3 ">แก้ไขล่าสุด</div>
                <div className="col-span-1 ml-4">Action</div>
              </div>
            </div>
            <div className="bg-white  rounded-md  rounded-t-none">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-1 items-center border-b-2  text-[16px] text-[#000000] h-[88px]  font-light"
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <div className="col-span-1 ml-7">
                    <div>
                      <img src={vectorDragDrop} alt="DragDrop" />
                    </div>
                    <div className="ml-2 -mt-[18px]">
                      <img src={vectorDragDrop} alt="DragDrop" />
                    </div>
                  </div>
                  <div className="col-span-1 ">{item.position_id}</div>
                  <div className="col-span-3 ">{item.category_name}</div>
                  <div className="col-span-3 ">
                    {formatDateTime(item.created_at)}
                  </div>
                  <div className="col-span-3 ">
                    {formatDateTime(item.updated_at)}
                  </div>
                  <div className="col-span-1 flex flex-row gap-4  ">
                    <img
                      src={vectorBin}
                      alt="Delete"
                      className="cursor-pointer "
                      onClick={() => handleDeleteClick(item)}
                    />
                    <img
                      src={vectorEdit}
                      alt="Edit"
                      className="cursor-pointer  ml-4"
                      onClick={() =>
                        navigate(`/admin/category/edit/${item.category_id}`)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <div className="flex justify-between items-center mb-4 flex-col relative w-[300px] h-[30px] ">
              <img src={vectorAlert} alt="Alert" />
              <img
                src={vectorClose}
                alt="Close"
                className="cursor-pointer absolute -right-2 -top-2"
                onClick={handleDeleteCancel}
              />
            </div>
            <p className="text-center  text-[20px]">ยืนยันการลบรายการ?</p>
            <p className="text-center mb-4 text-[16px] text-[#636678]">
              คุณต้องการลบรายการ ' {itemToDelete?.category_name} '
            </p>
            <p className="text-center mb-4 text-[16px] text-[#636678] -mt-4">
              ใช่หรือไม่
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleDeleteConfirm}
                className="bg-[#336DF2] text-white py-2 px-4 rounded-md mr-2 w-[112px] h-[44px]"
              >
                ลบรายการ
              </button>
              <button
                onClick={handleDeleteCancel}
                className="bg-white text-[#336DF2] py-2 px-4 rounded-md w-[112px] h-[44px] border-[#336DF2] border-2"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
