import React from "react";
import person from "../../assets/icons/person-icon.png";
import order from "../../assets/icons/order-icon.png";
import history from "../../assets/icons/history-icon.png";

function CustomerAccount() {
  return (
    // pc version
    <div>
      <div className="hidden md:block w-full h-auto ">
        <div className="fixed top-[170px]   bg-white border-solid border-[1px] border-[#D8D8D8] rounded-[8px] flex flex-col px-[24px] py-[16px] overflow-hidden ">
          <p className="pb-[20px] border-solid border-[#CCD0D7] border-b-[1px] text-[20px] text-[#646C80]">
            บัญชีผู้ใช้
          </p>
          <div className="flex flex-col">
            <div className="pt-[16px]">
              <div className="flex items-center mb-2">
                <img src={person} alt="person" className="mr-1 h-8 sm:h-6" />
                <a
                  href="/"
                  className="text-[16px] p-[12px] hover:text-[#1852D6]"
                >
                  ข้อมูลผู้ใช้งาน
                </a>
              </div>
              <div className="flex items-center mb-2">
                <img src={order} alt="order" className="mr-1 h-8 sm:h-6 " />
                <a
                  href="/"
                  className="text-[16px] p-[12px] hover:text-[#1852D6]"
                >
                  รายการคำสั่งซ่อม
                </a>
              </div>
              <div className="flex items-center mb-2">
                <img src={history} alt="history" className="mr-1 h-8 sm:h-6" />
                <a
                  href="/"
                  className="text-[16px] p-[12px] hover:text-[#1852D6]"
                >
                  ประวัติการซ่อม
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* //mobile version */}
      <div className="block sm:hidden  bg-[#F3F4F6] fixed top-[44px] w-full px-[8px] pt-[12px] pb-[8px] z-40">
        <div className=" bg-white mx-4  rounded-[8px] ">
          <p className="p-[8px] border-solid border-[#CCD0D7] border-b-[1px] text-[20px] text-[#646C80]">
            บัญชีผู้ใช้
          </p>
          <div className="flex flex-row items-center  justify-between px-[16px]">
            <div className="flex items-center mb-2">
              <img src={person} alt="person" className="h-[24px]" />
              <a href="/" className="text-[14px] p-[12px]">
                ข้อมูล
                <br />
                ผู้ใช้งาน
              </a>
            </div>
            <div className="flex items-center mb-2">
              <img src={order} alt="order" className="h-[24px]" />
              <a href="/" className="text-[14px] p-[12px]">
                รายการ
                <br />
                คำสั่งซ่อม
              </a>
            </div>
            <div className="flex items-center mb-2">
              <img src={history} alt="history" className="h-[24px]" />
              <a href="/" className="text-[14px] p-[12px]">
                ประวัติ
                <br />
                การซ่อม
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerAccount;
