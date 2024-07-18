import { useState, createContext } from "react";

export const CartContext = createContext();

const CartContextProvider = (props) => {
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
  const [moreInfo, setMoreInfo] = useState("");

  const [logisticsInfo, setLogisticsInfo] = useState();

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
    logisticsInfo,
    setLogisticsInfo,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
