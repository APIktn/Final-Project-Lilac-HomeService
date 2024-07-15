import React, { useState } from "react";

function OrderSummary({ summaryOrder }) {
  const countProducts = (servicesArray) => {
    const counts = servicesArray.reduce((acc, service) => {
      if (!acc[service.service_lists]) {
        acc[service.service_lists] = { count: 0, price: service.price };
      }
      acc[service.service_lists].count += 1;
      return acc;
    }, {});

    const result = Object.keys(counts).map((name) => {
      return {
        name: name,
        count: counts[name].count,
        price: counts[name].price,
      };
    });

    return result;
  };

  const summaryData = countProducts(summaryOrder);

  const summaryPrice = summaryData.reduce(
    (acc, curr) => (acc += curr.price * curr.count),
    0
  );

  if (!summaryOrder || !summaryOrder[0]) {
    return (
      <div className="w-full h-auto md:basis-1/3 ">
        <div className="fixed bottom-[72px] left-0 md:sticky md:top-0 w-full bg-white border-solid border-[1px] border-[#D8D8D8] rounded-[8px] flex flex-col px-[24px] py-[16px] overflow-hidden">
          <p>สรุปรายการ</p>
          <div className="summary-list flex flex-col">
            <div className="summary-detail border-solid border-b-[1px] pt-[16px] pb-[24px] flex flex-row justify-between">
              <p className="text-[14px]"></p>
              <p className="text-[14px]">0 รายการ</p>
            </div>
            <div className="net-value pt-[24px] flex flex-row justify-between">
              <p className="text-[14px]">รวม</p>
              <p className="text-[14px]">0 ฿</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-auto md:basis-1/3 ">
      <div className="fixed bottom-[72px] left-0 md:sticky md:top-0 w-full bg-white border-solid border-[1px] border-[#D8D8D8] rounded-[8px] flex flex-col px-[24px] py-[16px] overflow-hidden">
        <p>สรุปรายการ</p>
        <div className="summary-list flex flex-col">
          {summaryData.map((item) => (
            <div className="summary-detail border-solid border-b-[1px] pt-[16px] pb-[24px] flex flex-row justify-between">
              <p className="text-[14px]">{item.name}</p>
              <p className="text-[14px]">{item.count} รายการ</p>
            </div>
          ))}
          <div className="net-value pt-[24px] flex flex-row justify-between">
            <p className="text-[14px]">รวม</p>
            <p className="text-[14px]">{summaryPrice}฿</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
