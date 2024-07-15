import React from "react";
import CustomerAccount from "./CustomerAccount";
import person2 from "../../assets/icons/person2-icon.png";
import event from "../../assets/icons/event-icon.png";

const ServiceListBody = () => {
  return (
    <body className="bg-[#F3F4F6]">
      <div className="flex">
        <div className="container h-full mx-auto relative z-10 flex flex-col pt-4 md:pt-7 gap-4 md:px-20 md:gap-8 md:flex-row">
          <CustomerAccount />
          {/* show on mobile */}
          <div className="sm:hidden flex justify-center items-center mx-4 mt-[120px]  p-4 rounded-[5px]  bg-blue-600 ">
            <div className="">
              <a
                href="/"
                className="font-medium text-white text-[20px] rounded-lg sm:text-[32px] "
              >
                รายการคำสั่งซ่อม
              </a>
            </div>
          </div>
          <div className="w-full h-auto md:basis-3/4 ">
            <div className="w-full bg-white border-solid border-[1px] border-[#D8D8D8] rounded-[8px] flex flex-col px-[24px] py-[16px] overflow-hidden">
              <div className="summary-list flex flex-col">
                <div className="summary-detail pt-[12px] pb-[6px] flex flex-row justify-between">
                  <p className="text-[20px] font-medium text-black">
                    คำสังการซ่อมรหัส : AD04071205
                  </p>
                  <div className="flex flex-row items-center">
                    <p className="text-[14px] text-gray-700 pr-4">สถานะ:</p>
                    <p className="text-[14px] text-gray-900 border bg-[#E6E7EB] rounded-[15px]  p-1 ml-1">
                      รอดำเนินการ
                    </p>
                  </div>
                </div>
                <div className="  flex flex-row justify-between">
                  <div className="flex flex-row">
                    <img src={person2} alt="person" className="mr-1 h-5" />
                    <p className="text-[14px] text-gray-700">
                      วันเวลาดำเนินการ: 25/04/2563 เวลา 13.00 น.
                    </p>
                  </div>
                  <div className="flex flex-row items-center">
                    <p className="text-[14px] text-gray-700">ราคารวม:</p>

                    <p className="text-[18px] text-gray-950 pl-4 ">
                      1,550.00 ฿
                    </p>
                  </div>
                </div>
                <div className="flex flex-row">
                  <img src={event} alt="event" className="mr-1 h-5" />
                  <p className="text-[14px] text-gray-700">
                    พนักงาน: สมาน เยี่ยมยอด
                  </p>
                </div>
                <p className="text-[16px] pt-[20px] text-gray-700">รายการ: </p>
                <div className="flex flex-row justify-between">
                  <p className="text-[14px] pt-[20px] text-black">
                    • ล้างแอร์ 9,000 - 18,000 BTU, ติดผนัง 2 เครื่อง
                  </p>
                  <button className="bg-blue-600 px-6 rounded-[10px] text-white">
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default ServiceListBody;
