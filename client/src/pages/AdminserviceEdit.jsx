import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { format } from "date-fns";
import dayjs from "dayjs";
import Frame from "../assets/icons/Frame.svg";

function AdminServiceEdit() {
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
  const [categories, setCategories] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const [OriginalServiceList, setOriginalServiceList] = useState([]);
  const { service_name } = useParams();

  const handleCreate = () => {
    setIsCreated(true);
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

  // const handleDeleteConfirm = async () => {
  //   try {
  //     await axios.delete(
  //       `http://localhost:4000/adminservice/${itemToDelete.
  //         service_list_id}`
  //     );
  //     setSubServiceItems((prevItems) =>
  //       prevItems.filter(
  //         (prevItem) => prevItem.
  //         service_list_id !== itemToDelete.
  //         service_list_id
  //       )
  //     );
  //     setShowDeleteModal(false);
  //     setItemToDelete(null);
  //     window.location.href = `/admin/service/view/${service_name}`;
  //   } catch (error) {
  //     console.error("Error deleting:", error);
  //     // Handle error state or notification to the user
  //   }
  // };

  const handleDeleteConfirm = () => {
    setSubServiceItems(
      subServiceItems.filter(
        (item) => item.service_list_id !== itemToDelete.service_list_id
      )
    );
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    setUploadedImage(false);
    setCategoryName(false);
    setSubServiceItems(false);
    servicename(false);
    !setIsEdit();
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

  const getServicesEdit = async (service_name) => {
    try {
      const result = await axios.get(
        `http://localhost:4000/adminservice/${service_name}`
      );

      console.log("Fetched category:", result.data.data[0].service_list);

      setServicename(result.data.data[0].service_name);
      setCategoryName(result.data.data[0].categories.category_name);
      setUploadedImage(result.data.data[0].image);
      setSubServiceItems(result.data.data[0].service_list);
      setOriginalServiceList(result.data.data[0].service_list);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    if (service_name) {
      getServicesEdit(service_name);
    }
  }, [service_name]);

  const getCategories = async () => {
    try {
      const result = await axios.get("http://localhost:4000/categories");
      // console.log("Fetched categories:", result.data.data);
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

    if (!servicename || !servicename.trim()) {
      alert("กรุณากรอกชื่อบริการ");
      return;
    }

    if (!categoryName || !categoryName.trim()) {
      alert("กรุณาเลือกหมวดหมู่");
      return;
    }

    const newErrors = {};

    for (let item of subServiceItems) {
      if (!item) continue;

      const priceStr = String(item.price).trim();
      if (!priceStr) {
        newErrors.price = "กรุณากรอกราคา";
      } else if (!/^\d+(\.\d{1,2})?$/.test(priceStr)) {
        newErrors.price = "กรุณากรอกราคาให้ถูกต้อง";
      }

      const nameStr = String(item.service_lists).trim();
      const unitStr = String(item.units).trim();
      if (!nameStr || !unitStr) {
        alert(
          "กรุณากรอกข้อมูลในฟิลด์ชื่อรายการ, ค่าบริการต่อหน่วย และหน่วยบริการให้ครบถ้วน"
        );
        return;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      alert(newErrors.price);
      return;
    }

    const validSubServiceItems = subServiceItems.filter((item) => {
      return (
        item && String(item.service_lists).trim() && String(item.units).trim()
      );
    });

    if (validSubServiceItems.length === 0) {
      alert("กรุณากรอกข้อมูลที่ถูกต้องในรายการย่อย");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("service_name", servicename);
      formData.append("category_name", categoryName);
      formData.append("image", uploadedImage);

      validSubServiceItems.forEach((item, index) => {
        formData.append(
          `subServiceItems[${index}][name]`,
          String(item.service_lists).trim()
        );
        formData.append(
          `subServiceItems[${index}][price]`,
          String(item.price).trim()
        );
        formData.append(
          `subServiceItems[${index}][unit]`,
          String(item.units).trim()
        );
      });

      const response = await axios.put(
        `http://localhost:4000/adminservice/update/${service_name}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setMessage("อัพเดตข้อมูลสำเร็จ");
        setServicename("");
        setCategoryName("");
        setSubServiceItems([{ service_lists: "", price: "", units: "" }]);
        setUploadedImage(null);
        window.location.href = `/admin/service`;
      }
    } catch (error) {
      console.error("Error updating data", error);
      setMessage("เกิดข้อผิดพลาดในการอัพเดตข้อมูล");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    handleAddSubService();
  }, []);

  return (
    <form id="upload-form" onSubmit={handleSubmit}>
      <div className="flex h-screen ">
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
              <div
                className="flex items-center  p-4 hover:bg-[#022B87] cursor-pointer"
                onClick={() => navigate("/admin/category")}
              >
                <img
                  src={vectorCategory}
                  alt="Category"
                  className="mr-2 ml-2"
                />
                <span className="text-[#F1F1F1] text-base ml-3">หมวดหมู่</span>
              </div>
              <div className="flex items-center  p-4  bg-[#022B87] cursor-pointer">
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
          <div className="flex items-center p-2 hover:bg-[#022B87] cursor-pointer  ml-5 mb-16">
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
          <div className="bg-white p-4 flex justify-between items-center h-[80px] w-[1355px]">
            <div className="flex flex-row -ml-8">
              <img src={Frame} alt="frame" className="ml-10" />
              <div className="ml-5 mt-4">
                <p className="text-[14px] font-normal text-[#646C80]">บริการ</p>
                <p className="text-[20px] font-medium text-[#232630]">
                  {servicename.length > 0 ? servicename : "Loading..."}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6 mr-6">
              <button
                onClick={() => navigate("/admin/service")}
                className="border-[#336DF2] border text-[#336DF2] py-2 px-4 rounded-md w-[112px] h-11"
              >
                ยกเลิก
              </button>
              {isCreated ? (
                <button
                  className="bg-[#336DF2] text-white py-2 px-4 rounded-md w-[112px] h-11 justify-center "
                  onClick={handleSubmit}
                >
                  ยืนยัน
                </button>
              ) : null}
              {!isCreated ? (
                <button
                  className="bg-[#336DF2] text-white py-2 px-4 rounded-md w-[112px] h-11 justify-center"
                  onClick={handleCreate}
                >
                  แก้ไข
                </button>
              ) : null}
            </div>
          </div>

          {/* Workspace */}
          <div className="p-4 pt-8 flex-1 overflow-auto  mx-4 ">
            <div className=" rounded-b-none "></div>
            <div className="bg-white p-4 rounded-t-lg w-[1280px]">
              {/* Form for Uploading Picture for Service */}
              <div className="border-b border-[#CCD0D7] mb-4 pb-4 ">
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
                      className="border border-gray-300  p-2 w-[433px] rounded-lg pl-4"
                    />
                  </div>
                  <div className="flex items-center mb-10 w-[662px] justify-between">
                    <label className="block ml-3 font-medium text-[16px] text-[#646C80]">
                      หมวดหมู่<span className="text-red-500">*</span>
                    </label>
                    <select
                      className="border border-gray-300  p-2 w-[433px] rounded-lg pl-4"
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
                              src={
                                typeof uploadedImage === "string"
                                  ? uploadedImage
                                  : URL.createObjectURL(uploadedImage)
                              }
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
                                <span className="text-[#336DF2]">
                                  อัพโหลดรูปภาพ
                                </span>{" "}
                                หรือ ลากและวางที่นี่
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
              <p className="ml-2 font-normal text-[16px] text-[#646C80]  mt-12">
                รายการบริการย่อย
              </p>
            </div>

            {/* Sub-Service Items */}
            {subServiceItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-md rounded-t-none w-[1280px]"
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
                      className="border border-gray-300 rounded-md p-2 w-full text-[#000000]"
                      value={item.service_lists || ""}
                      onChange={(e) =>
                        setSubServiceItems((prevItems) =>
                          prevItems.map((prevItem, idx) =>
                            idx === index
                              ? { ...prevItem, service_lists: e.target.value }
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
                      className="border border-gray-300 rounded-md p-2 w-full text-[#000000]"
                      value={item.units || ""}
                      onChange={(e) =>
                        setSubServiceItems((prevItems) =>
                          prevItems.map((prevItem, idx) =>
                            idx === index
                              ? { ...prevItem, units: e.target.value }
                              : prevItem
                          )
                        )
                      }
                    />
                  </div>
                  <div className="col-span-3 w-[240px] font-normal text-[16px] text-[#646C80] ">
                    <p className=" mb-2">ค่าบริการ / 1 หน่วย</p>
                    <span className="flex flex-row">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2 w-full text-[#000000]"
                        value={item.price || ""}
                        placeholder="฿"
                        style={{ textAlign: "left" }}
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
                      <span className="text-[18px] mt-2 ml-2">฿</span>
                    </span>
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
            ))}
            <div className=" bg-white p-4 rounded-b-lg">
              <button
                onClick={handleAddSubService}
                className="border-[#336DF2] border text-[#336DF2] py-2 px-4 ml-2 mb-8 rounded-lg  w-[185px] h-11 flex items-center justify-cent text-[16px] font-medium"
                type="button"
              >
                <span className="ml-6">เพิ่มบริการ</span>
                <span className="text-[25px] ml-3">+</span>
              </button>
            </div>
            {isCreated && (
              <div className="flex flex-col gap-7 -mx-[2p3] rounded-t-none mb-4  pb-4 h-[180px] w-[1280px] pt-10 bg-white -mt-1">
                <div className="">
                  <hr className="border-t-2 border-[#CCD0D7] w-[1240px] ml-5 -mt-10 mb-14" />
                  <div className="ml-2">
                    <span className="block ml-5 font-medium text-[16px] text-[#646C80] ">
                      สร้างเมื่อ
                      <span className="ml-[210px] font-normal text-[16px] text-[#000000]">
                        {dayjs().format("DD/MM/YYYY")}{" "}
                        {dayjs().format("HH:mm A")}
                      </span>
                    </span>
                    <span className="block ml-5 font-medium text-[16px] text-[#646C80] pt-7 mb-5 mt-3">
                      แก้ไขล่าสุด
                      <span className="ml-[195px] font-normal text-[16px] text-[#000000]">
                        {dayjs().format("DD/MM/YYYY")}{" "}
                        {dayjs().format("HH:mm A")}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <div className="flex justify-between items-center mb-4 flex-col relative w-[300px] h-[30px] ">
                <img src={vectorAlert} alt="Alert" />
                <img
                  src={vectorClose}
                  alt="Close"
                  className="cursor-pointer absolute -right-5 -top-6"
                  onClick={handleDeleteCancel}
                />
              </div>
              <p className="text-center  text-[20px]">ยืนยันการลบรายการ?</p>
              <p className="text-center text-[16px] text-[#636678]">
                คุณต้องการลบรายการ{" "}
              </p>
              <p className="text-center mb-4 text-[16px] text-[#636678]">
                ' {itemToDelete ? itemToDelete.service_lists : ""} '
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
    </form>
  );
}

export default AdminServiceEdit;
