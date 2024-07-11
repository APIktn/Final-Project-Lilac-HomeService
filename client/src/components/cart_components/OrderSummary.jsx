import React from "react";

function OrderSummary() {
  return (
    <div className="w-full h-auto md:basis-1/3 border-solid border-purple-500 border-[2px]">
      <div className="md:sticky md:top-0 bg-white border-solid border-[1px] border-[#D8D8D8] rounded-[8px] flex flex-col px-[24px] py-[16px]">
        <p>สรุปรายการ</p>
        <div className="summary-list flex flex-col">
          <div className="summary-detail border-solid border-b-[1px] pt-[16px] pb-[24px] flex flex-row justify-between">
            <p className="text-[14px]">9,000 - 18,000 BTU, แบบติดผนัง</p>
            <p className="text-[14px]">2 รายการ</p>
          </div>
          <div className="net-value pt-[24px] flex flex-row justify-between">
            <p className="text-[14px]">รวม</p>
            <p className="text-[14px]">1,600 ฿</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
