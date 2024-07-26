import React, { useContext } from "react";
import { steps } from "./Stepper";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../contexts/cartContext";

export default function StepButtons() {
  const navigate = useNavigate();
  const {
    activeStep,
    setActiveStep,
    netPrice,
    selectedDate,
    selectedTime,
    address,
    selectedNames,
    setLogisticsInfo,
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

  const handleNext = (e) => {
    e.preventDefault();
    if (activeStep < steps.length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    setLogisticsInfo({
      date: `${selectedDate.$D} ${getMonthInTh(selectedDate.$M)} ${
        selectedDate.$y
      }`,
      time: `${selectedTime.$H}.${selectedTime.$m} `,
      place: `${address} ${selectedNames.tambon} ${selectedNames.amphure} ${selectedNames.province}`,
    });
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

  console.log(
    activeStep,
    setActiveStep,
    netPrice,
    selectedDate,
    selectedTime,
    address,
    selectedNames
  );

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
