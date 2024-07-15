import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar_user from "../components/Navbar_user";
import editIcon from "../assets/icons/edit-icon.png"; // import รูป edit icon ที่คุณอัพโหลด

function UserProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/user/profile");
        if (response.data.user) {
          setUserData(response.data.user);
        } else {
          setError("ไม่พบข้อมูลผู้ใช้งาน");
        }
      } catch (error) {
        console.error(
          "API Error:",
          error.response?.data?.error || error.message
        );
        setError(
          error.response?.data?.error || "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน"
        );
      }
    };

    fetchUserData();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    // เพิ่มโค้ดเพื่อบันทึกข้อมูลที่แก้ไข
    setIsEditing(false);
  };

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
              onClick={handleEditToggle}
              className="absolute top-0 right-0 p-1 m-2"
            >
              <img src={editIcon} alt="Edit" className="h-6 w-6 icon-edit" />
            </button>
            <div className="flex justify-center mb-4 relative">
              <img
                className="h-32 w-32 rounded-full object-cover absolute -bottom-16 "
                src={userData.profile_image}
                alt="Profile"
              />
            </div>
          </div>
          <div className="p-8 mt-16">
            <h2 className="text-2xl font-medium mb-8 text-center text-blue-950">
              ข้อมูลผู้ใช้
            </h2>
            {isEditing ? (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    ชื่อ
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                    value={userData.firstname}
                    onChange={(e) =>
                      setUserData({ ...userData, firstname: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    นามสกุล
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                    value={userData.lastname}
                    onChange={(e) =>
                      setUserData({ ...userData, lastname: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                    value={userData.tel_num}
                    onChange={(e) =>
                      setUserData({ ...userData, tel_num: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    อีเมล
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <button
                    onClick={handleSave}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-800"
                  >
                    บันทึกข้อมูล
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-medium mb-6 text-center text-blue-900">
                  {userData.firstname || "N/A"} {userData.lastname || "N/A"}
                </h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    เบอร์โทรศัพท์
                  </label>
                  <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
                    {userData.tel_num || "N/A"}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    อีเมล
                  </label>
                  <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
                    {userData.email || "N/A"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfilePage;
