import * as React from "react";
import person2 from "../../assets/icons/person2-icon.png";
import event from "../../assets/icons/event-icon.png";

import { useNavigate } from "react-router-dom";

const categoryStyles = {
  รอดำเนินการ: {
    backgroundColor: "#E6E7EB",
    color: "#323640",
  },
  กำลังดำเนินการ: {
    backgroundColor: "#FFF3D4",
    color: "#323640",
  },
  ดำเนินการสำเร็จ: {
    backgroundColor: "#DFF9F6",
    color: "#00596C",
  },
};

const OrderCard = ({ orderDetail }) => {
  const navigate = useNavigate();
  const [showTest, setShowTest] = React.useState(false);

  const handleClick = (path) => {
    navigate(path);
  };

  const handleDetailClick = () => {
    setShowTest(!showTest);
  };

  const categoryStyle = categoryStyles[orderDetail.status.trim()] || {};

  return (
    <div className="w-full bg-white border-solid border-[1px] border-[#D8D8D8] rounded-[8px] flex flex-col px-[24px] py-[16px] mb-[16px] overflow-hidden">
      <div className="flex flex-col">
        <div className="pt-[12px] pb-[6px] flex flex-col sm:flex-row justify-between">
          <p className="text-[18px] sm:text-[20px] font-medium text-black">
            คำสังการซ่อมรหัส : {orderDetail.order_code}
          </p>
          <div className="flex flex-row items-center">
            <p className="text-[14px] pr-4">สถานะ:</p>
            <p
              className="text-[14px] text-gray-900 border rounded-[15px] p-1 px-3 ml-1"
              style={{
                backgroundColor: categoryStyle.backgroundColor,
                color: categoryStyle.color,
              }}
            >
              {orderDetail.status}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex flex-col pt-[16px]">
            <div className="flex flex-row">
              <img src={event} alt="event" className="mr-1 h-5" />
              <p className="text-[14px] text-gray-700">
                วันที่ดำเนินการ: {orderDetail.order_date} เวลา{" "}
                {orderDetail.time.slice(0, 5) + " น."}
              </p>
            </div>
            <div className="flex flex-row pt-1">
              <img src={person2} alt="person" className="mr-1 h-5" />
              <p className="text-[14px] text-gray-700">
                พนักงาน: {orderDetail.technician_name}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <p className="text-[14px] pt-[7px] md:pt-0 text-gray-700">
              ราคารวม:
            </p>
            <p className="text-[18px] pt-[5px] text-gray-950 pl-4">
              {orderDetail.total_amount} ฿
            </p>
          </div>
        </div>
        <div className="flex flex-col  justify-start">
          <div className="text-[14px] pt-[5px] md:pt-[20px] text-gray-700">
            รายการ:{" "}
          </div>
          <div>
            {orderDetail.service_lists.map((service, index) => (
              <p key={index} className="text-[14px] pt-[5px] text-black">
                • {service}, จำนวน {orderDetail.quantity_per_order[index] || 0}{" "}
                บริการ
              </p>
            ))}
          </div>
        </div>
        <button
          className="w-fit p-2 mt-2 bg-blue-600 px-6 rounded-[10px] text-white md:ml-auto md:mt-[-40px]"
          onClick={handleDetailClick}
        >
          ดูรายละเอียด
        </button>
        {showTest && (
          <div className="border-t-2 mt-4 ">
            <div className="text-[14px] pt-[5px] mt-2 text-black">
              <div className="flex sm:flex-row flex-col  ">
                <div className="pt-1">ที่อยู่ {orderDetail.ad_detail}</div>
                <div className="pt-1 pl-0 sm:pl-1">
                  แขวง {orderDetail.ad_district}
                </div>
                <div className="pt-1 pl-0 sm:pl-1">
                  เขต {orderDetail.ad_subdistrict}
                </div>
                <div className="pt-1 pl-0 sm:pl-1">
                  จังหวัด {orderDetail.ad_province}
                </div>
              </div>
              <div className="pt-1">
                รายละเอียดเพิ่มเติม {orderDetail.ad_moredetail}
              </div>
              <div className="pt-1">
                รหัสโปรโมชั่น{" "}
                {orderDetail.promotion_code ? orderDetail.promotion_code : "-"}
              </div>
              <div>
                วันที่ดำเนินการสำเร็จ{" "}
                {orderDetail.finish_date
                  ? orderDetail.finish_date + " เวลา "
                  : " "}
                {orderDetail.finish_time
                  ? orderDetail.finish_time.slice(0, 5) + " น."
                  : "-"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
