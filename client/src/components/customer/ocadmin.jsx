// import * as React from "react";
// import person2 from "../../assets/icons/person2-icon.png";
// import event from "../../assets/icons/event-icon.png";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import axios from "axios";

// const categoryStyles = {
//   รอดำเนินการ: {
//     backgroundColor: "#E6E7EB",
//     color: "#323640",
//   },
//   กำลังดำเนินการ: {
//     backgroundColor: "#FFF3D4",
//     color: "#323640",
//   },
//   ดำเนินการสำเร็จ: {
//     backgroundColor: "#DFF9F6",
//     color: "#00596C",
//   },
// };

// const OcAdmin = ({ orderDetail, onStatusChange }) => {
//   const [status, setStatus] = React.useState(orderDetail.status);
//   const [technicians, setTechnicians] = React.useState([]);
//   const [selectedTechnician, setSelectedTechnician] = React.useState(
//     orderDetail.technician_name
//   );

//   React.useEffect(() => {
//     const fetchTechnicians = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/technicians", {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         setTechnicians(response.data);
//       } catch (error) {
//         console.error("Error fetching technicians:", error);
//       }
//     };

//     fetchTechnicians();
//   }, []);

//   const handleStatusChange = async (event) => {
//     const newStatus = event.target.value;
//     setStatus(newStatus);

//     try {
//       const response = await axios.put(
//         "http://localhost:4000/updateOrderStatus",
//         {
//           order_detail_id: orderDetail.order_detail_id,
//           new_status: newStatus,
//         },
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );

//       if (response.status === 200) {
//         console.log("สถานะอัพเดตสำเร็จ");
//         onStatusChange(orderDetail.order_detail_id, newStatus);
//       } else {
//         console.error("สถานะอัพเดตไม่สำเร็จ:", response.statusText);
//       }
//     } catch (error) {
//       console.error("เกิดข้อผิดพลาดในการอัพเดตสถานะ:", error);
//     }
//   };

//   const handleTechnicianChange = async (event) => {
//     const newTechnician = event.target.value;
//     setSelectedTechnician(newTechnician);

//     try {
//       const response = await axios.put(
//         "http://localhost:4000/updateTechnician",
//         {
//           order_detail_id: orderDetail.order_detail_id,
//           technician_name: newTechnician,
//         },
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );

//       if (response.status === 200) {
//         console.log("พนักงานอัพเดตสำเร็จ");

//         onStatusChange(orderDetail.order_detail_id, status);
//       } else {
//         console.error("พนักงานอัพเดตไม่สำเร็จ:", response.statusText);
//       }
//     } catch (error) {
//       console.error("เกิดข้อผิดพลาดในการอัพเดตพนักงาน:", error);
//     }
//   };

//   const categoryStyle = categoryStyles[status.trim()] || {};

//   return (
//     <div className="w-full bg-white border-solid border-[1px] border-[#D8D8D8] rounded-[8px] flex flex-col px-[24px] py-[16px] mb-[16px] overflow-hidden">
//       <div className="flex flex-col">
//         <div className="pt-[12px] pb-[6px] flex flex-col sm:flex-row justify-between">
//           <p className="text-[18px] sm:text-[20px] font-medium text-black">
//             คำสั่งซ่อมรหัส: {orderDetail.order_code}
//           </p>
//           <div className="flex flex-row items-center">
//             <p className="text-[14px] pr-4">สถานะ:</p>
//             <Select
//               value={status}
//               onChange={handleStatusChange}
//               style={{
//                 backgroundColor: categoryStyle.backgroundColor,
//                 color: categoryStyle.color,
//               }}
//               className="text-[14px] text-gray-900 border rounded-[15px] p-1 px-3 ml-1"
//             >
//               <MenuItem value="รอดำเนินการ">รอดำเนินการ</MenuItem>
//               <MenuItem value="กำลังดำเนินการ">กำลังดำเนินการ</MenuItem>
//               <MenuItem value="ดำเนินการสำเร็จ">ดำเนินการสำเร็จ</MenuItem>
//             </Select>
//           </div>
//         </div>
//         <div className="flex flex-col sm:flex-row justify-between">
//           <div className="flex flex-col pt-[16px] ">
//             <div className="flex flex-row">
//               <img src={event} alt="event" className="mr-1 h-5" />
//               <p className="text-[14px] text-gray-700">
//                 วันเวลาดำเนินการ: {orderDetail.order_date} เวลา{" "}
//                 {orderDetail.time.slice(0, 5)} น.
//               </p>
//             </div>

//             <div className="flex flex-row pt-1">
//               <img src={person2} alt="person" className="mr-1 h-5 mt-5" />
//               <p className="text-[14px] text-gray-700">
//                 พนักงาน:
//                 <Select
//                   value={selectedTechnician}
//                   onChange={handleTechnicianChange}
//                   className="text-[14px] text-gray-900 border rounded-[15px]  px-3 ml-1"
//                 >
//                   {technicians.map((technician) => (
//                     <MenuItem
//                       key={technician.id}
//                       value={`${technician.firstname} ${technician.lastname}`}
//                     >
//                       {technician.firstname} {technician.lastname}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </p>
//             </div>
//           </div>
//           <div className="flex flex-row items-center">
//             <p className="text-[14px] pt-[7px] md:pt-0 text-gray-700">
//               ราคารวม:
//             </p>
//             <p className="text-[18px] pt-[5px] text-gray-950 pl-4 ">
//               {orderDetail.total_amount} ฿
//             </p>
//           </div>
//         </div>

