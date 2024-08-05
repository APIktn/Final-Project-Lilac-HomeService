import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import vectorCategory from "../assets/icons/Vector-category.svg";
import vectorService from "../assets/icons/Vector-service.svg";
import vectorPromotionCode from "../assets/icons/Vector-promotion-code.svg";
import vectorHouse from "../assets/icons/Vector-house.svg";
import vectorLogout from "../assets/icons/Vector-logout.svg";
import vectorBin from "../assets/icons/Vector-bin.svg";
import vectorEdit from "../assets/icons/Vector-edit.svg";
import vectorAlert from "../assets/icons/Vector-alert.svg";
import vectorClose from "../assets/icons/Vector-close.svg";
import axios from "axios";
import { format } from "date-fns";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ClipLoader } from "react-spinners";
import { useAdminAuth } from "../contexts/adminAuthentication";

function AdminPromotionEdit() {
  const [isEdit, setIsEdit] = useState(false);
  const [createPromotion, setCreatePromotion] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { promo_id } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate();
  const [promotion, setPromotion] = useState([]);
  const [promotionName, setPromotionName] = useState("");
  const [loading, setLoading] = useState(true);
  const [createCode, setCreateCode] = useState(false);
  const [promotionType, setPromotionType] = useState("fixed");
  const [promotionFixed, setPromotionFixed] = useState(null); // State for fixed amount
  const [promotionPercent, setPromotionPercent] = useState(); // State for percent amount
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(dayjs());
  const [items, setItems] = useState([]); // Replace with your actual items state
  const [filteredItems, setFilteredItems] = useState([]); // Replace with your actual filtered items state
  const [quota, setQuota] = useState("");
  const { state, logout } = useAdminAuth();
  const { admin } = state;
  const [errors, setErrors] = useState({
    promotionName: false,
    promotionType: false,
    promotionFixed: false,
    promotionPercent: false,
    quota: false,
    expirationDate: false,
    expirationTime: false,
  });

  const handleCreatePromotion = () => {
    const errorsCopy = { ...errors };
    let formValid = true;

    if (!quota || isNaN(quota) || quota <= 0) {
      errorsCopy.quota = true;
      formValid = false;
    } else {
      errorsCopy.quota = false;
    }

    // Validate promotion name
    if (!promotionName.trim()) {
      errorsCopy.promotionName = true;
      formValid = false;
    } else {
      errorsCopy.promotionName = false;
    }

    // Validate promotion type
    if (promotionType === "fixed") {
      if (!promotionFixed || isNaN(promotionFixed) || promotionFixed <= 0) {
        errorsCopy.promotionFixed = true;
        formValid = false;
      } else {
        errorsCopy.promotionFixed = false;
      }
      errorsCopy.promotionPercent = false; // Reset percent error
    } else if (promotionType === "percent") {
      if (
        !promotionPercent ||
        isNaN(promotionPercent) ||
        promotionPercent < 0 ||
        promotionPercent > 100
      ) {
        errorsCopy.promotionPercent = true;
        formValid = false;
      } else {
        errorsCopy.promotionPercent = false;
      }
      errorsCopy.promotionFixed = false; // Reset fixed error
    }

    // Validate expiration date and time
    if (!selectedDate || !selectedTime) {
      errorsCopy.expirationDate = !selectedDate;
      errorsCopy.expirationTime = !selectedTime;
      formValid = false;
    } else {
      errorsCopy.expirationDate = false;
      errorsCopy.expirationTime = false;
    }

    // Set errors state
    setErrors(errorsCopy);

    // If form is valid, proceed with creation
    if (formValid) {
      setCreateCode(true);
    }

    // Validate promotion percent range
    if (promotionType === "percent") {
      if (
        !promotionPercent ||
        isNaN(promotionPercent) ||
        promotionPercent < 0 ||
        promotionPercent > 100
      ) {
        errorsCopy.promotionPercent = true;
        formValid = false;
      } else {
        errorsCopy.promotionPercent = false;
      }
      errorsCopy.promotionFixed = false; // Reset fixed error
    }

    // Set errors state
    setErrors(errorsCopy);

    // If form is valid, proceed with creation
    if (formValid) {
      setCreateCode(true);
    }
  };

  const handleFixedRadioChange = () => {
    setPromotionType("fixed");
    setPromotionPercent(""); // Clear percent amount when fixed is selected
  };

  const handlePercentRadioChange = () => {
    setPromotionType("percent");
    setPromotionFixed(""); // Clear fixed amount when percent is selected
  };

  const handleCreate = () => {
    if (categoryName.trim()) {
      // Pass the new category name back to the parent component for creation
      onCategoryCreate({
        id: Date.now().toString(),
        category: categoryName.trim(),
        created: new Date().toLocaleString(),
        modified: new Date().toLocaleString(),
      });
      // Navigate to the admin dashboard after category creation
      navigate("/admindashboard");
      // Optionally reset the input field
      setCategoryName("");
    } else {
      // Optionally provide feedback if input is empty
      alert("Please enter a category name.");
    }
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

  const getPromotionEdit = async (promo_id) => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/promotion/${promo_id}`
      );

      console.log("Fetched Promotion Code:", result.data.data);

      setPromotion(result.data.data);

      setPromotionName(result.data.data.code);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    if (promo_id) {
      getPromotionEdit(promo_id);
    }
  }, [promo_id]);

  const handleCancel = () => {
    setCreateCode(false);
    !setIsEdit();
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  ////editpromotion
  const promotionCode = async (data) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/promotion/edit/${promo_id}`,
        data
      );

      console.log(data);
      navigate("/admin/promotion");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message;

        if (errorMessage.includes("Expired date cannot be set in the past")) {
          alert(
            "กรุณาตั้งเวลาหมดอายุหลังเวลาจริงอย่างน้อย 5 นาที \n(โค้ดยังไม่ถูกแก้ไขกรุณากดแก้ไขเพื่อแก้ไขใหม่)"
          );
        } else if (
          errorMessage.includes(
            "Percent discount must be between 1 and 100, or null"
          )
        ) {
          alert(
            "กรุณาตั้ง Percent Code ให้อยู่ระหว่าง 1-100 \n(โค้ดยังไม่ถูกแก้ไขกรุณากดแก้ไขเพื่อแก้ไขใหม่)"
          );
        }
        console.error("Error creating promotion code:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      code: promotionName,
      baht_discount: promotionType === "fixed" ? promotionFixed : null,
      percent_discount: promotionType === "percent" ? promotionPercent : null,
      total_code: quota,
      updated_at: dayjs().format(),
      expired_date: dayjs(selectedDate)
        .set("hour", selectedTime.hour())
        .set("minute", selectedTime.minute())
        .format(),
    };

    await promotionCode(formData);

    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="bg-[#001C59] w-[240px] flex flex-col justify-between">
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
            <div
              className="flex items-center  p-4 hover:bg-[#022B87] cursor-pointer"
              onClick={() => navigate("/admin/category")}
            >
              <img src={vectorCategory} alt="Category" className="mr-2 ml-2" />
              <span className="text-[#F1F1F1] text-base ml-3">หมวดหมู่</span>
            </div>
            <div
              className="flex items-center p-4  hover:bg-[#022B87] cursor-pointer"
              onClick={() => navigate("/admin/service")}
            >
              <img src={vectorService} alt="Service" className="mr-2 ml-2" />
              <span className="text-[#F1F1F1] text-base ml-3">บริการ</span>
            </div>
            <div className="flex items-center p-4 bg-[#022B87] cursor-pointer">
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
          <div className="bg-white p-4 flex justify-between items-center">
            <div className="text-lg ml-5">
              <h1 className="text-xs text-[#646C80]">Promotion Code</h1>
              <p>{promotion.code}</p>
            </div>
            {isEdit ? (
              <div className="flex items-center space-x-4">
                <div
                  onClick={handleCancel}
                  className="border-[#336DF2] border text-[#336DF2] py-2 px-4 rounded-md w-[112px] h-11 text-center cursor-pointer"
                >
                  ยกเลิก
                </div>
                {createCode ? (
                  <button
                    className="bg-[#336DF2] text-white py-2 px-4 rounded-md w-[112px] h-11"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    ยืนยัน
                  </button>
                ) : null}

                {!createCode ? (
                  <button
                    className="bg-[#336DF2] text-white py-2 px-4 rounded-md w-[112px] h-11 justify-center"
                    onClick={handleCreatePromotion}
                  >
                    สร้าง
                  </button>
                ) : null}
              </div>
            ) : null}
            {!isEdit ? (
              <div className="flex items-center space-x-4">
                <button
                  className="bg-[#336DF2] text-white py-2 px-4 rounded-md w-[112px] h-11 justify-center"
                  onClick={handleEdit}
                >
                  แก้ไข
                </button>
              </div>
            ) : null}
          </div>

          {/* Workspace */}
          <div className="p-4 pt-8 flex-1 overflow-auto rounded-md shadow-md">
            <div className="rounded-md shadow-md rounded-b-none"></div>
            {isEdit ? (
              <div className="bg-white p-4 pl-8 pt-8 rounded-md shadow-md h-[430px]">
                <div className="flex  mb-7 items-center">
                  <div className="w-[205px]">Promotion Code</div>
                  <input
                    value={promotionName}
                    type="text"
                    className={`w-[433px] border border-[#CCD0D7] p-[10px_16px] rounded-[8px] ${
                      errors.promotionName ? "border-red-500" : ""
                    }`}
                    onChange={(e) => {
                      const transformedCode = transformToUppercase(
                        e.target.value
                      );

                      setPromotionName(transformedCode);
                    }}
                    disabled={!errors.promotionName && createCode === true}
                  />
                  <div className="text-xs ml-5">
                    {errors.promotionName && (
                      <p className="text-red-500 text-xs">
                        กรุณากรอกข้อมูลให้ครบ
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex mb-4">
                  <div className="w-[205px]">ประเภท</div>
                  <div className="mb-7">
                    <div className="flex items-center mr-4 mb-3">
                      <div className="w-[120px]">
                        <input
                          type="radio"
                          name="promotionType"
                          value="fixed"
                          checked={promotionType === "fixed"}
                          onChange={handleFixedRadioChange} // Update handler for Fixed radio
                          className="mr-2"
                          disabled={
                            promotionType !== "fixed" &&
                            !errors.promotionFixed &&
                            createCode === true
                          }
                        />
                        <span
                          className={
                            promotionType === "fixed" ? "text-black" : ""
                          }
                        >
                          Fixed
                        </span>
                      </div>
                      <input
                        type="number"
                        value={promotionFixed}
                        onChange={(e) => setPromotionFixed(e.target.value)}
                        className={`w-[140px] border border-[#CCD0D7] p-[10px_16px] rounded-[8px] ${
                          errors.promotionFixed ? "border-red-500" : ""
                        }`}
                        disabled={
                          promotionType !== "fixed" ||
                          (!errors.promotionFixed && createCode === true)
                        } // Disable input when not selected
                      />
                      <span className="ml-3">฿</span>
                      <div className="ml-5">
                        {errors.promotionFixed && (
                          <p className="text-red-500 text-xs">
                            กรุณากรอกข้อมูลให้ครบ
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center ">
                      <div className="w-[120px]">
                        <input
                          type="radio"
                          name="promotionType"
                          value="percent"
                          checked={promotionType === "percent"}
                          onChange={handlePercentRadioChange} // Update handler for Percent radio
                          className="mr-2"
                          disabled={
                            promotionType !== "percent" &&
                            !errors.promotionPercent &&
                            createCode === true
                          }
                        />
                        <span
                          className={
                            promotionType === "percent" ? "text-black" : ""
                          }
                        >
                          Percent
                        </span>
                      </div>
                      <input
                        type="number"
                        value={promotionPercent}
                        onChange={(e) => setPromotionPercent(e.target.value)}
                        className={`w-[140px] border border-[#CCD0D7] p-[10px_16px] rounded-[8px] ${
                          errors.promotionPercent ? "border-red-500" : ""
                        }`}
                        disabled={
                          promotionType !== "percent" ||
                          (!errors.promotionPercent && createCode === true)
                        } // Disable input when not selected
                      />
                      <span className="ml-3">%</span>
                      <div className="ml-5">
                        {errors.promotionPercent && (
                          <p className="text-red-500 text-xs">
                            {promotionPercent > 100 || promotionPercent < 1
                              ? "กรุณากรอกตัวเลข 1-100 (โค้ดลดสูงสุด 100%)"
                              : "กรุณากรอกข้อมูลให้ครบ"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex mb-7 items-center">
                  <div className="w-[205px]">โควต้าการใช้งาน</div>
                  <input
                    value={quota}
                    type="number"
                    className={`w-[433px] border border-[#CCD0D7] p-[10px_16px] rounded-[8px] ${
                      errors.quota ? "border-red-500" : ""
                    }`}
                    onChange={(e) => setQuota(e.target.value)}
                    disabled={!errors.quota && createCode === true}
                  />
                  <span className="ml-3">ครั้ง</span>
                  <div className="text-xs ml-5">
                    {errors.quota && (
                      <p className="text-red-500">กรุณากรอกข้อมูลให้ครบ</p>
                    )}
                  </div>
                </div>
                <div className="flex mb-4">
                  <div className="w-[205px]">วันหมดอายุ</div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="flex gap-5">
                      <DesktopDatePicker
                        label="กรุณาเลือกวันที่"
                        inputFormat="MM/DD/YYYY"
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        disabled={!errors.promotionName && createCode === true}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            className={`w-[205px]  ${
                              errors.expirationDate ? "border-red-500" : ""
                            }`}
                            InputProps={{
                              endAdornment: (
                                <img
                                  src={vectorDate}
                                  alt="Date"
                                  className="ml-2 cursor-pointer"
                                />
                              ),
                            }}
                          />
                        )}
                      />
                      <DesktopTimePicker
                        label="กรุณาเลือกเวลา"
                        value={selectedTime}
                        onChange={(newValue) => setSelectedTime(newValue)}
                        disabled={!errors.promotionName && createCode === true}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            className={`w-[205px] ml-4 ${
                              errors.expirationTime ? "border-red-500" : ""
                            }`}
                            InputProps={{
                              endAdornment: (
                                <img
                                  src={vectorTime}
                                  alt="Time"
                                  className="ml-2 cursor-pointer"
                                />
                              ),
                            }}
                          />
                        )}
                      />
                    </div>
                  </LocalizationProvider>
                  {(errors.expirationDate || errors.expirationTime) && (
                    <p className="text-red-500">กรุณากรอกข้อมูลให้ครบ</p>
                  )}
                </div>
              </div>
            ) : null}
            {!isEdit ? (
              loading ? (
                <div className="flex justify-center items-center w-full h-[500px]">
                  <ClipLoader size={200} color={"#123abc"} loading={loading} />
                </div>
              ) : (
                <div className="bg-white p-4 rounded-md shadow-md rounded-t-none h-[500px]">
                  <div className="bg-white p-4 rounded-md h-[300px]">
                    <div className="flex items-center ">
                      <div className="w-[205px] text-[#646C80]">
                        Promotion Code
                      </div>
                      <div className="w-[433px] ">{promotionName}</div>
                    </div>
                    <div className="flex items-center mt-[30px]">
                      <div className="w-[205px] text-[#646C80]">ประเภท</div>
                      <div className="w-[433px] ">
                        {promotion.baht_discount ? "Fixed" : "Percent"}
                      </div>
                    </div>
                    <div className="flex items-center mt-[30px]">
                      <div className="w-[205px] text-[#646C80]">ราคาที่ลด</div>
                      <div className="w-[433px] text-red-600">
                        {promotion.baht_discount
                          ? `-${promotion.baht_discount} ฿`
                          : `-${promotion.percent_discount} %`}
                      </div>
                    </div>
                    <div className="flex items-center mt-[30px]">
                      <div className="w-[205px] text-[#646C80]">
                        โควต้าการใช้
                      </div>
                      <div className="w-[433px] ">
                        {promotion.count === null ? (
                          <div className="col-span-2 ">
                            0/{promotion.total_code}
                          </div>
                        ) : (
                          <div className="col-span-2 ">
                            {promotion.count}/{promotion.total_code}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center mt-[30px]">
                      <div className="w-[205px] text-[#646C80]">วันหมดอายุ</div>
                      <div className="w-[433px] ">
                        {dayjs(promotion.expired_date).format(
                          "DD/MM/YYYY HH:mm A"
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-7 border-t border-[#CCD0D7] mb-4 mt-10 pb-4 h-[100px]  pt-10 bg-white">
                      <div className="flex">
                        <div className="w-[205px] text-[#646C80]">
                          สร้างเมื่อ
                        </div>
                        <p>
                          {dayjs(promotion.created_at).format(
                            "DD/MM/YYYY HH:mm A"
                          )}
                        </p>
                      </div>
                      <div className="flex">
                        <div className="w-[205px] text-[#646C80]">
                          แก้ไขล่าสุด
                        </div>
                        <p>
                          {dayjs(promotion.updated_at).format(
                            "DD/MM/YYYY HH:mm A"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : null}
          </div>
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
                คุณต้องการลบรายการ ‘{itemToDelete?.promotionCode}’ ใช่หรือไม่
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
    </form>
  );
}

export default AdminPromotionEdit;
