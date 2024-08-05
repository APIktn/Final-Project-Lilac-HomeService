import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerAccount from "./CustomerAccount";
import editIcon from "../../assets/icons/edit-icon.png";
import cameraIcon from "../../assets/icons/camera-icon.png";
import { ClipLoader } from "react-spinners";
import PasswordChangePopup from "../../components/popup/PasswordChangePopup";
import { validateUpdateProfile } from "../../utils/validators";
import ExclamationIcon from "../../assets/icons/exclamation-icon.svg";
import avatar from "../../assets/images/avatar.webp";

function CustomerInfoBody() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    tel_num: "",
    select_image: "profile_image",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isPasswordPopupOpen, setIsPasswordPopupOpen] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data.user) {
        setUserData(response.data.user);
        setFormData({
          firstname: response.data.user.firstname,
          lastname: response.data.user.lastname,
          email: response.data.user.email,
          tel_num: response.data.user.tel_num,
          select_image: response.data.user.select_image || "profile_image",
        });
        setLoading(false);
      } else {
        setError("ไม่พบข้อมูลผู้ใช้งาน");
        setLoading(false);
      }
    } catch (error) {
      console.error("API Error:", error.response?.data?.error || error.message);
      setError(
        error.response?.data?.error || "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน"
      );
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const errors = validateUpdateProfile({ ...formData, [name]: value });
    setFormError(errors);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setProfileImage(file);
      setFormData({
        ...formData,
        select_image: "upload_image",
      });
    }
  };

  const handleSave = async () => {
    const errors = validateUpdateProfile(formData);
    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      setSubmitLoading(false);
      return;
    }
    setFormError({});
    setSubmitLoading(true);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/user/profile`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("Response from server:", response.data);
      if (
        response.status === 200 &&
        response.data.message === "อัปเดตข้อมูลผู้ใช้สำเร็จ"
      ) {
        setUserData(response.data.data);

        if (profileImage) {
          const uploadData = new FormData();
          uploadData.append("profile_image", profileImage);

          const uploadResponse = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/user/upload-profile-image`,
            uploadData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log("Upload Response from server:", uploadResponse.data);
        }

        setIsEditing(false);
        setSubmitLoading(false);
        window.location.reload();
      } else {
        setError("เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้งาน");
        setSubmitLoading(false);
      }
    } catch (error) {
      console.error("API Error:", error.response?.data?.error || error.message);
      setError(
        error.response?.data?.error ||
          "เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้งาน"
      );
      setSubmitLoading(false);
    }
  };

  const getProfileImageSrc = () => {
    if (profileImagePreview) {
      return profileImagePreview;
    }

    if (formData.select_image === "upload_image" && userData.upload_image) {
      return userData.upload_image;
    }

    if (userData.profile_image) {
      return userData.profile_image;
    }

    return avatar;
  };

  return (
    <div className="bg-[#F3F4F6] px-4 pb-2">
      <div className="md:flex container md:mx-auto md:px-20 md:py-2 justify-between items-start">
        <div className="sticky top-[45px] md:top-[75px] z-40 md:basis-1/4">
          <CustomerAccount />
        </div>
        <div className="md:basis-3/4 md:ml-[32px]">
          <div>
            {loading ? (
              <div className="flex justify-center items-center w-full h-[500px] p-4">
                <ClipLoader size={200} color={"#123abc"} loading={loading} />
              </div>
            ) : (
              <div className="w-full max-w-4xl bg-white rounded-lg mx-0 lg:mx-0 border border-gray-300 shadow-md relative">
                <div className="relative">
                  <div className="bg-blue-600 h-20 rounded-t-lg"></div>
                  <button
                    className="absolute top-0 right-0 p-1 m-2"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <img
                      src={editIcon}
                      alt="Edit"
                      className="h-8 w-8 icon-edit p-1"
                    />
                  </button>

                  <div className="relative flex justify-center lg:justify-start lg:-mb-44 -mb-36">
                    <div
                      className="relative"
                      style={{ top: "50%", transform: "translateY(-50%)" }}
                    >
                      <img
                        className="h-32 w-32 rounded-full lg:ml-10 object-cover border-4 border-white bg-white"
                        src={getProfileImageSrc()}
                        alt="Profile"
                      />
                      {isEditing && (
                        <label className="absolute bottom-0 right-0 mb-2 mr-2 cursor-pointer">
                          <input
                            type="file"
                            name="profile_image"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                          <img
                            src={cameraIcon}
                            alt="Upload"
                            className="h-8 w-8 icon-camera p-1 bg-white rounded-lg"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-8 pt-4 lg:pt-8 mt-16 lg:mt-8">
                  {isEditing ? (
                    <form>
                      <div className="mb-4 lg:mt-12">
                        <label className="block text-sm font-medium text-gray-700">
                          ชื่อ
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleInputChange}
                            placeholder="กรุณากรอกชื่อ"
                            className={`w-full p-2 border ${
                              formError.firstname
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                          />
                          {formError.firstname && (
                            <img
                              src={ExclamationIcon}
                              alt="error"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            />
                          )}
                        </div>
                        {formError.firstname && (
                          <p className="text-red-500 text-xs mt-1">
                            {formError.firstname}
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          นามสกุล
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleInputChange}
                            placeholder="กรุณากรอกนามสกุล"
                            className={`w-full p-2 border ${
                              formError.lastname
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                          />
                          {formError.lastname && (
                            <img
                              src={ExclamationIcon}
                              alt="error"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            />
                          )}
                        </div>
                        {formError.lastname && (
                          <p className="text-red-500 text-xs mt-1">
                            {formError.lastname}
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          อีเมล
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="กรุณากรอกอีเมล"
                            className={`w-full p-2 border ${
                              formError.email
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                          />
                          {formError.email && (
                            <img
                              src={ExclamationIcon}
                              alt="error"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            />
                          )}
                        </div>
                        {formError.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {formError.email}
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          เบอร์โทรศัพท์
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="tel_num"
                            value={formData.tel_num}
                            onChange={handleInputChange}
                            placeholder="กรุณากรอกเบอร์โทรศัพท์"
                            className={`w-full p-2 border ${
                              formError.tel_num
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                          />
                          {formError.tel_num && (
                            <img
                              src={ExclamationIcon}
                              alt="error"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            />
                          )}
                        </div>
                        {formError.tel_num && (
                          <p className="text-red-500 text-xs mt-1">
                            {formError.tel_num}
                          </p>
                        )}
                      </div>
                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={() => setIsPasswordPopupOpen(true)}
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          เปลี่ยนรหัสผ่าน
                        </button>
                        <button
                          type="button"
                          onClick={handleSave}
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                          disabled={submitLoading}
                        >
                          {submitLoading ? "กำลังบันทึก..." : "บันทึก"}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <h2 className="text-2xl font-medium mb-8 mt-1 lg:text-left text-center text-blue-950 lg:pl-36">
                        {userData.firstname} {userData.lastname}
                      </h2>
                      <div className="flex flex-col lg:flex-row justify-around gap-8 lg:gap-16">
                        <div className="bg-white p-4  relative lg:flex-1">
                          <h1 className="text-lg font-semibold mb-4">
                            ข้อมูลส่วนตัว
                          </h1>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-700">
                              <span className="text-black font-medium">
                                ชื่อ:
                              </span>{" "}
                              {userData.firstname}
                            </p>
                            <p className="text-sm text-gray-700">
                              <span className="text-black font-medium">
                                นามสกุล:
                              </span>{" "}
                              {userData.lastname}
                            </p>
                            <p className="text-sm text-gray-700">
                              <span className="text-black font-medium">
                                อีเมล:
                              </span>{" "}
                              {userData.email}
                            </p>
                            <p className="text-sm text-gray-700">
                              <span className="text-black font-medium">
                                เบอร์โทรศัพท์:
                              </span>{" "}
                              {userData.tel_num}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            {isPasswordPopupOpen && (
              <PasswordChangePopup
                onClose={() => setIsPasswordPopupOpen(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerInfoBody;
