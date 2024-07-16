import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboardPage from "./AdminDashboardPage";
import NotFoundPage from "./NotFoundPage";
import HomePage_admin from "./HomePage_admin";
import ServiceList_admin from "./ServiceList_admin";
import CartPage_1 from "./CartPage_1_admin";
import TestAdmin from "./TestAdmin";

function AdminAuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage_admin />} />
        <Route path="/servicelist" element={<ServiceList_admin />} />
        <Route path="/cart/:service_name" element={<CartPage_1 />} />
        <Route path="/test" element={<TestAdmin />} />
      </Routes>
    </div>
  );
}

export default AdminAuthenticatedApp;
