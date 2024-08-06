import React, { useState } from "react";
import Navbar from "../components/Navbar_admin";
import ServiceListHeader from "../components/customer/ServiceListHeader";
import ServiceListBody from "../components/customer/ServiceListPending";

const Pending = () => {
  return (
    <>
      <Navbar />
      <ServiceListHeader />
      <ServiceListBody />
    </>
  );
};

export default Pending;
