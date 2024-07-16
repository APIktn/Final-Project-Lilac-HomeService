import React from "react";
import HouseLogo from "../assets/images/HouseLogo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-md w-full sticky top-0 z-50 ">
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
            className="text-blue-600 pt-1 sm:pt-0 text-sm sm:text-2xl  font-medium"
          >
            HomeServices
          </a>
          <div>
            <a
              href="/servicelist"
              className=" pl-[60px] text-black font-normal sm:font-medium text-sm sm:text-base pt-1 hidden sm:block"
            >
              บริการของเรา
            </a>
          </div>
        </div>

        <div className="flex items-center ml-2 sm:ml-4">
          <div>
            <a
              href="/servicelist"
              className="md:hidden pr-[10px] text-black font-normal sm:font-medium text-sm sm:text-base pt-1"
            >
              บริการของเรา
            </a>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 border border-blue-500 px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-medium text-sm sm:text-base"
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
