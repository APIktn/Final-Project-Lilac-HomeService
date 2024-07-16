import React from "react";
import CustomerAccount from "./CustomerAccount";
import person2 from "../../assets/icons/person2-icon.png";
import event from "../../assets/icons/event-icon.png";

const CustomerInfoBody = () => {
  return (
    <body className="bg-[#F3F4F6] px-4">
      <div className="md:flex container md:mx-auto md:px-20 md:py-2 justify-between items-start  ">
        <div className="sticky top-[45px] md:top-[75px] z-40 md:basis-1/4  ">
          <CustomerAccount />
        </div>
        <div className="md:basis-3/4 md:ml-[32px]">
          {/* show on mobile */}
          <div className=" sm:hidden flex justify-center items-center mx-4 mb-4  p-4 rounded-[5px]  bg-blue-600 ">
            {/* show on mobile */}
            <div className="">
              <a className="font-medium text-white text-[20px] rounded-lg sm:text-[32px] ">
                ข้อมูลผู้ใช้งาน
              </a>
            </div>
          </div>
          <div className="  ">
            <div>
              <div>
                {/* เริ่มต้นcard */}
                <div className=" w-full bg-white border-solid border-[1px] border-[#D8D8D8] rounded-[8px] flex flex-col px-[24px] py-[16px] mb-[16px] overflow-hidden">
                  <div>รายละเอียดผู้ใช้งาน</div>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                </div>
                {/* สิ้นสุด card */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default CustomerInfoBody;
