import ServiceImage from "./ServiceImage";
import MuiBreadcrumbs from "./MuiBreadcrumbs";
import Stepper from "./stepper/Stepper";
import OrderSummary from "./OrderSummary";
import ServiceDetail from "./forms/ServiceDetail";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../contexts/cartContext";
import ServiceForm from "./forms/ServiceForm";
import ServicePayment from "./forms/ServicePayment";
import { useParams } from "react-router-dom";
import axios from "axios";

function CartForm() {
  const { activeStep, setCartPath, services, setServices } =
    useContext(CartContext);
  const { service_name } = useParams();
  const [summaryOrder, setSummaryOrder] = useState([]);

  const getServices = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/cart/${service_name}`
      );
      setServices(result.data.data);
      setCartPath(service_name);
    } catch (error) {
      console.error("Error");
    }
  };

  const getSummaryOrder = (orderData) => {
    setSummaryOrder((oldOrderData) => [...oldOrderData, orderData]);
  };

  const deleteSummaryOrder = (orderData) => {
    const index = summaryOrder.findIndex(
      (obj) => obj.service_lists === orderData
    );

    if (index !== -1) {
      setSummaryOrder((oldOrderData) => [
        ...oldOrderData.slice(0, index),
        ...oldOrderData.slice(index + 1),
      ]);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div className="background bg-[#F3F4F6] w-full h-auto relative z-10 py-14 gap-7 mb-[44px] md:py-20 md:mb-0 ">
      <ServiceImage />
      <div className="container h-auto mx-auto relative z-10 flex flex-col px-4 gap-4 md:px-20 md:gap-8">
        <MuiBreadcrumbs dataFromState={services} />
        <Stepper />
      </div>
      <div className="container h-full mx-auto relative z-10 flex flex-col pt-4 md:pt-7 gap-4 md:px-20 md:gap-8 md:flex-row bg-[#F3F4F6]">
        <div className="px-4 md:px-0 md:basis-2/3 ">
          {activeStep === 0 ? (
            <ServiceDetail
              dataFromState={services}
              getSummaryOrder={getSummaryOrder}
              deleteSummaryOrder={deleteSummaryOrder}
            />
          ) : activeStep === 1 ? (
            <ServiceForm />
          ) : (
            <ServicePayment />
          )}
        </div>
        <OrderSummary summaryOrder={summaryOrder} service_name={service_name} />
      </div>
    </div>
  );
}

export default CartForm;
