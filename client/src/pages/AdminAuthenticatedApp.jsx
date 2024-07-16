import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboardPage from "./AdminDashboardPage";
import NotFoundPage from "./NotFoundPage";
import HomePage_admin from "./HomePage_admin";
import ServiceList_admin from "./ServiceList_admin";
import CartPage_admin from "./CartPage_admin";
import CustomerServiceList from "./CustomerServiceList";
import CustomerServiceHistory from "./CustomerServiceHistory";
import CustomerInfo from "./CustomerInfo";

function AdminAuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage_admin />} />
        <Route path="/servicelist" element={<ServiceList_admin />} />
        <Route path="/cart/:service_name" element={<CartPage_admin />} />
        <Route path="/CustomerServiceList" element={<CustomerServiceList />} />
        <Route
          path="/CustomerServiceHistory"
          element={<CustomerServiceHistory />}
        />
        <Route path="/CustomerInfo" element={<CustomerInfo />} />
      </Routes>
    </div>
  );
}

export default AdminAuthenticatedApp;
