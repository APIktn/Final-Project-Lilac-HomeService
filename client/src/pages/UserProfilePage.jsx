import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar_user from "../components/Navbar_user";
import editIcon from "../assets/icons/edit-icon.png";

function UserProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    tel_num: "",
    select_image: "profile_image",
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/user/profile");
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
  };

  const handleSave = async () => {
    setSubmitLoading(true);
    try {
      const response = await axios.put(
        "http://localhost:4000/user/profile",
        formData
      );
      console.log("Response from server:", response.data);
      if (
        response.status === 200 &&
        response.data.message === "อัปเดตข้อมูลผู้ใช้สำเร็จ"
      ) {
        setUserData(response.data.data);
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

  if (loading) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>ไม่พบข้อมูลผู้ใช้งาน</div>;
  }

  return (
    <>
      <Navbar_user />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-11/12 max-w-md bg-white rounded-lg border border-gray-300 shadow-md relative">
          <div className="relative">
            <div className="bg-blue-500 h-32 rounded-t-lg"></div>
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

            <div className="flex justify-center mb-4 relative">
              <img
                className="h-32 w-32 rounded-full object-cover absolute -bottom-16 border-4 border-white"
                src={
                  formData.select_image === "profile_image"
                    ? userData.profile_image
                    : userData.upload_image
                }
                alt="Profile"
              />
            </div>
          </div>
          <div className="p-8 mt-16">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="tel_num"
                  value={formData.tel_num}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    เลือกรูปโปรไฟล์
                  </label>
                  <select
                    name="select_image"
                    value={formData.select_image}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="profile_image">รูปโปรไฟล์เริ่มต้น</option>
                    <option value="upload_image">รูปโปรไฟล์ที่อัปโหลด</option>
                  </select>
                </div>
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={submitLoading}
                >
                  {submitLoading ? "กำลังบันทึก..." : "บันทึก"}
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-medium mb-8 text-center text-blue-950">
                  {userData.firstname} {userData.lastname}
                </h2>
                <p>{userData.email}</p>
                <p>{userData.tel_num}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfilePage;
