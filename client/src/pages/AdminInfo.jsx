import React, { useState } from "react";
import Navbar from "../components/Navbar_admin";
import Footer from "../components/Footer";
import CustomerInfoHeader from "../components/customer/CustomerInfoHeader";
import AdminInfoBody from "../components/customer/AdminInfoBody";

const CustomerInfo = () => {
  return (
    <>
      <Navbar />
      <CustomerInfoHeader />
      <AdminInfoBody />
      <Footer />
    </>
  );
};

export default CustomerInfo;
