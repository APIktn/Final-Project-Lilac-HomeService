import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/cartContext";

function OrderSummary({ summaryOrder }) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const { activeStep, netPrice, setNetPrice, logisticsInfo } =
    useContext(CartContext);

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

  // const summaryPrice = summaryData.reduce(
  //   (acc, curr) => (acc += curr.price * curr.count),
  //   0
  // );

  const summaryPrice = function summaryPrice() {
    const net = summaryData.reduce(
      (acc, curr) => (acc += curr.price * curr.count),
      0
    );

    setNetPrice(net);
    return net;
  };

  useEffect(() => {
    summaryPrice();
  }, [summaryData]);

  if (!summaryOrder || !summaryOrder[0]) {
    return (
      <div className="w-full md:basis-1/3 ">
        <div className="fixed bottom-[72px] left-0 md:sticky md:top-14 w-full bg-white border-solid border-[1px] border-[#D8D8D8] rounded-t-[8px] md:rounded-[8px] flex flex-col overflow-hidden z-20">
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
              <div className="service-summary flex flex-row justify-between">
                <p className="text-[14px]"></p>
                <p className="text-[14px]">0 รายการ</p>
              </div>
              <hr className="mt-[8px] mb-[8px] border-solid border-[1px] border-gray-300" />

              <div className="logistics-summary flex flex-col gap-1">
                <div className="date-container flex flex-row justify-between">
                  <p className="text-[14px] text-gray-700"></p>
                  <p className="text-[14px] text-black"></p>
                </div>
                <div className="time-container flex flex-row justify-between">
                  <p className="text-[14px] text-gray-700"></p>
                  <p className="text-[14px] text-black"></p>
                </div>
                <div className="address-container flex flex-row justify-between">
                  <p className="text-[14px] text-gray-700 basis-1/2"></p>
                  <p className="text-[14px] text-black basis-1/2"></p>
                </div>
              </div>
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
            <p className="font-prompt font-[500] text-[16px] md:font-[400] md:text-[20px] text-gray-700">
              สรุปรายการ
            </p>
          </AccordionSummary>
          <AccordionDetails>
            {summaryData.map((item) => (
              <div className="service-summary flex flex-row justify-between">
                <p className="font-prompt font-[400] md:font-[300] text-[14px] text-black">
                  {item.name}
                </p>
                <p className="font-prompt font-[400] md:font-[300] text-[14px] text-[#646C80]">
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
        <div className="px-[16px] pb-[16px] items-start">
          <div className="net-value-section flex flex-row justify-between">
            <p className="text-[16px] font-[400] font-prompt text-gray-700">
              รวม
            </p>
            <p className="text-[16px] font-prompt font-[500] md:font-[600] text-black">
              {netPrice} ฿
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
