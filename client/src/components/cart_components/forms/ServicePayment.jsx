// src/PaymentForm.js
import React, { useContext, useState } from "react";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
} from "@stripe/react-stripe-js";
import { CartContext } from "../../../contexts/cartContext";
import PaymentRadio from "../utils/PaymentRadio";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";

const ServicePayment = () => {
  const [selected, setSelected] = useState("credit-card");
  const {
    netPrice,
    discountPrice,
    setDiscountPrice,
    setCardNumber,
    setCardExpiry,
    setCardCVC,
    setCardName,
    cardName,
    storeBillInfo,
    promoCode,
    setPromoCode,
  } = useContext(CartContext);
  const [qrSrc, setQrSrc] = useState("");
  const isMdUp = useMediaQuery("(min-width: 768px)");
  const stripe = useStripe();

  const genQR = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/payments/create-payment-intent`,
        {
          amount: discountPrice * 100,
          currency: "thb",
        }
      );

      const { clientSecret, paymentIntentId } = response.data;

      // Use stripe.confirmPromptPayPayment to get the payment intent response
      const result = await stripe.confirmPromptPayPayment(clientSecret, {
        payment_method: {
          promptpay: {},
          billing_details: {
            email: "dummy@example.com", // Provide a dummy email to satisfy Stripe's requirement
          },
        },
      });

      if (result.error) {
        console.error("Stripe error:", result.error.message);
      } else {
        // Directly access QR code URL if available
        const qrCodeUrl =
          result.paymentIntent?.next_action?.promptpay_display_qr_code
            ?.qr_code_url;

        checkPaymentStatus(paymentIntentId);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const checkPaymentStatus = async (paymentIntentId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/payments/payment-status/${paymentIntentId}`
      );

      if (response.data.status === "succeeded") {
        // Navigate to the bill page
        storeBillInfo();
      } else {
        // Retry after some time
        setTimeout(() => checkPaymentStatus(paymentIntentId), 5000); // Check every 5 seconds
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
    }
  };

  function handleQR() {
    genQR();
    setSelected("propmt-pay");
  }

  const handleInputChange = (event) => {
    setPromoCode(event.target.value.toUpperCase());
  };

  const handleApplyCode = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/apply-promo-code`,
        { promoCode, netPrice }
      );
      const { newNetPrice, message } = response.data;
      console.log("Response:", response.data);
      setDiscountPrice(newNetPrice);
      // Handle the response as needed
    } catch (error) {
      console.error("Error applying promo code:", error);
      setDiscountPrice(netPrice);
      alert("ไม่สามารถใช้โค้ดนี้ได้ กรุณาลองใหม่อีกครั้ง");
      // Handle the error as needed
    }
  };

  return (
    <div className="payment-background w-full min-h-full">
      <div className="container w-full h-auto bg-white border-solid border-[1px] border-[#CCD0D7] rounded-[8px] flex flex-col p-4 md:px-6 md:pt-6 md:pb-11 gap-4 md:gap-5">
        <p className="font-[500] text-[18px] text-[#646C80] md:font-400] md:text-[20px]">
          ชำระเงิน
        </p>

        <div className="radio-tile-group flex gap-4">
          <PaymentRadio
            id="prompt-pay"
            checked={selected === "propmt-pay"}
            onChange={() => handleQR()}
            icon={
              <QrCode2OutlinedIcon
                className={
                  selected === "propmt-pay"
                    ? "text-[#336DF2]"
                    : "text-[#B3B8C4] group-hover:text-[#336DF2]"
                }
                sx={{ fontSize: isMdUp ? "35px" : "28px" }}
              />
            }
            label="พร้อมเพย์"
          />

          <PaymentRadio
            id="credit-card"
            checked={selected === "credit-card"}
            onChange={() => setSelected("credit-card")}
            icon={
              <PaymentOutlinedIcon
                className={
                  selected === "credit-card"
                    ? "text-[#336DF2]"
                    : "text-[#B3B8C4] group-hover:text-[#336DF2]"
                }
                sx={{ fontSize: isMdUp ? "35px" : "28px" }}
              />
            }
            label="บัตรเครดิต"
          />
        </div>

        {selected === "credit-card" && (
          <form className="flex flex-col gap-6">
            <label className="font-[500] text-[16px] text-[#323640]">
              หมายเลขบัตรเครดิต
              <span className="text-red-600">*</span>
              <CardNumberElement
                id="card-number"
                className="font-prompt w-full h-[44px] mt-1 border border-solid border-[#CCD0D7] rounded-[8px] pt-[11px] pl-4 text-[#232630] placeholder:font-[400] placeholder:text-[16px] placeholder:font-prompt placeholder:text-[#646C80]"
                onChange={(e) => {
                  setCardNumber(e.complete);
                }}
              />
            </label>
            <label className="font-[500] text-[16px] text-[#323640]">
              ชื่อบนบัตร
              <span className="text-red-600">*</span>
              <input
                className="w-full h-[44px] mt-1 border border-solid border-[#CCD0D7] focus:border-[#336DF2] rounded-[8px] py-2.5 pl-4 text-[#232630] placeholder:font-[400] placeholder:text-[16px] placeholder:text-[#646C80] placeholder:focus:text-[#232630]"
                type="name"
                placeholder="กรุณากรอกชื่อบนบัตร"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
            </label>
            <div className="flex flex-col gap-6 md:flex-row">
              <label className="font-[500] text-[16px] text-[#323640] md:basis-1/2">
                วันหมดอายุ
                <span className="text-red-600">*</span>
                <CardExpiryElement
                  id="card-expiry"
                  className="font-prompt w-full h-[44px] mt-1 border border-solid border-[#CCD0D7] rounded-[8px] pt-[11px] pl-4 text-[#232630] placeholder:font-[400] placeholder:text-[16px] placeholder:font-prompt placeholder:text-[#646C80]"
                  onChange={(e) => {
                    setCardExpiry(e.complete);
                  }}
                />
              </label>

              <label className="font-[500] text-[16px] text-[#323640] md:basis-1/2">
                CVC / CVV
                <span className="text-red-600">*</span>
                <CardCvcElement
                  id="card-cvc"
                  className="font-prompt w-full h-[44px] mt-1 border border-solid border-[#CCD0D7] rounded-[8px] pt-[11px] pl-4 text-[#232630] placeholder:font-[400] placeholder:text-[16px] placeholder:font-prompt placeholder:text-[#646C80]"
                  onChange={(e) => {
                    setCardCVC(e.complete);
                  }}
                />
              </label>
            </div>
          </form>
        )}

        <hr className="border-solid border-[1px] border-[#CCD0D7] my-2 md:mt-6 md:mb-3" />

        <label className="font-[500] text-[16px] text-[#323640]">
          Promotion Code
          <div className="flex gap-4 h-[64px] mt-1 md:h-[44px]">
            <input
              className="w-full h-full border border-solid border-[#CCD0D7] focus:border-[#336DF2] rounded-[8px] pb-6 md:py-0 px-4 text-[#232630] placeholder:font-[400] placeholder:text-[16px] placeholder:focus:text-[#232630] placeholder:text-[#646C80] placeholder:text-wrap basis-2/3 md:basis-1/2 flex items-center"
              type="text"
              placeholder="กรุณากรอกโค้ดส่วนลด (ถ้ามี)"
              value={promoCode}
              onChange={handleInputChange}
            />
            <div className="basis-1/3 md:basis-1/2 flex items-center">
              <button
                className="bg-[#336DF2] max-w-[90px] w-full h-[44px] rounded-lg text-white"
                onClick={handleApplyCode}
              >
                ใช้โค้ด
              </button>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default ServicePayment;
