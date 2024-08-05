import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar_user from "../components/Navbar_user";
import PaymentSuccess from "../components/cart_components/PaymentSuccess";
import axios from "axios";

function Payment_status_page() {
  const location = useLocation();
  const { orderId } = location.state;
  const [billInfo, setBillInfo] = useState([]);

  useEffect(() => {
    const fetchBillInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/cart/bill/${orderId}`
        );
        setBillInfo(response.data);
      } catch (error) {
        console.error("Error fetching bill info:", error);
      }
    };

    if (orderId) {
      fetchBillInfo();
    }
  }, [orderId]);

  return (
    <>
      <Navbar_user />
      {billInfo.length > 0 && <PaymentSuccess billInfo={billInfo} />}
    </>
  );
}

export default Payment_status_page;
