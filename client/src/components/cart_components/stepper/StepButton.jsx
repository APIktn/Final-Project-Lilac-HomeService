import React, { useContext, useEffect, useState } from "react";
import { steps } from "./Stepper";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../contexts/cartContext";
import axios from "axios";
import {
  CardNumberElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

function StepButtons() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
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
    email,
    isDisabled,
    setIsDisabled,
    cardNumber,
    cardExpiry,
    cardCVC,
    storeBillInfo,
    cardName,
    discountPrice,
    setLoading,
    loading,
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

  const handleClick = (event) => {
    if (activeStep < 2) {
      handleNext(event);
    }

    if (activeStep === 2) {
      handleSubmit(event);
    }
  };

  const handleNext = async (event) => {
    event.preventDefault();

    //------Format Data According to Figma-----/////
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

    //------Change Active Step-------/////
    if (activeStep < 2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    try {
      // Create Payment Intent on the server
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/payments/create-payment-intent`,
        {
          amount: discountPrice * 100, //
          currency: "thb",
        }
      );

      const { clientSecret } = response.data;

      // Confirm the payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: cardName,
          },
        },
      });

      if (result.error) {
        alert(`Payment failed: ${result.error.message}. Please try again.`);
        setLoading(false);
      } else {
        //--------Payment with Stripe is Succeeded-----/////
        if (result.paymentIntent.status === "succeeded") {
          //------Format Data According to Database----/////
          await new Promise((resolve) => setTimeout(resolve, 0));

          storeBillInfo();
        }
      }
    } catch (error) {
      console.error("Error:", error);
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

  const enablingStepButton = () => {
    if (activeStep === 0) {
      if (netPrice === 0) {
        setIsDisabled(true);
        return;
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
        setIsDisabled(true);
        return;
      }
    } else if (activeStep === 2) {
      if (!cardName || !cardNumber || !cardExpiry || !cardCVC || loading) {
        setIsDisabled(true);
        return;
      }
    }
    return setIsDisabled(false);
  };

  useEffect(() => {
    enablingStepButton();
  }, [
    netPrice,
    selectedDate,
    selectedTime,
    address,
    selectedNames.province,
    selectedNames.amphure,
    selectedNames.tambon,
    activeStep,
    email,
    elements,
    cardNumber,
    cardExpiry,
    cardCVC,
    loading,
  ]);

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
            isDisabled
              ? "w-[164px] h-[40px] md:h-[44px] md:text-[16px] font-[500] text-center border-solid border-[1px] bg-gray-300 rounded-[8px] text-gray-100"
              : "w-[164px] h-[40px] md:h-[44px] md:text-[16px] font-[500] text-center border-solid border-[1px] bg-blue-600 rounded-[8px] text-white hover:bg-[#4C7FF4] active:bg-[#0E3FB0]"
          }`}
          onClick={handleClick}
          disabled={isDisabled}
        >
          {loading
            ? "กำลังชำระเงิน.."
            : activeStep >= steps.length - 1
            ? "ยืนยันการชำระเงิน"
            : "ดำเนินการต่อ >"}
        </button>
      </div>
    </div>
  );
}

export default StepButtons;
