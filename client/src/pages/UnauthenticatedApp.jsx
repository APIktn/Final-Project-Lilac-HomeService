import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import HomePage from "./HomePage";
import ServiceList from "./ServiceList";
import AdminLoginPage from "./AdminLoginPage";
import TechnicianLoginPage from "./TechnicianLoginPage";
import TechnicianRegisterPage from "./TechnicianRegisterPage";
import NotFoundPage from "./NotFoundPage";

function UnauthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/servicelist" element={<ServiceList />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/technician" element={<TechnicianLoginPage />} />
        <Route
          path="/register/technician"
          element={<TechnicianRegisterPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;
