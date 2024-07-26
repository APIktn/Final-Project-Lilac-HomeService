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
      <div className=" hidden md:block w-full h-auto">
        <div className="w-full h-auto  bg-white border-solid border-[1px] border-[#D8D8D8] rounded-[8px] flex flex-col px-[24px] py-[16px] overflow-hidden ">
          <p className="pb-[20px] border-solid border-[#CCD0D7] border-b-[1px] text-[20px] text-[#646C80]">
            บัญชี Technician
          </p>
          <div className="flex flex-col ">
            <div className="pt-[16px]">
              <div className="flex items-center mb-2">
                <img src={order} alt="order" className="mr-1 h-8 sm:h-6 " />
                <a
                  href="/technician"
                  className={`text-[16px] p-[12px] ${
                    currentPath === "/technician"
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
                  href="/techinprogress"
                  className={`text-[16px] p-[12px] ${
                    currentPath === "/techinprogress"
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
                  href="/techcompleted"
                  className={`text-[16px] p-[12px] ${
                    currentPath === "/techcompleted"
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

      <div className="block sm:hidden  bg-[#F3F4F6] px-1 py-5">
        <div className="bg-white rounded-[8px]border-[#CCD0D7] border-[1px]">
          <p className="p-[8px] border-solid border-[#CCD0D7] border-b-[1px] text-[20px] text-[#646C80]">
            บัญชี Technician
          </p>
          <div className="flex flex-row items-center  justify-between px-[16px]">
            <div className="flex items-center mb-2">
              <img src={order} alt="order" className="h-[24px]" />
              <a
                href="/technician"
                className={`text-[12px] p-[5px] ${
                  currentPath === "/technician"
                    ? "text-[#1852D6]"
                    : "hover:text-[#9AA1B0]"
                }`}
              >
                รอ
                <br />
                ดำเนินการ
              </a>
            </div>
            <div className="flex items-center mb-2">
              <img src={order} alt="order" className="h-[24px]" />
              <a
                href="/techinprogress"
                className={`text-[12px] p-[5px] ${
                  currentPath === "/techinprogress"
                    ? "text-[#1852D6]"
                    : "hover:text-[#9AA1B0]"
                }`}
              >
                กำลัง
                <br />
                ดำเนินการ
              </a>
            </div>
            <div className="flex items-center mb-2">
              <img src={history} alt="history" className="h-[24px]" />
              <a
                href="/techcompleted"
                className={`text-[12px] p-[5px] ${
                  currentPath === "/techcompleted"
                    ? "text-[#1852D6]"
                    : "hover:text-[#9AA1B0]"
                }`}
              >
                ดำเนินการ
                <br />
                สำเร็จ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerAccount;
