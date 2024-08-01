import React from "react";
import home_body from "../assets/images/hpfooter.png";
import house from "../assets/images/house.png";

const Body = () => {
  return (
    <>
      {/* PC Version */}

      <header className="hidden md:block mt-[147px] bg-blue-600 overflow-hidden relative ">
        <div className="flex flex-row">
          <div>
            <img src={home_body} alt="Handy Guy" className="h-[400px] " />
          </div>
          <div className="ml-[131px] mt-[62px] ">
            <h1 className="text-[40px] font-semibold text-white relative z-10">
              <div>มาร่วมเป็นพนักงานซ่อม</div> <div>กับ HomeServices</div>
            </h1>
            <div className="text-white font-normal text-[20px] mt-[25px] relative z-10">
              <div>เข้ารับการฝึกอบรมที่ได้มาตรฐาน ฟรี!</div>
              <div>และยังได้รับค่าตอบแทนที่มากขึ้นกว่าเดิม</div>
            </div>
            <h1 className="text-[32px] font-medium mt-[28px] pb-[55px] text-white relative z-10">
              ติดต่อมาที่อีเมล: job@homeservices.co
            </h1>
          </div>
        </div>
        <img
          src={house}
          alt="House"
          className="absolute bottom-[-19px] right-[-64px] h-[392px] z-1 opacity-20"
        />
      </header>

      {/* Mobile Version */}
      <header className="block sm:hidden bg-blue-600 overflow-hidden relative ">
        <div>
          <img src={home_body} alt="Handy Guy" />
          <div className="mx-[24px] mt-[32px] ">
            <h1 className="text-[32px] font-semibold text-white relative z-10">
              <div>มาร่วมเป็นพนักงานซ่อม</div> <div>กับ HomeServices</div>
            </h1>
            <div className="text-white font-normal text-[16px] mt-[24px] relative z-10">
              <div>เข้ารับการฝึกอบรมที่ได้มาตรฐาน ฟรี!</div>
              <div>และยังได้รับค่าตอบแทนที่มากขึ้นกว่าเดิม</div>
            </div>
            <h1 className="text-[20px] font-medium mt-[24px] pb-[180px] text-white relative z-10 ">
              ติดต่อมาที่อีเมล: job@homeservices.co
            </h1>
          </div>
        </div>
        <img
          src={house}
          alt="House"
          className="absolute bottom-[-19px] right-[-64px] h-[270px] z-1 opacity-20"
        />
      </header>
    </>
  );
};

export default Body;
