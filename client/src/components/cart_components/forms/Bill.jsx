import { useContext } from "react";

function Bill() {
  return (
    <>
      <div className="flex flex-col">
        <div className="service-summary flex flex-row justify-between">
          <p className="font-prompt font-[400] md:font-[300] text-[14px] text-black">
            {}
          </p>
          <p className="font-prompt font-[400] md:font-[300] text-[14px] text-[#646C80]">
            {} รายการ
          </p>
        </div>

        <div className="logistics-summary flex flex-col gap-1">
          <hr className="mt-6 mb-6 border-solid border-[1px] border-[#CCD0D7] " />
          <div className="date-container flex flex-row justify-between">
            <p className="font-prompt font-[400] md:font-[300] text-[14px] text-gray-700">
              วันที่
            </p>
            <p className="font-prompt font-[400] md:font-[300] text-[14px] text-black text-end">
              {}
            </p>
          </div>
          <div className="time-container flex flex-row justify-between">
            <p className="font-prompt font-[400] md:font-[300] text-[14px] text-gray-700">
              เวลา
            </p>
            <p className="font-prompt font-[400] md:font-[300] text-[14px] text-black text-end">{` น.`}</p>
          </div>
          <div className="address-container flex flex-row justify-between">
            <p className="font-prompt font-[400] md:font-[300] text-[14px] text-gray-700 basis-1/2">
              สถานที่
            </p>
            <p className="font-prompt font-[400] md:font-[300] text-[14px] text-black basis-1/2 text-end">
              {}
            </p>
          </div>

          <div className="more-info-container flex flex-row justify-between">
            <p className="font-prompt font-[400] md:font-[300] text-[14px] text-gray-700 basis-1/2">
              ข้อมูลเพิ่มเติม
            </p>
            <p className="font-prompt font-[400] md:font-[300] text-[14px] text-black basis-1/2 text-end">
              {}
            </p>
          </div>
        </div>
        <hr className="mt-6 mb-[8px] border-solid border-[1px] border-[#CCD0D7]" />

        <div className="px-[16px] pb-[16px] items-start">
          <div className="net-value-section flex flex-row justify-between">
            <p className="text-[16px] font-[400] font-prompt text-gray-700">
              รวม
            </p>
            <p className="text-[16px] font-prompt font-[500] md:font-[600] text-black">
              {} ฿
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bill;
