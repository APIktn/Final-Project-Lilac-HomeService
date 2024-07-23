import AdminAccount from "./AdminAccount";
import Ordercard from "./ocadmin";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ServiceListHistory = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getServices = async () => {
    try {
      const result = await axios.get(`http://localhost:4000/pending`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrderDetails(result.data.data);
      setLoading(false);
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
      setLoading(false);
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  const handleStatusChange = async (order_detail_id, new_status) => {
    try {
      const response = await axios.put(
        "http://localhost:4000/updateOrderStatus",
        {
          order_detail_id,
          new_status,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        setOrderDetails((prevDetails) =>
          prevDetails.map((detail) =>
            detail.order_detail_id === order_detail_id
              ? { ...detail, status: new_status }
              : detail
          )
        );
        console.log("สถานะอัพเดตสำเร็จ");
      } else {
        console.error("สถานะอัพเดตไม่สำเร็จ:", response.statusText);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัพเดตสถานะ:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-[#F3F4F6] px-4">
      <div className="md:flex container md:mx-auto md:px-20 md:py-2 justify-between items-start">
        <div className="sticky top-[45px] md:top-[75px] z-40 md:basis-1/4">
          <AdminAccount />
        </div>
        <div className="md:basis-3/4 md:ml-[32px]">
          {/* show on mobile */}
          <div className="sm:hidden flex justify-center items-center mx-4 mb-4 p-4 rounded-[5px] bg-blue-600">
            <a className="font-medium text-white text-[20px] rounded-lg sm:text-[32px]">
              รายการคำสั่งซ่อม
            </a>
          </div>
          <div className="pb-1">
            <div>
              <div>
                {/* เริ่มต้น card */}
                {orderDetails.map((orderDetail) => (
                  <Ordercard
                    key={orderDetail.order_detail_id}
                    orderDetail={orderDetail}
                    onStatusChange={handleStatusChange}
                  />
                ))}
                {/* สิ้นสุด card */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceListHistory;
