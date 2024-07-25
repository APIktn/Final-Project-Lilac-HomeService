import { Routes, Route } from "react-router-dom";
import HomePage_user from "./HomePage_user";
import NotFoundPage from "./NotFoundPage";
import ServiceList_user from "./ServiceList_user";
import UserProfilePage from "./UserProfilePage";
import CustomerServiceList from "./CustomerServiceList";
import CartPage from "./CartPage";
import CustomerServiceHistory from "./CustomerServiceHistory";
import CustomerInfo from "./CustomerInfo";
import Payment_status_page from "./Payment_status_page";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage_user />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/servicelist" element={<ServiceList_user />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/cart/:service_name" element={<CartPage />} />
        <Route path="/payment-status" element={<Payment_status_page />} />
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

export default AuthenticatedApp;
