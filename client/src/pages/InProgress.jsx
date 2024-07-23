import React, { useState } from "react";
import Navbar from "../components/Navbar_admin";
import Footer from "../components/Footer";
import ServiceListHeader from "../components/customer/ServiceListHeader";
import ServiceListBody from "../components/customer/ServiceListInProgress";

const InProgress = () => {
  return (
    <>
      <Navbar />
      <ServiceListHeader />
      <ServiceListBody />
      <Footer />
    </>
  );
};

export default InProgress;
