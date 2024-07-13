import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboardPage from "./AdminDashboardPage";
import NotFoundPage from "./NotFoundPage";
import PolicyPage from "./PolicyPage";
import TermsPage from "./TermsPage";
import HomePage_admin from "./HomePage_admin";
import ServiceList_admin from "./ServiceList_admin";
import CartPage_1 from "./CartPage_1_admin";
import AdminService from "./AdminService";
import AdminServiceCreate from "./AdminServiceCreate";

function AdminAuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/service" element={<AdminService />} />
        <Route path="/admin/service/create" element={<AdminServiceCreate />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage_admin />} />
        <Route path="/servicelist" element={<ServiceList_admin />} />
        <Route path="/cart/:service_name" element={<CartPage_1 />} />
      </Routes>
    </div>
  );
}

export default AdminAuthenticatedApp;
