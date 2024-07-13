import { Routes, Route } from "react-router-dom";
import HomePage_user from "./HomePage_user";
import NotFoundPage from "./NotFoundPage";
import PolicyPage from "./PolicyPage";
import TermsPage from "./TermsPage";
import ServiceList_user from "./ServiceList_user";
import CartPage_1 from "./CartPage_1";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage_user />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/servicelist" element={<ServiceList_user/>} />
        <Route path="/cart/:service_name" element={<CartPage_1 />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
