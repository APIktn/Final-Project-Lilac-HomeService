import React, { useState } from "react";
import Navbar from "../components/Navbar_user";
import Footer from "../components/Footer";
import ServiceHistoryHeader from "../components/customer/ServiceHistoryHeader";
import ServiceHistoryBody from "../components/customer/ServiceHistoryBody";

const CustomerServiceHistory = () => {
  return (
    <>
      <Navbar />
      <ServiceHistoryHeader />
      <ServiceHistoryBody />
      <Footer />
    </>
  );
};

export default CustomerServiceHistory;
