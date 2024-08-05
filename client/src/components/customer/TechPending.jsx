import AdminAccount from "./TechAccount";
import Ordercard from "./octech";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ServiceListHistory = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getServices = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/TechPending`, {
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
        `${import.meta.env.VITE_API_BASE_URL}/updateOrderStatus`,
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
              {!orderDetails.some(() => true) ? (
                <div className="w-full bg-white border-solid border-[1px] border-[#D8D8D8] rounded-[8px] flex flex-col px-[24px] py-[16px] mb-[16px] overflow-hidden">
                  <div className="flex flex-col">
                    <div className="pt-[12px] pb-[6px] flex flex-col justify-center items-center">
                      <p className="text-[18px] sm:text-[20px] font-medium text-black">
                        ยังไม่มีรายการในหมวดนี้
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                orderDetails.map((orderDetail) => (
                  <Ordercard
                    key={orderDetail.order_detail_id}
                    orderDetail={orderDetail}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceListHistory;
