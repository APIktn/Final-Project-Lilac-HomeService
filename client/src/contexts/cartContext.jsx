import { useState, createContext } from "react";

export const CartContext = createContext();

const CartContextProvider = (props) => {
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

  const updateCounter = (id, value) => {
    setCounters((prev) => ({
      ...prev,
      [id]: value,
    }));
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
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
