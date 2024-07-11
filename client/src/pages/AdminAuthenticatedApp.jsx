import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboardPage from "./AdminDashboardPage";
import NotFoundPage from "./NotFoundPage";
import PolicyPage from "./PolicyPage";
import TermsPage from "./TermsPage";
import HomePage_admin from "./HomePage_admin";

function AdminAuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage_admin />} />
      </Routes>
    </div>
  );
}

export default AdminAuthenticatedApp;
