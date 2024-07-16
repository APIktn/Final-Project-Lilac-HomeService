import React, { useState } from "react";
import Navbar from "../components/Navbar_user";
import Footer from "../components/Footer";
import ServiceListHeader from "../components/customer/ServiceListHeader";
import ServiceListBody from "../components/customer/ServiceListBody";

const ServiceList = () => {
  return (
    <>
      <Navbar />
      <ServiceListHeader />
      <ServiceListBody />
      <Footer />
    </>
  );
};

export default ServiceList;
