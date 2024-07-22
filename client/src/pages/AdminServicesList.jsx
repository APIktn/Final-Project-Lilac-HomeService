// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ClipLoader } from "react-spinners";
// import { format } from "date-fns";
// import { useNavigate } from "react-router-dom";
// import { useAdminAuth } from "../contexts/adminAuthentication";
// import vectorHouse from "../assets/icons/Vector-house.svg";
// import vectorCategory from "../assets/icons/Vector-category.svg";
// import vectorService from "../assets/icons/Vector-service.svg";
// import vectorPromotionCode from "../assets/icons/Vector-promotion-code.svg";
// import vectorSearch from "../assets/icons/Vector-search.svg";

// function AdminServiceList() {
//   const [groupedServices, setGroupedServices] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [draggedService, setDraggedService] = useState(null);
//   const [itemToDelete, setItemToDelete] = useState(null); 
//   const [showDeleteModal, setShowDeleteModal] = useState(false); 
//   const { state, logout } = useAdminAuth();
//   const { admin } = state;
//   const [filteredServices, setFilteredServices] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

  
//   const navigate = useNavigate();

//   const getServices = async () => {
//     try {
//       const result = await axios.get("http://localhost:4000/adminserviceslist");
//       console.log(result.data.data)
//       const sortedGroupedServices = result.data.data;

//       // Ensure categories are sorted by position_id
//       const sortedCategories = Object.values(sortedGroupedServices).sort(
//         (a, b) => a.category.position_id - b.category.position_id
//       );

//       setGroupedServices(sortedCategories);
//       setFilteredServices(sortedCategories);
//     } catch (error) {
//       console.error("Error fetching services:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getServices();
//   }, [searchTerm]);

//   const formatDateTime = (dateString) => {
//     return format(new Date(dateString), "dd/MM/yyyy hh:mma");
//   };

//   const handleSearch = (e) => {
//     const searchValue = e.target.value.toLowerCase();
//     setSearchTerm(searchValue);
//     const filtered = groupedServices.map(group => ({
//       ...group,
//       services: group.services.filter(service =>
//         service.service_name.toLowerCase().includes(searchValue)
//       )
//     })).filter(group => group.services.length > 0);
//     setFilteredServices(filtered);

//   };
//   const handleDragStart = (e, service, categoryId) => {
//     setDraggedService({ service, categoryId });
//   };

//   const handleDrop = async (e, targetIndex, categoryId) => {
//     e.preventDefault();

//     if (!draggedService || draggedService.categoryId !== categoryId) return;

//     const { service: draggedServiceData } = draggedService;

//     let updatedServices = [
//       ...groupedServices.find(
//         (group) => group.category.category_id === categoryId
//       ).services,
//     ];

//     const draggedServiceIndex = updatedServices.findIndex(
//       (service) => service.service_id === draggedServiceData.service_id
//     );

//     // Remove the dragged service from its original position
//     updatedServices.splice(draggedServiceIndex, 1);

//     // Insert the dragged service into the new position
//     updatedServices.splice(targetIndex, 0, draggedServiceData);

//     // Update positions
//     updatedServices = updatedServices.map((service, index) => ({
//       ...service,
//       position_id: index + 1,
//     }));

//     const updatedGroupedServices = groupedServices.map((group) => {
//       if (group.category.category_id === categoryId) {
//         return {
//           ...group,
//           services: updatedServices,
//         };
//       }
//       return group;
//     });

//     setGroupedServices(updatedGroupedServices);

//     // Update the order on the server
//     try {
//       await axios.patch("http://localhost:4000/adminserviceslist/reorder", {
//         services: updatedServices.map((service) => ({
//           service_id: service.service_id,
//           position_id: service.position_id,
//           service_name: service.service_name,
//         })),
//       });
//     } catch (error) {
//       console.error("Error updating category order on the server:", error);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleDeleteClick = (service) => {
//     setItemToDelete(service); // Set itemToDelete
//     setShowDeleteModal(true); // Show delete modal
//   };

