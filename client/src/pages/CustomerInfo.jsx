import React, { useState } from "react";
import Navbar from "../components/Navbar_user";
import Footer from "../components/Footer";
import CustomerInfoHeader from "../components/customer/CustomerInfoHeader";
import CustomerInfoBody from "../components/customer/CustomerInfoBody";

const CustomerInfo = () => {
  return (
    <>
      <Navbar />
      <CustomerInfoHeader />
      <CustomerInfoBody />
      <Footer />
    </>
  );
};

export default CustomerInfo;
