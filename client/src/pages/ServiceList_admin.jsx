import React, { useState } from "react";
import Banner from "../components/Banner";
import SearchBar from "../components/Searchbar_user";
import BannerFooter from "../components/BannerFooter";
import Navbar_admin from "../components/Navbar_admin";
import Footer from "../components/Footer";

const ServiceList_admin = () => {
  return (
    <>
      <Navbar_admin />
      <Banner />
      <SearchBar />
      <BannerFooter />
      <Footer />
    </>
  );
};

export default ServiceList_admin;
