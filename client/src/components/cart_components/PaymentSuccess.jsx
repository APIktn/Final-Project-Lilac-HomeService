import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Bill from "./forms/Bill";

function PaymentSuccess() {
  return (
    <div className="background w-full h-screen pt-[40px] px-4 md:pt-[52px] bg-[#F3F4F6]">
      <div className="detail-container h-auto max-w-[542px] bg-white border-solid border-[1px] border-[#CCD0D7] rounded-lg px-[32px] py-[16px] md:py-10 md:px-[60px] mx-auto flex flex-col items-center">
        <div className="icon-container bg-[#00596C] w-[64px] h-[64px] rounded-full flex items-center justify-center">
          <CheckRoundedIcon sx={{ fontSize: 50, color: "#FFFF" }} />
        </div>
        <div className="status-container md:mt-[23px]">
          <p className="font-prompt font-[500] text-[#47525D] text-[32px]">
            ชำระเงินเรียบร้อย !
          </p>
        </div>
        <div className="bill-detail-container w-full flex flex-col gap-[26px]">
          <Bill />
          <button className="h-[44px] bg-[#336DF2] rounded-lg px-6 py-[10px] font-prompt font-[500] text-white text-[16px]">
            เช็ครายการซ่อม
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
