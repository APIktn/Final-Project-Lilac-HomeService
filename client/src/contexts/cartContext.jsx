import { useState, createContext } from "react";

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const [cartPath, setCartPath] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [netPrice, setNetPrice] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
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
    province: "",
    amphure: "",
    tambon: "",
  });
  const [moreInfo, setMoreInfo] = useState(null);
  const [order, setOrder] = useState(null);
  const [logisticsInfo, setLogisticsInfo] = useState({});
  const [billInfo, setBillInfo] = useState(null);
  const [counters, setCounters] = useState({});
  const [services, setServices] = useState([]);

  const updateCounter = (id, value) => {
    setCounters((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const contextValue = {
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
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
