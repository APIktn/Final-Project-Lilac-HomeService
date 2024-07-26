import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboardPage from "./AdminDashboardPage";
import NotFoundPage from "./NotFoundPage";
import HomePage_admin from "./HomePage_admin";
import ServiceList_admin from "./ServiceList_admin";
import TestAdmin from "./TestAdmin";
import CartPage_admin from "./CartPage_admin";
import Pending from "./Pending";
import InProgress from "./InProgress";
import Completed from "./Completed";
import CustomerInfo from "./CustomerInfo";
import AdminInfo from "./AdminInfo";
import UploadForm from "./Testcloud";
import AdminCreatePromotion from "./AdminCreatePromotion";
import AdminPromotion from "./AdminPromotion";
import AdminDashboard from "./AdminDashBoard";
import AdminServiceCreate from "./AdminServicesCreated";
import DashBoardService from "./AdminServicesList";
import Payment_status_page_admin from "./Payment_status_page_admin";

function AdminAuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage_admin />} />
        <Route path="/servicelist" element={<ServiceList_admin />} />
        <Route path="/test" element={<TestAdmin />} />
        <Route path="/cart/:service_name" element={<CartPage_admin />} />
        <Route path="/payment-status" element={<Payment_status_page_admin />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/inProgress" element={<InProgress />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/CustomerInfo" element={<CustomerInfo />} />
        <Route path="/AdminInfo" element={<AdminInfo />} />
        <Route path="/testcloud" element={<UploadForm />} />
        <Route path="/admin/promotion" element={<AdminPromotion />} />
        <Route
          path="/admin/promotion/create"
          element={<AdminCreatePromotion />}
        />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/service/create" element={<AdminServiceCreate />} />
        <Route path="/admin/servicelist" element={<DashBoardService />} />
      </Routes>
    </div>
  );
}

export default AdminAuthenticatedApp;
