import ServiceImage from "./ServiceImage";
import MuiBreadcrumbs from "./MuiBreadcrumbs";
import Stepper from "./stepper/Stepper";
import OrderSummary from "./OrderSummary";
import ServiceDetail from "./forms/ServiceDetail";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../pages/CartPage";
import ServiceForm from "./forms/ServiceForm";
import ServicePayment from "./forms/ServicePayment";
import { useParams } from "react-router-dom";
import axios from "axios";

function CartForm() {
  const { activeStep } = useContext(CartContext);
  const { service_name } = useParams();
  const [services, setServices] = useState([]);

  const getServices = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4000/cart/${service_name}`
      );
      console.log(result.data.data);
      setServices(result.data.data);
    } catch (error) {
      console.error("Error");
    }
  };

  useEffect(() => {
    getServices();
  }, []);
  return (
    <div className="background bg-[#F3F4F6] w-full h-auto relative z-10 py-14 gap-7 mb-[44px] md:py-20 md:mb-0 border-solid border-black border-[2px]">
      <ServiceImage />
      <div className="container h-auto mx-auto relative z-10 flex flex-col px-4 gap-4 md:px-20 md:gap-8">
        <MuiBreadcrumbs />
        <Stepper />
      </div>
      <div className="container h-full mx-auto relative z-10 flex flex-col pt-4 md:pt-7 gap-4 md:px-20 md:gap-8 md:flex-row bg-[#F3F4F6]">
        <div className="px-4 md:px-0 md:basis-2/3 ">
          {activeStep === 0 ? (
            <ServiceDetail />
          ) : activeStep === 1 ? (
            <ServiceForm />
          ) : (
            <ServicePayment />
          )}
        </div>
        <OrderSummary services={services} />
      </div>
    </div>
  );
}

export default CartForm;
