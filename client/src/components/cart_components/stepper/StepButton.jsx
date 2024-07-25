import React, { useContext, useEffect } from "react";
import { steps } from "./Stepper";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../contexts/cartContext";
import axios from "axios";

export default function StepButtons() {
  const navigate = useNavigate();
  const {
    activeStep,
    setActiveStep,
    netPrice,
    selectedDate,
    selectedTime,
    address,
    moreInfo,
    selectedNames,
    logisticsInfo,
    setLogisticsInfo,
    cartPath,
    order,
    services,
  } = useContext(CartContext);

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

  const getMonthInTh = (compareValue) => {
    const monthTh = monthMap[compareValue];
    return monthTh;
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (selectedDate && selectedTime && address && selectedNames) {
      let addressSummary = {
        date: `${selectedDate.$D} ${getMonthInTh(selectedDate.$M)} ${
          selectedDate.$y
        }`,
        time: `${String(selectedTime.$H).padStart(2, "0")}.${String(
          selectedTime.$m
        ).padStart(2, "0")}`,
        place: `${address} ${selectedNames.tambon} ${selectedNames.amphure} ${selectedNames.province}`,
        moreInfos: moreInfo,
      };

      setLogisticsInfo(addressSummary);
    }

    if (activeStep === 2) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      const serviceId = services[0].service_id;
      const detail = address;
      const date = `${selectedDate.$y}-${String(selectedDate.$M).padStart(
        2,
        "0"
      )}-${String(selectedDate.$D).padStart(2, "0")}`;
      const time = `${String(selectedTime.$H).padStart(2, "0")}:${String(
        selectedTime.$m
      ).padStart(2, "0")}:00`;
      const subdistrict = selectedNames.tambon;
      const district = selectedNames.amphure;
      const province = selectedNames.province;
      const billInfo = {
        serviceId,
        order,
        date: date,
        times: time,
        detail,
        subdistrict,
        district,
        province,
        netPrice,
        moredetail: logisticsInfo.moreInfos,
      };

      try {
        const response = await axios.post(
          `http://localhost:4000/cart/${cartPath}/bill`,
          billInfo
        );
        console.log("Server response:", response.data);
        navigate("/payment-status", {
          state: { orderId: response.data.order_id },
        });
      } catch (error) {
        console.error("Error sending billInfo to server:", error);
      }
    } else if (activeStep < 2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    } else {
      navigate("/servicelist");
    }
  };

  const isDisabled = () => {
    if (activeStep === 0) {
      if (netPrice === 0) {
        return true;
      }
    } else if (activeStep === 1) {
      if (
        !selectedDate ||
        !selectedTime ||
        !address ||
        !selectedNames.province ||
        !selectedNames.amphure ||
        !selectedNames.tambon
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="bottom-navigator w-full h-[72px] md:h-[92px] bg-white border-solid border-[1px] border-t-gray-300 sticky bottom-0 z-10 overflow-hidden">
      <div className="container h-full mx-auto py-2 px-4 md:px-20 gap-4 flex justify-between items-center">
        <button
          className="w-[164px] h-[40px] md:h-[44px] md:text-[16px] font-[500] text-center border-solid border-[1px] border-blue-600 rounded-[8px] text-blue-600 hover:border-[#799FF7] hover:text-[#799FF7] active:border-[#0E3FB0] active:text-[#0E3FB0]"
          onClick={handleBack}
        >
          {"< ย้อนกลับ"}
        </button>
        <button
          className={`${
            isDisabled()
              ? "w-[164px] h-[40px] md:h-[44px] md:text-[16px] font-[500] text-center border-solid border-[1px] bg-gray-300 rounded-[8px] text-gray-100"
              : "w-[164px] h-[40px] md:h-[44px] md:text-[16px] font-[500] text-center border-solid border-[1px] bg-blue-600 rounded-[8px] text-white hover:bg-[#4C7FF4] active:bg-[#0E3FB0]"
          }`}
          onClick={handleNext}
          disabled={isDisabled()}
        >
          {activeStep >= steps.length - 1
            ? "ยืนยันการชำระเงิน"
            : "ดำเนินการต่อ >"}
        </button>
      </div>
    </div>
  );
}
