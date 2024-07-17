import React from "react";

const ServiceHistoryHeader = () => {
  return (
    <header className="hidden md:flex justify-center items-center m-4 md:m-0 py-2 md:py-6 rounded-[5px] md:rounded-none bg-blue-600 ">
      <div className="">
        <p className="font-medium text-white text-[20px] rounded-lg sm:text-[32px] ">
          ประวัติการซ่อม
        </p>
      </div>
    </header>
  );
};

export default ServiceHistoryHeader;