//         <div className="flex flex-row sm:flex-col justify-start">
//           <p className="text-[14px] pt-[5px] md:pt-[20px] text-gray-700">
//             รายการ:{" "}
//           </p>
//           <p className="text-[14px] pt-[5px] text-black">
//             • {orderDetail.service_lists}, จำนวน{" "}
//             {orderDetail.quantity_per_order} บริการ
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OcAdmin;
import * as React from "react";
import person2 from "../../assets/icons/person2-icon.png";
import event from "../../assets/icons/event-icon.png";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const categoryStyles = {
  รอดำเนินการ: {
    backgroundColor: "#E6E7EB",
    color: "#323640",
  },
  กำลังดำเนินการ: {
    backgroundColor: "#FFF3D4",
    color: "#323640",
  },
  ดำเนินการสำเร็จ: {
    backgroundColor: "#DFF9F6",
    color: "#00596C",
  },
};

const OcAdmin = ({ orderDetail, onStatusChange }) => {
  const [status, setStatus] = React.useState(orderDetail.status);
  const [technicians, setTechnicians] = React.useState([]);
  const [selectedTechnician, setSelectedTechnician] = React.useState(
    orderDetail.technician_name
  );

  React.useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get("http://localhost:4000/technicians", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTechnicians(response.data);
      } catch (error) {
        console.error("Error fetching technicians:", error);
      }
    };

    fetchTechnicians();
  }, []);

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);

    try {
      const response = await axios.put(
        "http://localhost:4000/updateOrderStatus",
        {
          order_detail_id: orderDetail.order_detail_id,
          new_status: newStatus,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 200) {
        console.log("สถานะอัพเดตสำเร็จ");
        onStatusChange(orderDetail.order_detail_id, newStatus);
      } else {
        console.error("สถานะอัพเดตไม่สำเร็จ:", response.statusText);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัพเดตสถานะ:", error);
    }
  };

  const handleTechnicianChange = async (event) => {
    const newTechnician = event.target.value;
    setSelectedTechnician(newTechnician);

    try {
      const response = await axios.put(
        "http://localhost:4000/updateTechnician",
        {
          order_detail_id: orderDetail.order_detail_id,
          technician_name: newTechnician,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 200) {
        console.log("พนักงานอัพเดตสำเร็จ");

        onStatusChange(orderDetail.order_detail_id, status);
      } else {
        console.error("พนักงานอัพเดตไม่สำเร็จ:", response.statusText);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัพเดตพนักงาน:", error);
    }
  };

  const categoryStyle = categoryStyles[status.trim()] || {};

  return (
    <div className="w-full bg-white border-solid border-[1px] border-[#D8D8D8] rounded-[8px] flex flex-col px-[24px] py-[16px] mb-[16px] overflow-hidden">
      <div className="flex flex-col">
        <div className="pt-[12px] pb-[6px] flex flex-col sm:flex-row justify-between">
          <p className="text-[18px] sm:text-[20px] font-medium text-black">
            คำสั่งซ่อมรหัส: {orderDetail.order_code}
          </p>
          <div className="flex flex-row items-center">
            <p className="text-[14px] pr-4">สถานะ:</p>
            <Select
              value={status}
              onChange={handleStatusChange}
              style={{
                backgroundColor: categoryStyle.backgroundColor,
                color: categoryStyle.color,
              }}
              className="text-[14px] text-gray-900 border rounded-[15px] p-1 px-3 ml-1"
            >
              <MenuItem value="รอดำเนินการ">รอดำเนินการ</MenuItem>
              <MenuItem value="กำลังดำเนินการ">กำลังดำเนินการ</MenuItem>
              <MenuItem value="ดำเนินการสำเร็จ">ดำเนินการสำเร็จ</MenuItem>
            </Select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex flex-col pt-[16px] ">
            <div className="flex flex-row">
              <img src={event} alt="event" className="mr-1 h-5" />
              <p className="text-[14px] text-gray-700">
                วันเวลาดำเนินการ: {orderDetail.order_date} เวลา{" "}
                {orderDetail.time.slice(0, 5)} น.
              </p>
            </div>

            <div className="flex flex-row pt-1">
              <img src={person2} alt="person" className="mr-1 h-5 mt-5" />
              <p className="text-[14px] text-gray-700">
                พนักงาน:
                <Select
                  value={selectedTechnician}
                  onChange={handleTechnicianChange}
                  className="text-[14px] text-gray-900 border rounded-[15px]  px-3 ml-1"
                >
                  {technicians.map((technician) => (
                    <MenuItem
                      key={technician.id}
                      value={`${technician.firstname} ${technician.lastname}`}
                      style={{
                        color:
                          technician.work_status === "กำลังทำงาน"
                            ? "orange"
                            : "green",
                      }}
                    >
                      {technician.firstname} {technician.lastname}
                    </MenuItem>
                  ))}
                </Select>
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <p className="text-[14px] pt-[7px] md:pt-0 text-gray-700">
              ราคารวม:
            </p>
            <p className="text-[18px] pt-[5px] text-gray-950 pl-4 ">
              {orderDetail.total_amount} ฿
            </p>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col justify-start">
          <p className="text-[14px] pt-[5px] md:pt-[20px] text-gray-700">
            รายการ:{" "}
          </p>
          <p className="text-[14px] pt-[5px] text-black">
            • {orderDetail.service_lists}, จำนวน{" "}
            {orderDetail.quantity_per_order} บริการ
          </p>
        </div>
      </div>
    </div>
  );
};

export default OcAdmin;
