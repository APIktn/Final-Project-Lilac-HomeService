import { Routes, Route } from "react-router-dom";
import HomePage_user from "./HomePage_user";
import NotFoundPage from "./NotFoundPage";
import ServiceList_user from "./ServiceList_user";
import CustomerServiceList from "./CustomerServiceList";
import CartPage from "./CartPage";
import CustomerServiceHistory from "./CustomerServiceHistory";
import CustomerInfo from "./CustomerInfo";
import SuccessPage from "../components/cart_components/SuccessPage";
import CancelPage from "../components/cart_components/CancelPage";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage_user />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/servicelist" element={<ServiceList_user />} />
        <Route path="/cart/:service_name" element={<CartPage />} />
        <Route path="/CustomerServiceList" element={<CustomerServiceList />} />
        <Route
          path="/CustomerServiceHistory"
          element={<CustomerServiceHistory />}
        />
        <Route path="/CustomerInfo" element={<CustomerInfo />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
