import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Bill from "./forms/Bill";
import { useNavigate } from "react-router-dom";

function PaymentSuccess({ billInfo }) {
  const navigate = useNavigate();
  return (
    <div className="background w-full h-screen pt-[40px] px-4 md:pt-[52px] bg-[#F3F4F6]">
      <div className="detail-container h-auto max-w-[542px] bg-white border-solid border-[1px] border-[#CCD0D7] rounded-lg px-[16px] py-[40px] md:py-[48px] md:px-[60px] mx-auto flex flex-col items-center gap-4 md:gap-0">
        <div className="icon-container bg-[#00596C] w-[64px] h-[64px] rounded-full flex items-center justify-center">
          <CheckRoundedIcon sx={{ fontSize: 50, color: "#FFFF" }} />
        </div>
        <div className="status-container md:mt-[23px] md:mb-[38px]">
          <p className="font-prompt font-[500] text-[#001C59] md:text-[#232630] text-[20px] md:text-[32px]">
            ชำระเงินเรียบร้อย !
          </p>
        </div>
        <div className="bill-detail-container w-full mt-2 flex flex-col gap-[24px] md:gap-[26px]">
          <Bill billInfo={billInfo} />
          <button
            className="h-[44px] bg-[#336DF2] rounded-lg px-6 py-[10px] font-prompt font-[500] text-white text-[16px]"
            onClick={() => navigate("/CustomerServiceHistory")}
          >
            เช็ครายการซ่อม
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
