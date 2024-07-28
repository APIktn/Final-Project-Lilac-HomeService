// src/PaymentForm.js
import React, { useContext, useState } from "react";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { CartContext } from "../../../contexts/cartContext";
import PaymentRadio from "../utils/PaymentRadio";

const ServicePayment = () => {
  const [selected, setSelected] = useState("credit-card");
  const { netPrice, email, setEmail } = useContext(CartContext);
  //   event.preventDefault();

  //   if (!stripe || !elements) {
  //     return;
  //   }

  //   const cardNumberElement = elements.getElement(CardNumberElement);
  //   // const cardExpiryElement = elements.getElement(CardExpiryElement);
  //   // const cardCvcElement = elements.getElement(CardCvcElement);

  //   try {
  //     // Create Payment Intent on the server
  //     const response = await axios.post(
  //       "http://localhost:4000/api/payments/create-payment-intent",
  //       {
  //         amount: netPrice * 100, //
  //         currency: "thb",
  //       }
  //     );

  //     const { clientSecret } = response.data;

  //     // Confirm the payment
  //     const result = await stripe.confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card: cardNumberElement,
  //         billing_details: {
  //           email: email,
  //         },
  //       },
  //     });

  //     if (result.error) {
  //       console.error(result.error.message);
  //     } else {
  //       if (result.paymentIntent.status === "succeeded") {
  //         console.log("Payment successful");
  //         navigate("/success"); // Redirect to the success page
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  return (
    <div className="payment-background w-full min-h-full">
      <div className="container w-full h-auto bg-white border-solid border-[1px] border-[#CCD0D7] rounded-[8px] flex flex-col p-4 md:p-6 gap-4 md:gap-5">
        <p className="font-[500] text-[18px] text-[#646C80] md:font-400] md:text-[20px]">
          ชำระเงิน
        </p>

        <div className="radio-tile-group flex gap-4">
          <PaymentRadio
            id="prompt-pay"
            checked={selected === "propmt-pay"}
            onChange={() => setSelected("propmt-pay")}
            icon={
              <QrCode2OutlinedIcon
                className={
                  selected === "propmt-pay"
                    ? "text-[#336DF2]"
                    : "text-[#B3B8C4] group-hover:text-[#336DF2]"
                }
                sx={{ fontSize: "28px" }}
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
                sx={{ fontSize: "28px" }}
              />
            }
            label="บัตรเครดิต"
          />
        </div>

        {selected === "credit-card" && (
          <form className="flex flex-col gap-6">
            <label className="font-[500] text-[16px] text-[#323640]">
              ที่อยู่อีเมล
              <span className="text-red-600">*</span>
              <input
                className="w-full h-[44px] mt-1 border border-solid border-[#CCD0D7] focus:border-[#336DF2] rounded-[8px] py-2.5 pl-4 text-[#232630] placeholder:font-[400] placeholder:text-[16px] placeholder:text-[#646C80] placeholder:focus:text-[#232630]"
                type="email"
                placeholder="กรุณากรอกที่อยู่อีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="font-[500] text-[16px] text-[#323640]">
              ยอดชำระ
              <input
                className="w-full h-[44px] mt-1 border border-solid border-[#CCD0D7] rounded-[8px] py-2.5 pl-4 text-gray-400 italic"
                type="number"
                value={netPrice}
                disabled={true}
              />
            </label>

            <label className="font-[500] text-[16px] text-[#323640]">
              หมายเลขบัตรเครดิต
              <span className="text-red-600">*</span>
              <CardNumberElement
                id="card-number"
                className="font-prompt w-full h-[44px] mt-1 border border-solid border-[#CCD0D7] rounded-[8px] pt-[11px] pl-4 text-[#232630] placeholder:font-[400] placeholder:text-[16px] placeholder:font-prompt placeholder:text-[#646C80]"
              />
            </label>

            <div className="flex flex-col gap-6 md:flex-row">
              <label className="font-[500] text-[16px] text-[#323640] md:basis-1/2">
                วันหมดอายุ
                <span className="text-red-600">*</span>
                <CardExpiryElement
                  id="card-expiry"
                  className="font-prompt w-full h-[44px] mt-1 border border-solid border-[#CCD0D7] rounded-[8px] pt-[11px] pl-4 text-[#232630] placeholder:font-[400] placeholder:text-[16px] placeholder:font-prompt placeholder:text-[#646C80]"
                />
              </label>

              <label className="font-[500] text-[16px] text-[#323640] md:basis-1/2">
                CVC / CVV
                <span className="text-red-600">*</span>
                <CardCvcElement
                  id="card-cvc"
                  className="font-prompt w-full h-[44px] mt-1 border border-solid border-[#CCD0D7] rounded-[8px] pt-[11px] pl-4 text-[#232630] placeholder:font-[400] placeholder:text-[16px] placeholder:font-prompt placeholder:text-[#646C80]"
                />
              </label>
            </div>
          </form>
        )}

        <hr className="border-solid border-[1px] border-[#CCD0D7] " />

        <label className="font-[500] text-[16px] text-[#323640] md:mb-5">
          Promotion Code
          <div className="flex gap-4">
            <input
              className="w-full h-[64px] md:h-[44px] mt-1 border border-solid border-[#CCD0D7] focus:border-[#336DF2] rounded-[8px] pb-5 md:py-2.5 px-4 text-[#232630] placeholder:font-[400] placeholder:text-[16px] placeholder:focus:text-[#232630] placeholder:text-[#646C80] placeholder:text-wrap basis-2/3 md:basis-1/2"
              type="text"
              placeholder="กรุณากรอกโค้ดส่วนลด (ถ้ามี)"
            />
            <div className="py-2.5 basis-1/3 md:basis-1/2 md:py-0">
              <button className="bg-[#336DF2] max-w-[90px] w-full h-full rounded-lg text-white">
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
