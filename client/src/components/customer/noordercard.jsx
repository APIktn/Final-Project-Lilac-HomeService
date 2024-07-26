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
        <div className="pt-[12px] pb-[6px] flex flex-col sm:flex-row justify-center">
          <p className="text-[18px] sm:text-[20px] font-medium text-black">
            ยังไม่มีรายการในหมวดนี้
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
