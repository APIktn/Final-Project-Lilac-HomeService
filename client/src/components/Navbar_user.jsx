import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import HouseLogo from "../assets/images/HouseLogo.png";
import avatar from "../assets/images/avatar.webp";
import bell from "../assets/icons/bell-icon.png";
import person from "../assets/icons/person-icon.png";
import order from "../assets/icons/order-icon.png";
import history from "../assets/icons/history-icon.png";
import logout1 from "../assets/icons/logout-icon.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";
import vectorClose from "../assets/icons/Vector-close.svg";
const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  fontFamily: "Prompt",
}));

const Navbar_user = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [originalPromotionCode, setOriginalPromotionCode] = useState([]);
  const [showPromotionCode, setShowPromotionCode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
    getPromotionCode();
  }, []);

  const getPromotionCode = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/promotion/active`);
      console.log("Fetched promotion codes:", result.data.data);
      setOriginalPromotionCode(result.data.data);
    } catch (error) {
      console.error("Error fetching promotion codes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeClick = () => {
    setShowPromotionCode(true);
  };

  const handleCodeCancel = () => {
    setShowPromotionCode(false);
  };

  const handleCopy = (item) => {
    navigator.clipboard.writeText(item.code).then(() => {
      alert("คัดลอก Promotion code ✅ เลือกบริการจาก HomeServices ได้เลย🧑🏻‍🔧");
    });
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const { logout } = useAuth();

  const getAvatarSrc = () => {
    if (profileImagePreview) {
      return profileImagePreview;
    }

    if (userData) {
      if (userData.select_image === "upload_image" && userData.upload_image) {
        return userData.upload_image;
      }

      if (userData.profile_image) {
        return userData.profile_image;
      }
    }
    return avatar;
  };

  return (
    <nav className="bg-white shadow-md w-full sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-20 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <a href="/">
            <img
              src={HouseLogo}
              alt="HomeServices Logo"
              className="h-6 sm:h-8"
            />
          </a>
          <a
            href="/"
            className="text-blue-600  text-sm sm:text-2xl  font-medium"
          >
            HomeServices
          </a>

          <a
            href="/servicelist"
            className=" pl-[60px] text-black font-normal sm:font-medium text-sm sm:text-base pt-1 hidden sm:block"
          >
            บริการของเรา
          </a>
        </div>
        <div className="flex items-center ml-2 sm:ml-4">
          {userData && (
            <>
              <span className="text-gray-700 text-sm font-normal mt-1 hidden sm:block">
                {userData.role === "admin" && "admin "}
                {userData.firstname} {userData.lastname}
                <span style={{ marginLeft: "5px" }}></span>
              </span>
              <button className="mr-2" onClick={handleAvatarClick}>
                <img
                  src={getAvatarSrc()}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = avatar;
                  }}
                  alt="avatar"
                  className="h-8 sm:h-6 rounded-full"
                />
              </button>
            </>
          )}
          <button onClick={handleCodeClick}>
            <img src={bell} alt="bell" className="h-8 sm:h-6" />
          </button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <CustomMenuItem
              onClick={() => handleMenuItemClick("/CustomerInfo")}
            >
              <img src={person} alt="person" className="mr-1 h-8 sm:h-6" />
              ข้อมูลผู้ใช้งาน
            </CustomMenuItem>
            <CustomMenuItem
              onClick={() => handleMenuItemClick("/CustomerServiceList")}
            >
              <img src={order} alt="order" className="mr-1 h-8 sm:h-6" />
              รายการคำสั่งซ่อม
            </CustomMenuItem>
            <CustomMenuItem
              className="border-b-[1px]"
              onClick={() => handleMenuItemClick("/CustomerServiceHistory")}
            >
              <img src={history} alt="history" className=" mr-1 h-8 sm:h-6" />
              ประวัติการซ่อม
            </CustomMenuItem>
            {userData?.role === "admin" && (
              <CustomMenuItem
                className="border-b-[1px]"
                onClick={() => handleMenuItemClick("/admin")}
              >
                <img src={history} alt="admin" className="mr-1 h-8 sm:h-6" />
                Admin Dashboard
              </CustomMenuItem>
            )}
            <hr className="border-t-2 border-gray-300" />
            <CustomMenuItem
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              <img src={logout1} alt="logout" className="mr-1 h-8 sm:h-6" />
              ออกจากระบบ
            </CustomMenuItem>
          </Menu>
        </div>
      </div>
      {/* Get Code */}
      {showPromotionCode && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 pt-4 rounded-2xl shadow-md">
            <div className="flex justify-between items-center mb-4 flex-col relative w-[300px] h-[30px] ">
              <img
                src={vectorClose}
                alt="Close"
                className="cursor-pointer absolute -right-2 -top-2"
                onClick={handleCodeCancel}
              />
            </div>
            <p className="text-center  text-[20px]">Promotion Code 🎉</p>
            <p className="text-center mb-4 text-[16px] text-[#636678]">
              คลิกและเก็บโค้ดส่วนลดได้เลย
            </p>

            {originalPromotionCode.map((item, index) => (
              <div
                key={item.promo_id}
                className="flex justify-center gap-5 items-center border-b-2  text-[16px] text-[#000000] h-[88px]  font-light"
              >
                <div className="flex  col-span-1 items-center justify-center  bg-blue-500 p-1 pl-2 rounded-lg border border-dashed border-blue-600 shadow-md">
                  <div className="relative flex flex-col col-span-1 items-center justify-center  bg-blue-500 p-1 pl-2 rounded-lg border border-dashed border-blue-600 shadow-md">
                    <span className="text-white font-bold">{item.code}</span>
                    <div>
                      {item.count === null ? (
                        <div className="col-span-1 ">0/{item.total_code}</div>
                      ) : (
                        <div className="col-span-1 text-[8px] text-blue-950">
                          ใช้สิทธิแล้ว {item.count}/{item.total_code}
                        </div>
                      )}
                    </div>

                    {/* Left Circular Decoration */}
                    <div className="absolute -left-[7px] top-3 h-5 w-5 bg-white rounded-full transform -translate-x-1/2 z-10"></div>
                  </div>
                  <svg
                    onClick={() => handleCopy(item)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="cursor-pointer ml-2 text-white hover:text-blue-800"
                  >
                    <path
                      fill=""
                      d="M6 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h1v1a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-1V5a3 3 0 0 0-3-3H6Zm9 4h-5a3 3 0 0 0-3 3v7H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1ZM9 19V9a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1Z"
                    ></path>
                  </svg>
                </div>

                <div className="col-span-1  text-red-600 ">
                  <p className="text-blue-950">รับส่วนลดทันที</p>
                  {item.baht_discount
                    ? `${item.baht_discount} ฿`
                    : `${item.percent_discount} %`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar_user;
