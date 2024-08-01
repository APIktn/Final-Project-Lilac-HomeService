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
import { useAdminAuth } from "../contexts/adminAuthentication";

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  fontFamily: "Prompt",
}));

const Navbar_admin = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("technician-token")}`,
          },
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

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

  const { logout } = useAdminAuth();

  const getAvatarSrc = () => {
    if (userData) {
      if (userData.select_image === "upload_image") {
        return userData.upload_image || avatar;
      } else if (userData.select_image === "profile_image") {
        return userData.profile_image || avatar;
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
          <a href="/" className="text-blue-600 text-sm sm:text-2xl font-medium">
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
                <span className="font-bold">Admin :</span> {userData.firstname}{" "}
                {userData.lastname}
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
          <button>
            <img src={bell} alt="bell" className="h-8 sm:h-6" />
          </button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <CustomMenuItem onClick={() => handleMenuItemClick("/admininfo")}>
              <img src={person} alt="person" className="mr-1 h-8 sm:h-6" />
              ข้อมูลผู้ใช้งาน
            </CustomMenuItem>
            <CustomMenuItem onClick={() => handleMenuItemClick("/pending")}>
              <img src={order} alt="order" className="mr-1 h-8 sm:h-6" />
              รายการคำสั่งซ่อม
            </CustomMenuItem>
            <CustomMenuItem
              className="border-b-[1px]"
              onClick={() => handleMenuItemClick("/admin/category")}
            >
              <img src={history} alt="admin" className="mr-1 h-8 sm:h-6" />
              Admin Dashboard
            </CustomMenuItem>
            <hr className="border-t-2 border-gray-300" />
            <CustomMenuItem
              onClick={() => {
                logout();
                navigate("/admin");
              }}
            >
              <img src={logout1} alt="logout" className="mr-1 h-8 sm:h-6" />
              ออกจากระบบ
            </CustomMenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar_admin;
