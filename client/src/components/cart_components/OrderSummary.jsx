import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function OrderSummary() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div className="w-full md:basis-1/3 ">
      <div className="fixed bottom-[72px] left-0 md:sticky md:top-0 w-full bg-white border-solid border-[1px] border-[#D8D8D8] rounded-t-[8px] md:rounded-[8px] flex flex-col overflow-hidden z-20">
        <Accordion
          disableGutters
          elevation={0}
          defaultExpanded={isMdUp}
          sx={{
            "@media (min-width:768px)": {
              defaultExpanded: "false",
            },
          }}
        >
          <AccordionSummary
            aria-controls="panel1-content"
            id="panel1-header"
            expandIcon={
              <ArrowDropDownOutlinedIcon
                sx={{
                  color: "#323640",
                  "@media (min-width:768px)": {
                    display: "none",
                  },
                }}
              />
            }
          >
            <p className="font-prompt font-[500] text-gray-700">สรุปรายการ</p>
          </AccordionSummary>
          <AccordionDetails>
            <div className="service-summary flex flex-row justify-between">
              <p className="text-[14px]">9,000 - 18,000 BTU, แบบติดผนัง</p>
              <p className="text-[14px]">2 รายการ</p>
            </div>
            <hr className="mt-[8px] mb-[8px] border-solid border-[1px] border-gray-300" />

            <div className="logistics-summary flex flex-col gap-1">
              <div className="date-container flex flex-row justify-between">
                <p className="text-[14px] text-gray-700">วันที่</p>
                <p className="text-[14px] text-black">23 เม.ย. 2022</p>
              </div>
              <div className="time-container flex flex-row justify-between">
                <p className="text-[14px] text-gray-700">เวลา</p>
                <p className="text-[14px] text-black">11.00 น.</p>
              </div>
              <div className="address-container flex flex-row justify-between">
                <p className="text-[14px] text-gray-700 basis-1/2">สถานที่</p>
                <p className="text-[14px] text-black basis-1/2">
                  444/4 คอนโดสุภาลัย เสนานิคม จตุจักร กรุงเทพฯ
                </p>
              </div>
            </div>

            <hr className="mt-[8px] mb-[-8px] border-solid border-[1px] border-gray-300" />
          </AccordionDetails>
        </Accordion>
        <div className="px-[16px] pb-[16px] items-start">
          <div className="net-value-section flex flex-row justify-between">
            <p className="text-[16px] font-[400] font-prompt text-gray-700">
              รวม
            </p>
            <p className="text-[16px] font-prompt font-[500] text-black">
              1,600.00 ฿
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
