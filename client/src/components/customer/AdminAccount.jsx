import React from "react";
import person from "../../assets/icons/person-i.svg";
import order from "../../assets/icons/order-icon.png";
import history from "../../assets/icons/history-icon.png";
import { useLocation } from "react-router-dom";

function CustomerAccount() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    // pc version

    <div>
      {/* <div className=" hidden md:block w-full h-auto md:basis-1/4 "> */}
      <div className="  w-full h-auto">
        <div className="w-full h-auto  bg-white border-solid border-[1px] border-[#D8D8D8] rounded-[8px] flex flex-col px-[24px] py-[16px] overflow-hidden ">
          <p className="pb-[20px] border-solid border-[#CCD0D7] border-b-[1px] text-[20px] text-[#646C80]">
            บัญชี Admin
          </p>
          <div className="flex flex-col">
            <div className="pt-[16px]">
              <div className="flex items-center mb-2">
                <img src={person} alt="person" className="mr-1 h-8 sm:h-6" />
                <a
                  href="/admininfo"
                  className={`text-[16px] p-[12px] ${
                    currentPath === "/admininfo"
                      ? "text-[#1852D6]"
                      : "hover:text-[#9AA1B0]"
                  }`}
                >
                  ข้อมูล Admin
                </a>
              </div>
              <div className="flex items-center mb-2">
                <img src={order} alt="order" className="mr-1 h-8 sm:h-6 " />
                <a
                  href="/pending"
                  className={`text-[16px] p-[12px] ${
                    currentPath === "/pending"
                      ? "text-[#1852D6]"
                      : "hover:text-[#9AA1B0]"
                  }`}
                >
                  รอดำเนินการ
                </a>
              </div>
              <div className="flex items-center mb-2">
                <img src={order} alt="order" className="mr-1 h-8 sm:h-6 " />
                <a
                  href="/inProgress"
                  className={`text-[16px] p-[12px] ${
                    currentPath === "/inProgress"
                      ? "text-[#1852D6]"
                      : "hover:text-[#9AA1B0]"
                  }`}
                >
                  กำลังดำเนินการ
                </a>
              </div>
              <div className="flex items-center mb-2">
                <img src={history} alt="history" className="mr-1 h-8 sm:h-6" />
                <a
                  href="/completed"
                  className={`text-[16px] p-[12px] ${
                    currentPath === "/completed"
                      ? "text-[#1852D6]"
                      : "hover:text-[#9AA1B0]"
                  }`}
                >
                  ดำเนินการสำเร็จ
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* //mobile version */}
      {/* fixed top-[44px] w-full px-[16px] pt-[12px] pb-[8px] z-40  */}

      {/* <div className="block sm:hidden  bg-[#F3F4F6] px-1 py-5">
        <div className="bg-white rounded-[8px]border-[#CCD0D7] border-[1px]">
          <p className="p-[8px] border-solid border-[#CCD0D7] border-b-[1px] text-[20px] text-[#646C80]">
            บัญชีผู้ใช้
          </p>
          <div className="flex flex-row items-center  justify-between px-[16px]">
            <div className="flex items-center mb-2">
              <img src={person} alt="person" className="h-[24px]" />
              <a
                href="/CustomerInfo"
                className={`text-[14px] p-[12px] ${
                  currentPath === "/CustomerInfo"
                    ? "text-[#1852D6]"
                    : "hover:text-[#9AA1B0]"
                }`}
              >
                ข้อมูล
                <br />
                ผู้ใช้งาน
              </a>
            </div>
            <div className="flex items-center mb-2">
              <img src={order} alt="order" className="h-[24px]" />
              <a
                href="/CustomerServiceList"
                className={`text-[14px] p-[12px] ${
                  currentPath === "/CustomerServiceList"
                    ? "text-[#1852D6]"
                    : "hover:text-[#9AA1B0]"
                }`}
              >
                รายการ
                <br />
                คำสั่งซ่อม
              </a>
            </div>
            <div className="flex items-center mb-2">
              <img src={history} alt="history" className="h-[24px]" />
              <a
                href="/CustomerServiceHistory"
                className={`text-[14px] p-[12px] ${
                  currentPath === "/CustomerServiceHistory"
                    ? "text-[#1852D6]"
                    : "hover:text-[#9AA1B0]"
                }`}
              >
                ประวัติ
                <br />
                การซ่อม
              </a>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default CustomerAccount;
