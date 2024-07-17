import React, { useState, useEffect } from "react";
import axios from "axios";
import ServiceCard_user from "./ServiceCard_user";
import { useNavigate } from "react-router-dom";

const Service_user = () => {
  const [services, setServices] = useState([]);

  const navigate = useNavigate();
  const handleMenuItemClick = (path) => {
    navigate(path);
  };

  const getServices = async () => {
    const result = await axios.get(
      `http://localhost:4000/services/top3services`
    );
    console.log(result.data.data);
    setServices(result.data.data);
  };

  useEffect(() => {
    getServices();
  }, []);

  let filteredServices = services;

  return (
    <section className="py-8 lg:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-[30px] lg:text-[32px] font-medium text-center text-blue-900 mb-8 ">
          บริการยอดฮิตของเรา
        </h2>
        <div className="p-4 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-8 md:px-20 md:py-16">
          {filteredServices.map((service, index) => (
            <ServiceCard_user
              key={`${service.service_id}-${index}`}
              service={service}
            />
          ))}
        </div>
        <div className="text-center mt-6 lg:mt-8">
          <button
            onClick={() => handleMenuItemClick("/servicelist")}
            className="px-4 lg:px-6 py-2 bg-blue-600 text-white rounded"
          >
            ดูบริการทั้งหมด
          </button>
        </div>
      </div>
    </section>
  );
};

export default Service_user;
