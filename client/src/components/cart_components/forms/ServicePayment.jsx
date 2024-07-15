import { TextField } from "@mui/material";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "26.25px",
          "@media (min-width:768px)": {
            fontSize: "35px",
          },
        },
      },
    },
  },
});

function ServicePayment() {
  return (
    <div className="background w-full min-h-full ">
      <div className="container w-full h-auto bg-white border-solid border-[1px] border-[#CCD0D7] rounded-[8px] flex flex-col p-4 md:p-6 md:gap-5">
        <p className="font-[500] text-[18px] md:text-[20px] md:font-[400] text-[#646C80]">
          ชำระเงิน
        </p>
        <form className="form-container flex flex-col py-2 gap-6">
          <ThemeProvider theme={theme}>
            <div className="payment-selection-container flex gap-4 md:flex-row">
              <button className="group promptpay-button h-[95px] md:h-[86px] border-solid border-[1px] border-[#CCD0D7] rounded-[5px] flex flex-col justify-center items-center basis-1/2 font-prompt font-[500] md:font-[600] text-[16px] md:text-[14px] text-[#4B5160] hover:bg-[#E7EEFF] hover:border-[#336DF2] hover:text-[#336DF2] focus:bg-[#E7EEFF] focus:border-[#336DF2] focus:text-[#336DF2]">
                <QrCode2OutlinedIcon className="text-[#B3B8C4] group-hover:text-current group-focus:text-current" />
                พร้อมเพย์
              </button>

              <button className="group credit-card-button h-[95px] md:h-[86px] border-solid border-[1px] border-[#CCD0D7] rounded-[5px] flex flex-col justify-center items-center basis-1/2 font-prompt font-[500] md:font-[600] text-[16px] md:text-[14px] text-[#4B5160] focus:bg-[#E7EEFF] focus:border-[#336DF2] focus:text-[#336DF2] hover:bg-[#E7EEFF] hover:border-[#336DF2] hover:text-[#336DF2]">
                <CreditCardOutlinedIcon className="text-[#B3B8C4] group-hover:text-current group-focus:text-current" />
                บัตรเครดิต
              </button>
            </div>
          </ThemeProvider>
          <div className="credit-form-container flex flex-col gap-6">
            <div className="card-number-container flex flex-col gap-1">
              <label className="text-[16px] font-[500]">
                หมายเลขบัตรเครดิต
              </label>
              <TextField
                fullWidth
                label="กรุณากรอกหมายเลขบัตรเครดิต"
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "16px",
                    fontFamily: "Prompt",
                    fontWeight: 400,
                    height: 44,
                    border: "1px solid #CCD0D7",
                    borderRadius: "10px",
                    alignItems: "center",
                  },
                  "& .MuiInputBase-root.Mui-focused": {
                    fontSize: "16px",
                    fontFamily: "Prompt",
                    fontWeight: 500,
                    height: 44,
                    border: "1px solid #CCD0D7",
                    borderRadius: "10px",
                    alignItems: "center",
                    labelhidden: true,
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "16px",
                    fontWeight: 400,
                    fontFamily: "Prompt",
                    color: "#646C80",
                    marginTop: "-5px",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "20px",
                    fontWeight: 100,
                    color: "#AAAAAA",
                    marginRight: 0.5,
                  },
                }}
              />
            </div>

            <div className="name-container flex flex-col gap-1">
              <label className="text-[16px] font-[500]">ชื่อบนบัตร</label>
              <TextField
                fullWidth
                label="กรุณากรอกชื่อบนบัตร"
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "16px",
                    fontFamily: "Prompt",
                    fontWeight: 400,
                    height: 44,
                    border: "1px solid #CCD0D7",
                    borderRadius: "10px",
                    alignItems: "center",
                  },
                  "& .MuiInputBase-root.Mui-focused": {
                    fontSize: "16px",
                    fontFamily: "Prompt",
                    fontWeight: 500,
                    height: 44,
                    border: "1px solid #CCD0D7",
                    borderRadius: "10px",
                    alignItems: "center",
                    labelhidden: true,
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "16px",
                    fontWeight: 400,
                    fontFamily: "Prompt",
                    color: "#646C80",
                    marginTop: "-5px",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "20px",
                    fontWeight: 100,
                    color: "#AAAAAA",
                    marginRight: 0.5,
                  },
                }}
              />
            </div>

            <div className="exp-container flex flex-col gap-1">
              <label className="text-[16px] font-[500]">วันหมดอายุ</label>
              <TextField
                fullWidth
                label="MM/YY"
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "16px",
                    fontFamily: "Prompt",
                    fontWeight: 400,
                    height: 44,
                    border: "1px solid #CCD0D7",
                    borderRadius: "10px",
                    alignItems: "center",
                  },
                  "& .MuiInputBase-root.Mui-focused": {
                    fontSize: "16px",
                    fontFamily: "Prompt",
                    fontWeight: 500,
                    height: 44,
                    border: "1px solid #CCD0D7",
                    borderRadius: "10px",
                    alignItems: "center",
                    labelhidden: true,
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "16px",
                    fontWeight: 400,
                    fontFamily: "Prompt",
                    color: "#646C80",
                    marginTop: "-5px",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "20px",
                    fontWeight: 100,
                    color: "#AAAAAA",
                    marginRight: 0.5,
                  },
                }}
              />
            </div>

            <div className="cvc/cvv-container flex flex-col gap-1">
              <label className="text-[16px] font-[500]">รหัส CVC / CVV</label>
              <TextField
                fullWidth
                label="xxx"
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: "16px",
                    fontFamily: "Prompt",
                    fontWeight: 400,
                    height: 44,
                    border: "1px solid #CCD0D7",
                    borderRadius: "10px",
                    alignItems: "center",
                  },
                  "& .MuiInputBase-root.Mui-focused": {
                    fontSize: "16px",
                    fontFamily: "Prompt",
                    fontWeight: 500,
                    height: 44,
                    border: "1px solid #CCD0D7",
                    borderRadius: "10px",
                    alignItems: "center",
                    labelhidden: true,
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "16px",
                    fontWeight: 400,
                    fontFamily: "Prompt",
                    color: "#646C80",
                    marginTop: "-5px",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "20px",
                    fontWeight: 100,
                    color: "#AAAAAA",
                    marginRight: 0.5,
                  },
                }}
              />
            </div>

            <hr className="border-solid border-[1px] border-[#CCD0D7] w-full" />
          </div>
          <div className="promotion-code-container flex flex-col gap-6 md:flex-row">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-[16px] font-[500]">Promotion Code</label>
              <div className="input-button-container flex justify-between md:justify-normal items-center w-full gap-4">
                <div className="textfield-container h-[64px] md:h-[44px] basis-2/3 md:basis-1/2">
                  <TextField
                    fullWidth
                    label="กรุณากรอกโค้ดส่วนลด (ถ้ามี)"
                    sx={{
                      "& .MuiInputBase-root": {
                        fontSize: "16px",
                        fontFamily: "Prompt",
                        fontWeight: 400,
                        border: "1px solid #CCD0D7",
                        borderRadius: "10px",
                        alignItems: "center",
                        height: { xs: "64px", md: "44px" },
                      },
                      "& .MuiInputBase-root.Mui-focused": {
                        fontSize: "16px",
                        fontFamily: "Prompt",
                        fontWeight: 500,
                        height: { xs: "64px", md: "44px" },
                        border: "1px solid #CCD0D7",
                        borderRadius: "10px",
                        alignItems: "center",
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: "16px",
                        fontWeight: 400,
                        fontFamily: "Prompt",
                        color: "#646C80",
                        marginTop: "-5px",
                        alignItems: "center",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: "20px",
                        fontWeight: 100,
                        color: "#AAAAAA",
                        marginRight: 0.5,
                      },
                    }}
                  />
                </div>

                <div className="button-container flex justify-start basis-1/3 md:basis-1/2 ">
                  <button className="font-prompt font-[500] text-[16px] text-[#FFFFFF] bg-[#336DF2] rounded-[8px] h-[44px] px-6  md:items-start md:max-w-[90px] md:h-[44px]">
                    ใช้โค้ด
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ServicePayment;
