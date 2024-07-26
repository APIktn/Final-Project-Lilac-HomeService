import React, { useState } from "react";
import Navbar from "../components/Navbar_tech";
import Footer from "../components/Footer";
import ServiceListHeader from "../components/customer/ServiceListHeader";
import ServiceListBody from "../components/customer/TechCompleted";

const HomePage_technician = () => {
  return (
    <>
      <Navbar />
      <ServiceListHeader />
      <ServiceListBody />
      <Footer />
    </>
  );
};

export default HomePage_technician;
