import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/cartContext";
import axios from "axios";

function OrderSummary({ summaryOrder, service_name }) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const {
    activeStep,
    netPrice,
    setNetPrice,
    logisticsInfo,
    setOrder,
    order,
    discountPrice,
    setDiscountPrice,
    promoCode,
  } = useContext(CartContext);

  const showPromoCode = (netPrice - discountPrice).toFixed(2);

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
  const serviceInfo = summaryData.map((item) => ({
    service_name: item.name,
    service_amount: item.count,
  }));

  const fetchNetPrice = async (summaryData, service_name) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/cart/${service_name}`,
        { summaryData }
      );
      await setNetPrice(response.data.netPrice);
      setDiscountPrice(response.data.netPrice);
    } catch (error) {
      console.error("Error fetching net price from server", error);
    }
  };

  useEffect(() => {
    if (summaryOrder.length > 0) {
      fetchNetPrice(summaryData, service_name);
      setOrder({ serviceInfo });
    } else {
      setNetPrice(0);
    }
  }, [summaryOrder]);

  if (!summaryOrder || !summaryOrder[0]) {
    return (
      <div className="w-full md:basis-1/3 ">
        <div className="fixed bottom-[72px] left-0 lg:sticky lg:top-16 w-full bg-white border-solid border-[1px] border-[#D8D8D8] rounded-t-[8px] md:rounded-[8px] flex flex-col overflow-hidden z-20">
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
              <p className="font-prompt font-[500] text-[16px] md:font-[400] md:text-[20px] text-gray-700">
                สรุปรายการ
              </p>
            </AccordionSummary>
            <AccordionDetails>
              <hr className="mt-[8px] mb-[8px] border-solid border-[1px] border-gray-300" />
            </AccordionDetails>
          </Accordion>
          <div className="px-[16px] pb-[16px] items-start">
            <div className="net-value-section flex flex-row justify-between">
              <p className="text-[16px] font-[400] font-prompt text-gray-700">
                รวม
              </p>
              <p className="text-[16px] font-prompt font-[500] text-black">
                0 ฿
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full md:basis-1/3 ">
      <div className="fixed bottom-[72px] left-0 md:sticky md:top-16 w-full bg-white border-solid border-[1px] border-[#D8D8D8] rounded-t-[8px] md:rounded-[8px] flex flex-col overflow-hidden z-20">
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
            <p className="font-prompt font-[500] text-[16px] md:font-[400] md:text-[20px] text-gray-700">
              สรุปรายการ
            </p>
          </AccordionSummary>
          <AccordionDetails>
            {summaryData.map((item, index) => (
              <div
                key={index}
                className="service-summary flex flex-row justify-between"
              >
                <p className="font-prompt font-[400] md:font-[300] text-[14px] text-black basis-3/5">
                  {item.name}
                </p>
                <p className="font-prompt font-[400] md:font-[300] text-[14px] text-[#646C80] text-end basis-2/5">
                  {item.count} รายการ
                </p>
              </div>
            ))}
            {activeStep === 2 && (
              <div className="logistics-summary flex flex-col gap-1">
                <hr className="mt-6 mb-6 border-solid border-[1px] border-[#CCD0D7] " />
                <div className="date-container flex flex-row justify-between">
                  <p className="font-prompt font-[400] md:font-[300] text-[14px] text-gray-700">
                    วันที่
                  </p>
                  <p className="font-prompt font-[400] md:font-[300] text-[14px] text-black text-end">
                    {logisticsInfo.date}
                  </p>
                </div>
                <div className="time-container flex flex-row justify-between">
                  <p className="font-prompt font-[400] md:font-[300] text-[14px] text-gray-700">
                    เวลา
                  </p>
                  <p className="font-prompt font-[400] md:font-[300] text-[14px] text-black text-end">{`${logisticsInfo.time} น.`}</p>
                </div>
                <div className="address-container flex flex-row justify-between">
                  <p className="font-prompt font-[400] md:font-[300] text-[14px] text-gray-700 basis-1/2">
                    สถานที่
                  </p>
                  <p className="font-prompt font-[400] md:font-[300] text-[14px] text-black basis-1/2 text-end">
                    {logisticsInfo.place}
                  </p>
                </div>
                {logisticsInfo.moreInfos && (
                  <div className="more-info-container flex flex-row justify-between">
                    <p className="font-prompt font-[400] md:font-[300] text-[14px] text-gray-700 basis-1/2">
                      ข้อมูลเพิ่มเติม
                    </p>
                    <p className="font-prompt font-[400] md:font-[300] text-[14px] text-black basis-1/2 text-end">
                      {logisticsInfo.moreInfos}
                    </p>
                  </div>
                )}
              </div>
            )}
            <hr className="mt-6 mb-[8px] border-solid border-[1px] border-[#CCD0D7]" />
          </AccordionDetails>
        </Accordion>
        <div className="px-[16px] pb-[16px] items-start gap-1">
          {showPromoCode > 0 && (
            <div className="more-info-container flex flex-row justify-between">
              <p className="font-prompt font-[400] md:font-[300] text-[14px] text-gray-700 basis-1/2">
                Promotion Code
              </p>
              <p className="font-prompt font-[400] md:font-[300] text-[14px] text-[#C82438] basis-1/2 text-end">
                {`-${showPromoCode} ฿`}
              </p>
            </div>
          )}
          <div className="net-value-section flex flex-row justify-between">
            <p className="text-[16px] font-[400] font-prompt text-gray-700">
              รวม
            </p>
            <p className="text-[16px] font-prompt font-[500] md:font-[600] text-black">
              {discountPrice} ฿
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
