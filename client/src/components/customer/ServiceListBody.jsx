import CustomerAccount from "./CustomerAccount";
import OrderCard from "./ordercard";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ServiceListHistory = () => {
  const [orderDetails, setOrderDetails] = useState([]);

  // const navigate = useNavigate();
  // const handleMenuItemClick = (path) => {
  //   navigate(path);
  // };

  const getServices = async () => {
    const result = await axios.get(`http://localhost:4000/incompleteorder`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    // console.log("result", result);
    // console.log(result.data.data);
    setOrderDetails(result.data.data);
  };

  useEffect(() => {
    getServices();
  }, []);

  // let filteredServices = services;

  return (
    <body className="bg-[#F3F4F6] px-4">
      <div className="md:flex container md:mx-auto md:px-20 md:py-2 justify-between items-start  ">
        <div className="sticky top-[45px] md:top-[75px] z-40 md:basis-1/4  ">
          <CustomerAccount />
        </div>
        <div className="md:basis-3/4 md:ml-[32px]">
          {/* show on mobile */}
          <div className=" sm:hidden flex justify-center items-center mx-4 mb-4  p-4 rounded-[5px]  bg-blue-600 ">
            {/* show on mobile */}
            <div className="">
              <a className="font-medium text-white text-[20px] rounded-lg sm:text-[32px] ">
                รายการคำสั่งซ่อม
              </a>
            </div>
          </div>
          <div className="pb-1">
            <div>
              <div>
                {/* เริ่มต้นcard */}
                {orderDetails.map((orderDetail, index) => (
                  <OrderCard
                    key={orderDetail.order_detail_id}
                    orderDetail={orderDetail}
                  />
                ))}
                {/* สิ้นสุด card */}
                {/* mockup ลบออกได้*/}
                {/* mockup ลบออกได้*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default ServiceListHistory;
