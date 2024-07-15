import React, { useContext } from "react";
import { steps } from "./Stepper";
import { CartContext } from "../../../pages/CartPage";

export default function StepButtons() {
  const { activeStep, setActiveStep } = useContext(CartContext);

  const handleNext = () => {
    if (activeStep < steps.length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="bottom-navigator w-full h-[72px] md:h-[92px] bg-white border-solid border-[1px] border-t-gray-300 sticky bottom-0 z-10 overflow-hidden">
      <div className="container h-full mx-auto py-2 px-4 md:px-20 gap-4 flex justify-between items-center">
        <button
          className="w-[164px] h-[40px] md:h-[44px] md:text-[16px] font-[500] text-center border-solid border-[1px] border-blue-600 rounded-[8px] text-blue-600"
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          {"< ย้อนกลับ"}
        </button>
        <button
          className={`${
            activeStep === 0
              ? "w-[164px] h-[40px] md:h-[44px] md:text-[16px] font-[500] text-center border-solid border-[1px] bg-gray-300 rounded-[8px] text-gray-100"
              : "w-[164px] h-[40px] md:h-[44px] md:text-[16px] font-[500] text-center border-solid border-[1px] bg-blue-600 rounded-[8px] text-white"
          }`}
          onClick={handleNext}
        >
          {activeStep >= steps.length - 1
            ? "ยืนยันการชำระเงิน"
            : "ดำเนินการต่อ >"}
        </button>
      </div>
    </div>
  );
}
