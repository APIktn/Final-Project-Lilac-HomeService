import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import vectorCategory from "../assets/icons/Vector-category.svg";
import vectorService from "../assets/icons/Vector-service.svg";
import vectorPromotionCode from "../assets/icons/Vector-promotion-code.svg";
import vectorHouse from "../assets/icons/Vector-house.svg";
import vectorLogout from "../assets/icons/Vector-logout.svg";
import vectorBin from "../assets/icons/Vector-bin.svg";
import vectorEdit from "../assets/icons/Vector-edit.svg";
import vectorAlert from "../assets/icons/Vector-alert.svg";
import vectorClose from "../assets/icons/Vector-close.svg";
import vectorSearch from "../assets/icons/Vector-search.svg";
import { format } from "date-fns";
import { ClipLoader } from "react-spinners";

function AdminPromotion() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  // const [promotionCode, setPromotionCode] = useState([]);
  const [originalPromotionCode, setOriginalPromotionCode] = useState([]);
  const navigate = useNavigate();

  const handleDragStart = (e, draggedIndex) => {
    e.dataTransfer.setData("draggedIndex", draggedIndex.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, droppedIndex) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("draggedIndex"));
    const draggedItem = originalPromotionCode[draggedIndex];

    let newItems = originalPromotionCode.filter(
      (item, index) => index !== draggedIndex
    );

    newItems.splice(droppedIndex, 0, draggedItem);

    setOriginalPromotionCode(newItems);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = originalPromotionCode.filter((item) =>
      item.code.toLowerCase().includes(searchValue)
    );
    setOriginalPromotionCode(filtered);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `http://localhost:4000/promotion/${itemToDelete.promo_id}`
      );
      setOriginalPromotionCode((prevItems) =>
        prevItems.filter(
          (prevItem) => prevItem.promo_id !== itemToDelete.promo_id
        )
      );
      setShowDeleteModal(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Error deleting promotion code:", error);
      // Handle error state or notification to the user
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const getPromotionCode = async () => {
    try {
      const result = await axios.get(`http://localhost:4000/promotion`);
      console.log("Fetched promotion codes:", result.data.data);
      setOriginalPromotionCode(result.data.data);
    } catch (error) {
      console.error("Error fetching promotion codes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPromotionCode();
  }, []);

  // Function to handle search input change

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to filter promotion codes based on category, price range, and search query

  const filterPromotionCodes = () => {
    let filteredPromotionCodes = originalPromotionCode;

    // Filter by search query

    if (searchQuery.trim() !== "") {
      filteredPromotionCodes = filteredPromotionCodes.filter((code) =>
        code.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Additional filters can be added here if needed

    return filteredPromotionCodes;
  };

  const filteredPromotionCodes = filterPromotionCodes();

  const formatDateTime = (dateString) => {
    return format(new Date(dateString), "dd/MM/yyyy hh:mma");
  };

  return (
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
            onClick={() => navigate("/admindashboard")}
          >
            <img src={vectorCategory} alt="Category" className="mr-2" />
            <span className="text-white">หมวดหมู่</span>
          </div>
          <div className="flex items-center mb-4 p-2 rounded-md hover:bg-[#022B87] cursor-pointer">
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
      <div className="flex-1 flex flex-col bg-[#EFEFF2] ">
        {/* Admin Topbar */}
        <div className="bg-white p-4 flex justify-between items-center">
          <div className="text-lg">Promotion Code</div>
          <div className="flex items-center space-x-4">
            <div className="flex w-72 h-11 border rounded-md p-2 items-center">
              <img
                src={vectorSearch}
                alt="search-icon"
                className="ml-2 mr-2 h-[18px] w-[18px] "
              />
              <input
                type="text"
                placeholder="ค้นหา Promotion Code..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="outline-none text-[16px] font-light"
              />
            </div>
            <button
              onClick={() => navigate("/admin/promotion/create")}
              className="bg-[#336DF2] text-white py-2 px-4 rounded-md w-56 h-11"
            >
              เพิ่ม Promotion Code +
            </button>
          </div>
        </div>

        {/* Workspace */}
        {loading ? (
          <div className="flex justify-center items-center w-full h-[500px]">
            <ClipLoader size={200} color={"#123abc"} loading={loading} />
          </div>
        ) : (
          <div className="p-4 pt-8 flex-1 overflow-auto rounded-md shadow-md">
            <div className="rounded-md shadow-md rounded-b-none">
              <div
                style={{ fontWeight: 400 }}
                className="grid grid-cols-12 gap-4 items-center bg-[#E6E7EB] rounded-md p-2 shadow-md border border-[#EFEFF2] text-[14px] text-[#646C80]"
              >
                <div className="col-span-2 ml-3">Promotion Code</div>
                <div className="col-span-1">ประเภท</div>
                <div className="col-span-2 ml-5">โควต้าการใช้(ครั้ง)</div>
                <div className="col-span-2 -ml-5">ราคาที่ลด</div>
                <div className="col-span-2 -ml-14">สร้างเมื่อ</div>
                <div className="col-span-2 -ml-8">วันหมดอายุ</div>
                <div className="col-span-1">Action</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md rounded-t-none text-[#505666]">
              {filteredPromotionCodes.map((item, index) => (
                <div
                  key={item.promo_id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e)}
                  onDrop={(e) => handleDrop(e, index)}
                  className="grid grid-cols-12 gap-4 items-center mb-4 bg-white rounded-md p-2 shadow-sm"
                >
                  <div className="col-span-2">{item.code}</div>
                  <div className="col-span-1">
                    {item.baht_discount ? "Fixed" : "Percent"}
                  </div>
                  {item.count === null ? (
                    <div className="col-span-2 ml-5">0/{item.total_code}</div>
                  ) : (
                    <div className="col-span-2 ml-5">
                      {item.count}/{item.total_code}
                    </div>
                  )}
                  <div className="col-span-2 text-red-600 -ml-5">
                    {item.baht_discount
                      ? `-${item.baht_discount} ฿`
                      : `-${item.percent_discount} %`}
                  </div>

                  <div className="col-span-2 -ml-14">
                    {formatDateTime(item.created_at)}
                  </div>
                  <div className="col-span-2 -ml-5">
                    {formatDateTime(item.expired_date)}
                  </div>
                  <div className="col-span-1 flex space-x-2 justify-between">
                    <img
                      src={vectorBin}
                      alt="Bin"
                      className="cursor-pointer"
                      onClick={() => handleDeleteClick(item)}
                    />
                    <img
                      src={vectorEdit}
                      alt="Edit"
                      className="cursor-pointer"
                      onClick={() => navigate(`/admin/promotion/view`)}
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
          <div className="relative flex flex-col bg-white w-[360px] h-[270px] p-6 rounded-lg justify-center items-center">
            {/* Close Button */}
            <img
              src={vectorClose}
              alt="Close"
              className="absolute top-4 right-4 cursor-pointer"
              onClick={handleDeleteCancel}
            />

            {/* Modal Content */}
            <div className="flex mb-4 flex-col items-center">
              <img src={vectorAlert} alt="Alert" className="mr-2" />
              <span className="text-lg">ยืนยันการลบรายการ?</span>
            </div>
            <div className="mb-4">
              คุณต้องการลบรายการ ‘{itemToDelete ? itemToDelete.code : ""}’
              ใช่หรือไม่
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDeleteConfirm}
                className="bg-[#336DF2] text-white py-2 px-4 rounded-md"
                style={{ padding: "10px 24px", borderRadius: "8px" }}
              >
                ลบรายการ
              </button>
              <button
                onClick={handleDeleteCancel}
                className="bg-white text-[#336DF2] py-2 px-4 rounded-md border border-[#336DF2]"
                style={{ padding: "10px 24px", borderRadius: "8px" }}
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

export default AdminPromotion;
