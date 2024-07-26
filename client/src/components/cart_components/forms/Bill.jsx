function Bill({ billInfo }) {
  function convertDateFormat(dateString) {
    const monthMap = {
      0: "ม.ค.",
      1: "ก.พ.",
      2: "มี.ค.",
      3: "เม.ย.",
      4: "พ.ค.",
      5: "มิ.ย.",
      6: "ก.ค.",
      7: "ส.ค.",
      8: "ก.ย.",
      9: "ต.ค.",
      10: "พ.ย.",
      11: "ธ.ค.",
    };

    const date = new Date(dateString);
    const day = date.getDate();
    const month = monthMap[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  function convertTimeFormat(timeString) {
    const [hours, minutes] = timeString.split(":");
    return `${hours}.${minutes}`;
  }

  const place = `${billInfo[0].ad_detail} ${billInfo[0].ad_subdistrict} ${billInfo[0].ad_district} ${billInfo[0].ad_province}`;

  return (
    <>
      <div className="flex flex-col">
        {billInfo.map((item, index) => (
          <div
            key={index}
            className="service-summary flex flex-row justify-between"
          >
            <p className="font-prompt font-[400] md:font-[300] text-[14px] text-black">
              {item.service_lists}
            </p>
            <p className="font-prompt font-[400] md:font-[300] text-[14px] text-[#646C80] md:text-black">
              {item.quantity_per_order} รายการ
            </p>
          </div>
        ))}

        <div className="logistics-summary flex flex-col gap-1">
          <hr className="mt-4 mb-4 md:mt-[26px] md:mb-[26px] border-solid border-[1px] border-[#CCD0D7] " />

          <div className="date-container flex flex-row justify-between">
            <p className="font-prompt font-[400] md:font-[300] text-[14px] text-gray-700">
              วันที่
            </p>
            <p className="font-prompt font-[400] md:font-[300] text-[14px] text-black text-end">
              {convertDateFormat(billInfo[0].order_date)}
            </p>
          </div>

          <div className="time-container flex flex-row justify-between">
            <p className="font-prompt font-[400] md:font-[300] text-[14px] text-gray-700">
              เวลา
            </p>
            <p className="font-prompt font-[400] md:font-[300] text-[14px] text-black text-end">
              {convertTimeFormat(billInfo[0].time)} น.
            </p>
          </div>

          <div className="address-container flex flex-row justify-between">
            <p className="font-prompt font-[400] md:font-[300] text-[14px] text-gray-700 basis-1/3">
              สถานที่
            </p>
            <p className="font-prompt font-[400] md:font-[300] text-[14px] text-black basis-2/3 text-end">
              {place}
            </p>
          </div>

          {billInfo[0].ad_moredetail && (
            <div className="more-info-container flex flex-row justify-between">
              <p className="font-prompt font-[400] md:font-[300] text-[14px] text-gray-700 basis-1/3">
                ข้อมูลเพิ่มเติม
              </p>
              <p className="font-prompt font-[400] md:font-[300] text-[14px] text-black basis-2/3 text-end">
                {billInfo[0].ad_moredetail}
              </p>
            </div>
          )}
        </div>
        <hr className="mt-4 mb-4 md:mt-[26px] md:mb-[26px] border-solid border-[1px] border-[#CCD0D7]" />

        <div className=" items-start">
          <div className="net-value-section flex flex-row justify-between">
            <p className="text-[16px] font-[400] md:font-[300] font-prompt text-gray-700">
              รวม
            </p>
            <p className="text-[16px] font-prompt font-[500] md:font-[600] text-black">
              {billInfo[0].total_amount} ฿
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bill;
