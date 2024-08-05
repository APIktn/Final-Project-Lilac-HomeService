import { useState, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const navigate = useNavigate();
  const [cartPath, setCartPath] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [netPrice, setNetPrice] = useState(0);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState(undefined);
  const [address, setAddress] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);
  const [selected, setSelected] = useState({
    province_id: undefined,
    amphure_id: undefined,
    tambon_id: undefined,
  });
  const [selectedNames, setSelectedNames] = useState({
    province: undefined,
    amphure: undefined,
    tambon: undefined,
  });
  const [moreInfo, setMoreInfo] = useState(undefined);
  const [isDisabled, setIsDisabled] = useState(false);
  const [order, setOrder] = useState(undefined);
  const [logisticsInfo, setLogisticsInfo] = useState({});
  const [billInfo, setBillInfo] = useState(undefined);
  const [counters, setCounters] = useState({});
  const [services, setServices] = useState([]);
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState(false);
  const [cardExpiry, setCardExpiry] = useState(false);
  const [cardCVC, setCardCVC] = useState(false);
  const [cardName, setCardName] = useState("");
  const [discountPrice, setDiscountPrice] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(false);

  const updateCounter = (id, value) => {
    setCounters((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const storeBillInfo = async () => {
    const serviceId = services[0].service_id;
    const detail = address;
    const date = `${selectedDate.$y}-${String(selectedDate.$M + 1).padStart(
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
      discountPrice,
      moredetail: logisticsInfo.moreInfos,
      promoCode,
    };

    //-----Send Formatted Data to Server to Store in DB---/////
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/cart/${cartPath}/bill`,
        billInfo
      );
      navigate("/payment-status", {
        state: { orderId: response.data.order_id },
      });
    } catch (error) {
      console.error("Error sending billInfo to server:", error);
    }
  };

  const contextValue = {
    cardNumber,
    setCardNumber,
    cardExpiry,
    setCardExpiry,
    cardCVC,
    setCardCVC,
    activeStep,
    setActiveStep,
    netPrice,
    setNetPrice,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    address,
    setAddress,
    provinces,
    setProvinces,
    amphures,
    setAmphures,
    tambons,
    setTambons,
    selected,
    setSelected,
    moreInfo,
    setMoreInfo,
    selectedNames,
    setSelectedNames,
    order,
    setOrder,
    logisticsInfo,
    setLogisticsInfo,
    counters,
    updateCounter,
    billInfo,
    setBillInfo,
    cartPath,
    setCartPath,
    services,
    setServices,
    email,
    setEmail,
    isDisabled,
    setIsDisabled,
    storeBillInfo,
    cardName,
    setCardName,
    discountPrice,
    setDiscountPrice,
    promoCode,
    setPromoCode,
    loading,
    setLoading,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