//   const handleDeleteConfirm = async () => {
//     if (!itemToDelete) return;

//     try {
//       await axios.delete(
//         `http://localhost:4000/adminserviceslist/${itemToDelete.service_id}`
//       );
//       // Remove item from groupedServices
//       const updatedGroupedServices = groupedServices.map((group) => {
//         const filteredServices = group.services.filter(
//           (service) => service.service_id !== itemToDelete.service_id
//         );
//         return { ...group, services: filteredServices };
//       });

//       setGroupedServices(updatedGroupedServices);
//       setFilteredServices(updatedGroupedServices);
//       setShowDeleteModal(false);
//       setItemToDelete(null);
//     } catch (error) {
//       console.error("Error deleting service:", error);
//     }
//   };

//   const handleDeleteCancel = () => {
//     setShowDeleteModal(false);
//     setItemToDelete(null);
//   };
//     return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="bg-[#001C59] w-[240px]  flex flex-col justify-between">                    
//         <div>
//           <div
//             className="bg-[#E7EEFF] py-1 rounded-xl flex items-center justify-center mb-12 mx-5 mt-7 w-[192px] h-[46px]"
//             onClick={() => navigate("/")}
//           >
//             <img src={vectorHouse} alt="House" className="w-[26.06px] h-[26.06px] mr-2" />
//             <span className="text-[#336DF2] text-[20px] font-medium mt-1">Homeservice</span>
//           </div>
//           <div>
//             <div className="flex items-center  p-4 hover:bg-[#022B87] cursor-pointer" 
//               onClick={() => navigate("/admin/category")}>
//               <img src={vectorCategory} alt="Category" className="mr-2 ml-2" />
//               <span className="text-[#F1F1F1] text-base ml-3">หมวดหมู่</span>
//             </div>
//             <div
//               className="flex items-center  p-4  hover:bg-[#022B87] cursor-pointer"              
//             >
//               <img src={vectorService} alt="Service" className="mr-2 ml-2" />
//               <span className="text-[#F1F1F1] text-base ml-3">บริการ</span>
//             </div>
//             <div
//               className="flex items-center  p-4  bg-[#022B87] cursor-pointer"
//               onClick={() => navigate("/admin/promotion")}            
//             >
//               <img
//                 src={vectorPromotionCode}
//                 alt="Promotion Code"
//                 className="mr-2 ml-2"
//               />
//               <span className="text-[#F1F1F1] text-base ml-3">Promotion Code</span>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center p-2 rounded-md hover:bg-[#022B87] cursor-pointer">
//           <span className="text-white"
//                   onClick={() => {
//                   logout();
//                   navigate("/admin")}}
//           >ออกจากระบบ</span>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col bg-[#EFEFF2]">
//         {/* Admin Topbar */}
//         <div className="bg-white p-4 flex  items-center">
//           <div className="text-[20px] font-medium ml-4 mr-[640px] w-[76px]">บริการ</div>
//           <div className="flex items-center ">
//           <div className="flex w-72 h-11 border rounded-md p-2 items-center ">
//               <img
//                 src={vectorSearch}
//                 alt="search-icon"
//                 className="ml-2 mr-2 h-[18px] w-[18px] "
//               />
//               <input
//                 type="text"
//                 placeholder="ค้นหาหมวดหมู่"
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 className="outline-none text-[16px] font-light"
//               />
//             </div>
//             <button
//               onClick={() => navigate("/admin/category/create")}
//               className="bg-[#336DF2] text-white -pt-[6px] px-4 rounded-md w-40 h-11 font-medium text-[16px] flex items-center justify-center ml-6"
//             >
//               <span>เพิ่มหมวดหมู่</span><span className="text-[25px] ml-3" >+</span>
//             </button>
//           </div>
//          </div>

