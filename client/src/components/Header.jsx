import React from "react";
import PointGuy from "../assets/images/PointGuy.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const handleMenuItemClick = (path) => {
    navigate(path);
  };
  const navigate = useNavigate();
  return (
    <header className="bg-blue-100 overflow-hidden ">
      <div className="container mx-auto px-4 md:px-20 pt-14 grid lg:grid-cols-2  justify-items-stretch items-stretch">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl lg:pt-20 font-bold text-blue-700">
            เรื่องบ้าน...ให้เราช่วยดูแลคุณ
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-black mt-2 lg:mt-4 font-bold">
            “สะดวก ราคาคุ้มค่า เชื่อถือได้”
          </p>
          <p className="text-gray-700 mt-[32px] lg:mt-[39px] text-sm sm:text-base lg:text-lg">
            <div>ซ่อมเครื่องใช้ไฟฟ้า ซ่อมแอร์ ทำความสะอาดบ้าน</div>
            <div>โดยพนักงานแม่บ้าน และช่างมืออาชีพ</div>
          </p>
          <button
            onClick={() => handleMenuItemClick("/servicelist")}
            className="mt-[32px] lg:mt-[39px] px-4 sm:px-6 py-2 bg-blue-600 text-white rounded"
          >
            เช็คราคาบริการ
          </button>
        </div>
        <div className="justify-self-end self-end">
          <img src={PointGuy} alt="Point Guy" className="h-120" />
        </div>
      </div>
    </header>
  );
};

export default Header;
