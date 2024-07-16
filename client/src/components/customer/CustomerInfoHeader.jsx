import React from "react";

const CustomerInfoHeader = () => {
  return (
    <header className="hidden md:flex justify-center items-center m-4 md:m-0 py-2 md:py-6 rounded-[5px] md:rounded-none bg-blue-600 ">
      <div className="">
        <p className="font-medium text-white text-[20px] rounded-lg sm:text-[32px] ">
          ข้อมูลผู้ใช้งาน
        </p>
      </div>
    </header>
  );
};

export default CustomerInfoHeader;