//         {/* Admin Service List */}
//         {loading ? (
//           <div className="flex flex-1 justify-center items-center">
//             <ClipLoader color="#336DF2" />
//           </div>
//         ) : (
//           <div className="p-4 overflow-y-auto">
//             {groupedServices.map(({ category, services }) => (
//               <div
//                 key={category.category_id}
//                 className="bg-white rounded-lg shadow-md p-4 mb-4"
//                 onDrop={(e) => handleDrop(e, category.category_id)}
//                 onDragOver={handleDragOver}
//               >
//                 <h2 className="text-lg mb-2">{category.category_name}</h2>
//                 <div className="grid grid-cols-12 gap-4 items-center border-b-2 p-2 text-[14px] text-[#646C80]">
//                   <div className="col-span-1">ลำดับ</div>
//                   <div className="col-span-3">ชื่อบริการ</div>
//                   <div className="col-span-3">วันที่สร้าง</div>
//                   <div className="col-span-3">วันที่แก้ไข</div>
//                   <div className="col-span-2">การจัดการ</div>
//                 </div>
//                 {services.map((service, index) => (
//                   <div
//                     key={service.service_id}
//                     className="grid grid-cols-12 gap-4 items-center border-b-2 p-2 text-[14px] text-[#646C80] h-[88px]"
//                     draggable
//                     onDragStart={(e) =>
//                       handleDragStart(e, service, category.category_id)
//                     }
//                     onDrop={(e) => handleDrop(e, index, category.category_id)}
//                     onDragOver={handleDragOver}
//                   >
//                     <div className="col-span-1">{index + 1}</div>
//                     <div className="col-span-3">{service.service_name}</div>
//                     <div className="col-span-3">
//                       {formatDateTime(service.created_at)}
//                     </div>
//                     <div className="col-span-3">
//                       {formatDateTime(service.updated_at)}
//                     </div>
//                     <div className="col-span-2 flex space-x-2">
//                       <button
//                         className="bg-[#FF5F5F] text-white py-1 px-2 rounded-md"
//                         onClick={() => handleDeleteClick(service)}
//                       >
//                         ลบ
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         )}
        

//         {/* Delete Confirmation Modal */}
//         {showDeleteModal && (
//           <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
//             <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
//               <h2 className="text-lg mb-4">ยืนยันการลบ</h2>
//               <p>คุณแน่ใจหรือว่าต้องการลบบริการ "{itemToDelete?.service_name}"?</p>
//               <div className="flex justify-end space-x-2 mt-4">
//                 <button
//                   className="bg-[#FF5F5F] text-white py-2 px-4 rounded-md"
//                   onClick={handleDeleteConfirm}
//                 >
//                   ลบ
//                 </button>
//                 <button
//                   className="bg-[#EFEFF2] text-[#646C80] py-2 px-4 rounded-md"
//                   onClick={handleDeleteCancel}
//                 >
//                   ยกเลิก
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminServiceList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../contexts/adminAuthentication";
import vectorHouse from "../assets/icons/Vector-house.svg";
import vectorCategory from "../assets/icons/Vector-category.svg";
import vectorService from "../assets/icons/Vector-service.svg";
import vectorPromotionCode from "../assets/icons/Vector-promotion-code.svg";
import vectorSearch from "../assets/icons/Vector-search.svg";

