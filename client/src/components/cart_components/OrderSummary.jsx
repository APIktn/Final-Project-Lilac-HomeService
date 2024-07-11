function OrderSummary() {
  return (
    <div className="container w-full h-[179px] bg-white border-solid border-[1px] border-[#D8D8D8] rounded-[8px] flex flex-col px-[24px] py-[16px] sticky bottom-0 md:basis-1/3">
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
  );
}

export default OrderSummary;
