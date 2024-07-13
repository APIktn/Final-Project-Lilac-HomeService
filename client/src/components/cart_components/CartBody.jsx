import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MuiBreadcrumb from './MuiBreadcrumbs';
import FirstStep from './stepper/FirstStep';
import ServiceDetail from './forms/ServiceDetail';
import ServiceImage from './ServiceImage';
import OrderSummary from './OrderSummary';

function CartBody() {
  const { service_name } = useParams();
  const [services, setServices] = useState([]);

  const getServices = async () => {
    try {
      const result = await axios.get(`http://localhost:4000/cart/${service_name}`);
      console.log(result.data.data);
      setServices(result.data.data);
    } catch (error) {
      console.error('Error');
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div className="background w-full h-auto relative z-10 py-14 gap-7 mb-[88px] md:py-20 md:mb-0">
      <ServiceImage />
      <div className="container h-auto mx-auto relative z-10 flex flex-col px-4 gap-4 md:px-20 md:gap-8">
        <MuiBreadcrumb />
        <FirstStep />
      </div>
      <div className="container h-full mx-auto relative z-10 flex flex-col pt-4 md:pt-7 gap-4 md:px-20 md:gap-8 md:flex-row">
        <div className="px-4 md:px-0 md:basis-2/3">
          <ServiceDetail />
        </div>
        <OrderSummary services={services} />
      </div>
    </div>
  );
}

export default CartBody;