function AdminServiceList() {
  const [groupedServices, setGroupedServices] = useState({});
  const [loading, setLoading] = useState(true);
  const [draggedService, setDraggedService] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null); 
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const { state, logout } = useAdminAuth();
  const { admin } = state;
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  
  const navigate = useNavigate();

  const getServices = async () => {
    try {
      const result = await axios.get("http://localhost:4000/adminserviceslist");
      console.log(result.data.data)
      const sortedGroupedServices = result.data.data;

      // Ensure categories are sorted by position_id
      const sortedCategories = Object.values(sortedGroupedServices).sort(
        (a, b) => a.category.position_id - b.category.position_id
      );

      setGroupedServices(sortedCategories);
      setFilteredServices(sortedCategories);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  const formatDateTime = (dateString) => {
    return format(new Date(dateString), "dd/MM/yyyy hh:mma");
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = groupedServices.map(group => ({
      ...group,
      services: group.services.filter(service =>
        service.service_name.toLowerCase().includes(searchValue)
      )
    })).filter(group => group.services.length > 0);
    setFilteredServices(filtered);

  };
  const handleDragStart = (e, service, categoryId) => {
    setDraggedService({ service, categoryId });
  };

  const handleDrop = async (e, targetIndex, categoryId) => {
    e.preventDefault();

    if (!draggedService || draggedService.categoryId !== categoryId) return;

    const { service: draggedServiceData } = draggedService;

    let updatedServices = [
      ...groupedServices.find(
        (group) => group.category.category_id === categoryId
      ).services,
    ];

    const draggedServiceIndex = updatedServices.findIndex(
      (service) => service.service_id === draggedServiceData.service_id
    );

    // Remove the dragged service from its original position
    updatedServices.splice(draggedServiceIndex, 1);

    // Insert the dragged service into the new position
    updatedServices.splice(targetIndex, 0, draggedServiceData);

    // Update positions
    updatedServices = updatedServices.map((service, index) => ({
      ...service,
      position_id: index + 1,
    }));

    const updatedGroupedServices = groupedServices.map((group) => {
      if (group.category.category_id === categoryId) {
        return {
          ...group,
          services: updatedServices,
        };
      }
      return group;
    });

    setGroupedServices(updatedGroupedServices);

    // Update the order on the server
    try {
      await axios.patch("http://localhost:4000/adminserviceslist/reorder", {
        services: updatedServices.map((service) => ({
          service_id: service.service_id,
          position_id: service.position_id,
          service_name: service.service_name,
        })),
      });
    } catch (error) {
      console.error("Error updating category order on the server:", error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDeleteClick = (service) => {
    setItemToDelete(service); // Set itemToDelete
    setShowDeleteModal(true); // Show delete modal
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    try {
      await axios.delete(
        `http://localhost:4000/adminserviceslist/${itemToDelete.service_id}`
      );
      // Remove item from groupedServices
      const updatedGroupedServices = groupedServices.map((group) => {
        const filteredServices = group.services.filter(
          (service) => service.service_id !== itemToDelete.service_id
        );
        return { ...group, services: filteredServices };
      });

      setGroupedServices(updatedGroupedServices);
      setFilteredServices(updatedGroupedServices);
      setShowDeleteModal(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };
  // const ServiceList =({services,category}) => (<div
  //   key={category.category_id}
  //   className="bg-white rounded-lg shadow-md p-4 mb-4"
  //   onDrop={(e) => handleDrop(e, category.category_id)}
  //   onDragOver={handleDragOver}
  // >
  //   <h2 className="text-lg mb-2">{category.category_name}</h2>
  //   <div className="grid grid-cols-12 gap-4 items-center border-b-2 p-2 text-[14px] text-[#646C80]">
  //     <div className="col-span-1">ลำดับ</div>
  //     <div className="col-span-3">ชื่อบริการ</div>
  //     <div className="col-span-3">วันที่สร้าง</div>
  //     <div className="col-span-3">วันที่แก้ไข</div>
  //     <div className="col-span-2">การจัดการ</div>
  //   </div>
  //   {services.map((service, index) => (
  //     <div
  //       key={service.service_id}
  //       className="grid grid-cols-12 gap-4 items-center border-b-2 p-2 text-[14px] text-[#646C80] h-[88px]"
  //       draggable
  //       onDragStart={(e) =>
  //         handleDragStart(e, service, category.category_id)
  //       }
  //       onDrop={(e) => handleDrop(e, index, category.category_id)}
  //       onDragOver={handleDragOver}
  //     >
  //       <div className="col-span-1">{index + 1}</div>
  //       <div className="col-span-3">{service.service_name}</div>
  //       <div className="col-span-3">
  //         {formatDateTime(service.created_at)}
  //       </div>
  //       <div className="col-span-3">
  //         {formatDateTime(service.updated_at)}
  //       </div>
  //       <div className="col-span-2 flex space-x-2">
  //         <button
  //           className="bg-[#FF5F5F] text-white py-1 px-2 rounded-md"
  //           onClick={() => handleDeleteClick(service)}
  //         >
  //           ลบ
  //         </button>
  //       </div>
  //     </div>
  //   ))}
  // </div>);
    return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-[#001C59] w-[240px]  flex flex-col justify-between">                    
        <div>
          <div
            className="bg-[#E7EEFF] py-1 rounded-xl flex items-center justify-center mb-12 mx-5 mt-7 w-[192px] h-[46px]"
            onClick={() => navigate("/")}
          >
            <img src={vectorHouse} alt="House" className="w-[26.06px] h-[26.06px] mr-2" />
            <span className="text-[#336DF2] text-[20px] font-medium mt-1">Homeservice</span>
          </div>
          <div>
            <div className="flex items-center  p-4 hover:bg-[#022B87] cursor-pointer" 
              onClick={() => navigate("/admin/category")}>
              <img src={vectorCategory} alt="Category" className="mr-2 ml-2" />
              <span className="text-[#F1F1F1] text-base ml-3">หมวดหมู่</span>
            </div>
            <div
              className="flex items-center  p-4  hover:bg-[#022B87] cursor-pointer"              
            >
              <img src={vectorService} alt="Service" className="mr-2 ml-2" />
              <span className="text-[#F1F1F1] text-base ml-3">บริการ</span>
            </div>
            <div
              className="flex items-center  p-4  bg-[#022B87] cursor-pointer"
              onClick={() => navigate("/admin/promotion")}            
            >
              <img
                src={vectorPromotionCode}
                alt="Promotion Code"
                className="mr-2 ml-2"
              />
              <span className="text-[#F1F1F1] text-base ml-3">Promotion Code</span>
            </div>
          </div>
        </div>
        <div className="flex items-center p-2 rounded-md hover:bg-[#022B87] cursor-pointer">
          <span className="text-white"
                  onClick={() => {
                  logout();
                  navigate("/admin")}}
          >ออกจากระบบ</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#EFEFF2]">
        {/* Admin Topbar */}
        <div className="bg-white p-4 flex  items-center">
          <div className="text-[20px] font-medium ml-4 mr-[640px] w-[76px]">บริการ</div>
          <div className="flex items-center ">
          <div className="flex w-72 h-11 border rounded-md p-2 items-center ">
              <img
                src={vectorSearch}
                alt="search-icon"
                className="ml-2 mr-2 h-[18px] w-[18px] "
              />
              <input
                type="text"
                placeholder="ค้นหาหมวดหมู่"
                value={searchTerm}
                onChange={handleSearch}
                className="outline-none text-[16px] font-light"
              />
            </div>
            <button
              onClick={() => navigate("/admin/category/create")}
              className="bg-[#336DF2] text-white -pt-[6px] px-4 rounded-md w-40 h-11 font-medium text-[16px] flex items-center justify-center ml-6"
            >
              <span>เพิ่มหมวดหมู่</span><span className="text-[25px] ml-3" >+</span>
            </button>
          </div>
         </div>

        {/* Admin Service List */}
        {loading ? (
          <div className="flex flex-1 justify-center items-center">
            <ClipLoader color="#336DF2" />
          </div>
        ) : (
          <div className="p-4 overflow-y-auto">
           {searchTerm ? (
  filteredServices.map(({ category, services }) => (
    <div
    key={category.category_id}
    className="bg-white rounded-lg shadow-md p-4 mb-4"
    onDrop={(e) => handleDrop(e, category.category_id)}
    onDragOver={handleDragOver}
  >
    <h2 className="text-lg mb-2">{category.category_name}</h2>
    <div className="grid grid-cols-12 gap-4 items-center border-b-2 p-2 text-[14px] text-[#646C80]">
      <div className="col-span-1">ลำดับ</div>
      <div className="col-span-3">ชื่อบริการ</div>
      <div className="col-span-3">วันที่สร้าง</div>
      <div className="col-span-3">วันที่แก้ไข</div>
      <div className="col-span-2">การจัดการ</div>
    </div>
    {services.map((service, index) => (
      <div
        key={service.service_id}
        className="grid grid-cols-12 gap-4 items-center border-b-2 p-2 text-[14px] text-[#646C80] h-[88px]"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, service, category.category_id)
        }
        onDrop={(e) => handleDrop(e, index, category.category_id)}
        onDragOver={handleDragOver}
      >
        <div className="col-span-1">{index + 1}</div>
        <div className="col-span-3">{service.service_name}</div>
        <div className="col-span-3">
          {formatDateTime(service.created_at)}
        </div>
        <div className="col-span-3">
          {formatDateTime(service.updated_at)}
        </div>
        <div className="col-span-2 flex space-x-2">
          <button
            className="bg-[#FF5F5F] text-white py-1 px-2 rounded-md"
            onClick={() => handleDeleteClick(service)}
          >
            ลบ
          </button>
        </div>
      </div>
    ))}
  </div>
  ))
) : (
  groupedServices.map(({ category, services }) => (
    <div
    key={category.category_id}
    className="bg-white rounded-lg shadow-md p-4 mb-4"
    onDrop={(e) => handleDrop(e, category.category_id)}
    onDragOver={handleDragOver}
  >
    <h2 className="text-lg mb-2">{category.category_name}</h2>
    <div className="grid grid-cols-12 gap-4 items-center border-b-2 p-2 text-[14px] text-[#646C80]">
      <div className="col-span-1">ลำดับ</div>
      <div className="col-span-3">ชื่อบริการ</div>
      <div className="col-span-3">วันที่สร้าง</div>
      <div className="col-span-3">วันที่แก้ไข</div>
      <div className="col-span-2">การจัดการ</div>
    </div>
    {services.map((service, index) => (
      <div
        key={service.service_id}
        className="grid grid-cols-12 gap-4 items-center border-b-2 p-2 text-[14px] text-[#646C80] h-[88px]"
        draggable
        onDragStart={(e) =>
          handleDragStart(e, service, category.category_id)
        }
        onDrop={(e) => handleDrop(e, index, category.category_id)}
        onDragOver={handleDragOver}
      >
        <div className="col-span-1">{index + 1}</div>
        <div className="col-span-3">{service.service_name}</div>
        <div className="col-span-3">
          {formatDateTime(service.created_at)}
        </div>
        <div className="col-span-3">
          {formatDateTime(service.updated_at)}
        </div>
        <div className="col-span-2 flex space-x-2">
          <button
            className="bg-[#FF5F5F] text-white py-1 px-2 rounded-md"
            onClick={() => handleDeleteClick(service)}
          >
            ลบ
          </button>
        </div>
      </div>
    ))}
  </div>
  ))
)}
          </div>
        )}
        

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
              <h2 className="text-lg mb-4">ยืนยันการลบ</h2>
              <p>คุณแน่ใจหรือว่าต้องการลบบริการ "{itemToDelete?.service_name}"?</p>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  className="bg-[#FF5F5F] text-white py-2 px-4 rounded-md"
                  onClick={handleDeleteConfirm}
                >
                  ลบ
                </button>
                <button
                  className="bg-[#EFEFF2] text-[#646C80] py-2 px-4 rounded-md"
                  onClick={handleDeleteCancel}
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminServiceList;