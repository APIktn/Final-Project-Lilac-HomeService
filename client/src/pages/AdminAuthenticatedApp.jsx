import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboardPage from "./AdminDashboardPage";
import NotFoundPage from "./NotFoundPage";
import HomePage_admin from "./HomePage_admin";
import ServiceList_admin from "./ServiceList_admin";
import TestAdmin from "./TestAdmin";
import CartPage_admin from "./CartPage_admin";
import CustomerServiceList from "./CustomerServiceList";
import CustomerServiceHistory from "./CustomerServiceHistory";
import CustomerInfo from "./CustomerInfo";
import UploadForm from "./Testcloud";
import AdminCreatePromotion from "./AdminCreatePromotion";
import AdminPromotion from "./AdminPromotion";
import AdminDashboard from "./AdminDashBoard";
import AdminServiceCreate from "./AdminServicesCreated";
import DashBoardService from "./AdminServicesList";
import AdminCategoryCreate from "./AdminCategoyryCreate";
import AdminCategoryEdit from "./AdminCategoryEdit";
import AdminServiceEdit from "./AdminServiceEdit";

function AdminAuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin/test" element={<AdminDashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage_admin />} />
        <Route path="/servicelist" element={<ServiceList_admin />} />
        <Route path="/test" element={<TestAdmin />} />
        <Route path="/cart/:service_name" element={<CartPage_admin />} />
        <Route path="/CustomerServiceList" element={<CustomerServiceList />} />
        <Route
          path="/CustomerServiceHistory"
          element={<CustomerServiceHistory />}
        />
        <Route path="/CustomerInfo" element={<CustomerInfo />} />
        <Route path="/testcloud" element={<UploadForm />} />
        <Route path="/admin/promotion" element={<AdminPromotion />} />
        <Route
          path="/admin/promotion/create"
          element={<AdminCreatePromotion />}
        />
        <Route path="/admin/category" element={<AdminDashboard />} />
        <Route path="/admin/service/create" element={<AdminServiceCreate />} />
        <Route path="/admin/service" element={<DashBoardService />} />
        <Route path="/admin/service/view/:service_name" element={<AdminServiceEdit />} />

        <Route
          path="/admin/category/create"
          element={<AdminCategoryCreate />}
        />
        <Route
          path="/admin/category/edit/:category_id"
          element={<AdminCategoryEdit />}
        />

      </Routes>
    </div>
  );
}

export default AdminAuthenticatedApp;
