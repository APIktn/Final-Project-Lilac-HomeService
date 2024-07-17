import React, { useContext } from "react";
import { steps } from "./Stepper";
import { CartContext, SummaryContext } from "../../../pages/CartPage";
import { useNavigate } from "react-router-dom";

export default function StepButtons() {
  const navigate = useNavigate();
  const { activeStep, setActiveStep } = useContext(CartContext);
  const { netPrice } = useContext(SummaryContext);

  const handleNext = (e) => {
    e.preventDefault();
    if (activeStep < steps.length) {
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

  console.log(netPrice);

  return (
    <div className="bottom-navigator w-full h-[72px] md:h-[92px] bg-white border-solid border-[1px] border-t-gray-300 sticky bottom-0 z-10 overflow-hidden">
      <div className="container h-full mx-auto py-2 px-4 md:px-20 gap-4 flex justify-between items-center">
        <button
          className="w-[164px] h-[40px] md:h-[44px] md:text-[16px] font-[500] text-center border-solid border-[1px] border-blue-600 rounded-[8px] text-blue-600"
          onClick={handleBack}
        >
          {"< ย้อนกลับ"}
        </button>
        <button
          className={`${
            netPrice === 0
              ? "w-[164px] h-[40px] md:h-[44px] md:text-[16px] font-[500] text-center border-solid border-[1px] bg-gray-300 rounded-[8px] text-gray-100"
              : "w-[164px] h-[40px] md:h-[44px] md:text-[16px] font-[500] text-center border-solid border-[1px] bg-blue-600 rounded-[8px] text-white"
          }`}
          onClick={handleNext}
          disabled={netPrice === 0}
        >
          {activeStep >= steps.length - 1
            ? "ยืนยันการชำระเงิน"
            : "ดำเนินการต่อ >"}
        </button>
      </div>
    </div>
  );
}
