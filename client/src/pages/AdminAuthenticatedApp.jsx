import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboardPage from "./AdminDashboardPage";
import NotFoundPage from "./NotFoundPage";
import HomePage_admin from "./HomePage_admin";
import ServiceList_admin from "./ServiceList_admin";
import CartPage_1 from "./CartPage_1_admin";
import AdminService from "./AdminService";
import AdminServiceCreate from "./AdminServiceCreate";
import Upload from "./testCloudinary";

function AdminAuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/service" element={<AdminService />} />
        <Route path="/admin/service/create" element={<AdminServiceCreate />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage_admin />} />
        <Route path="/servicelist" element={<ServiceList_admin />} />
        <Route path="/cart/:service_name" element={<CartPage_1 />} />
        <Route path="/testcloud" element={<Upload />} />
      </Routes>
    </div>
  );
}

export default AdminAuthenticatedApp;
