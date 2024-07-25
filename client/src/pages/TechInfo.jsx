import React, { useState } from "react";
import Navbar from "../components/Navbar_tech";
import Footer from "../components/Footer";
import CustomerInfoHeader from "../components/customer/CustomerInfoHeader";
import TechInfoBody from "../components/customer/TechInfoBody";

const CustomerInfo = () => {
  return (
    <>
      <Navbar />
      <CustomerInfoHeader />
      <TechInfoBody />
      <Footer />
    </>
  );
};

export default CustomerInfo;
