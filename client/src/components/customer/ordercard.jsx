import * as React from "react";
import person2 from "../../assets/icons/person2-icon.png";
import event from "../../assets/icons/event-icon.png";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActions, Box } from "@mui/material";
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

  const handleClick = (path) => {
    navigate(path);
  };

  const categoryStyle = categoryStyles[orderDetail.status.trim()] || {};
  // console.log(orderDetail.status);

  return (
    <div className=" w-full bg-white border-solid border-[1px] border-[#D8D8D8] rounded-[8px] flex flex-col px-[24px] py-[16px]  mb-[16px] overflow-hidden">
      <div className="flex flex-col">
        <div className="pt-[12px] pb-[6px] flex flex-col sm:flex-row justify-between">
          <p className="text-[18px] sm:text-[20px] font-medium text-black">
            คำสังการซ่อมรหัส : {orderDetail.order_code}
          </p>
          <div className="flex flex-row items-center">
            <p className="text-[14px]  pr-4">สถานะ:</p>
            <p
              className="text-[14px] text-gray-900 border rounded-[15px]  p-1 px-3 ml-1"
              style={{
                backgroundColor: categoryStyle.backgroundColor,
                color: categoryStyle.color,
              }}
            >
              {orderDetail.status}
            </p>
          </div>
        </div>
        <div className="  flex flex-col sm:flex-row justify-between">
          <div className="flex flex-col pt-[16px] ">
            <div className="flex flex-row">
              <img src={event} alt="event" className="mr-1 h-5" />
              <p className="text-[14px] text-gray-700">
                วันเวลาดำเนินการ: {orderDetail.order_date} เวลา{" "}
                {orderDetail.time.slice(0, 5)} น.
              </p>
            </div>

            <div className="flex flex-row pt-1">
              <img src={person2} alt="person" className="mr-1 h-5" />
              <p className="text-[14px] text-gray-700">
                พนักงาน: {orderDetail.fullName}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <p className="text-[14px] pt-[7px] md:pt-0 text-gray-700">
              ราคารวม:
            </p>
            <p className="text-[18px] pt-[5px] text-gray-950 pl-4 ">
              {orderDetail.total_amount} ฿
            </p>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col  justify-start">
          <p className=" text-[14px] pt-[5px] md:pt-[20px] text-gray-700">
            รายการ:{" "}
          </p>
          <p className="text-[14px] pt-[5px] text-black">
            • {orderDetail.service_lists}, จำนวน{" "}
            {orderDetail.quantity_per_order} บริการ
          </p>
        </div>
        <button className="w-fit p-2 mt-2  bg-blue-600 px-6 rounded-[10px] text-white md:ml-auto md:mt-[-40px]">
          ดูรายละเอียด
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
