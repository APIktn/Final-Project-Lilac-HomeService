import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import vectorCategory from "../assets/icons/Vector-category.svg";
import vectorService from "../assets/icons/Vector-service.svg";
import vectorPromotionCode from "../assets/icons/Vector-promotion-code.svg";
import vectorHouse from "../assets/icons/Vector-house.svg";
import vectorLogout from "../assets/icons/Vector-logout.svg";
import vectorUpload from "../assets/icons/Vector-upload.svg";
import vectorDragDrop from "../assets/icons/Vector-dragdrop.svg";
import axios from "axios";
import { useAdminAuth } from "../contexts/adminAuthentication";
import Frame from "../assets/icons/Frame.svg";
import { format } from "date-fns";
import dayjs from "dayjs";

function AdminServiceView() {
  // const [servicename, setServicename] = useState("");
  const navigate = useNavigate();  
  const [serviceName, setServiceName] = useState([]); 
  const { state, logout } = useAdminAuth();
  const { admin } = state;
  const { service_name } = useParams();
  const [createService, setCreateService] = useState(false);  
  const [categoryName, setCategoryName] = useState("");
  const[categories,setCategories] = useState([])   
  

  const getServicesEdit = async (service_name) => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/adminservice/${service_name}`
      );

      console.log("Fetched category:", result.data.data);

      setServiceName(result.data.data);      
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    if (service_name) {
      getServicesEdit(service_name);
    }
  }, [service_name]);
  

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
         <span className="text-[#336DF2] text-[20px] font-medium mt-1">HomeServices</span>
       </div>
       <div>
         <div className="flex items-center  p-4 hover:bg-[#022B87] cursor-pointer" 
           onClick={() => navigate("/admin/category")}>
           <img src={vectorCategory} alt="Category" className="mr-2 ml-2" />
           <span className="text-[#F1F1F1] text-base ml-3">หมวดหมู่</span>
         </div>
         <div
           className="flex items-center  p-4  bg-[#022B87] cursor-pointer"              
         >
           <img src={vectorService} alt="Service" className="mr-2 ml-2" />
           <span className="text-[#F1F1F1] text-base ml-3">บริการ</span>
         </div>
         <div
           className="flex items-center  p-4  hover:bg-[#022B87] cursor-pointer"
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
     <div className="flex items-center p-2 hover:bg-[#022B87] cursor-pointer  ml-5 mb-16">
     <img src={vectorLogout} alt="Logout" className="mr-2" />
       <span className="text-[#F1F1F1] text-base ml-2"
               onClick={() => {
               logout();
               navigate("/admin")}}
       >ออกจากระบบ</span>
     </div>
   </div>


     {/* Main Content */}
     <div className="flex-1 flex flex-col bg-[#EFEFF2]">
       {/* Admin Topbar */}
       <div className="bg-white p-4 flex justify-between items-center h-[80px]">
        <div className="flex flex-row -ml-8">
       <img src={Frame} alt="frame" className="ml-10" />
       <div className="ml-5 mt-4">    
         <p className="text-[14px] font-normal text-[#646C80]">บริการ</p>    
         <p className="text-[20px] font-medium text-[#232630]"
         >
           {serviceName.length > 0 ? serviceName[0].service_name : "Loading..."}
          </p>     
        </div> 
        </div>          
         <div className="flex items-center space-x-6 mr-8">
           <button
             onClick={() => navigate(`/admin/service/edit/${serviceName.length > 0 ? serviceName[0].service_name : "Loading..."}`)}
             className="bg-[#336DF2]  text-white py-2 px-4 rounded-md w-[112px] h-11"
           >
             แก้ไข
           </button>
           
         </div>
       </div>
         <div className="p-4 pt-8 flex-1 overflow-auto  mx-4 ">
           
            <div className="bg-white p-4  ">
            <div>
              <span className="block ml-3 font-medium text-[16px] text-[#646C80] pt-2">
                 ชื่อบริการ
              <span className="ml-64 font-normal text-[16px] text-[#000000]">
              {serviceName.length > 0 ? serviceName[0].service_name : "Loading..."}                
              </span>                        
              </span>
            </div>
            <div>
              <span className="block ml-3 font-medium text-[16px] text-[#646C80] py-10">
                 หมวดหมู่
              <span className="ml-[260px] font-normal text-[16px] text-[#000000]">
              {serviceName.length > 0 ? serviceName[0].categories.category_name : "Loading..."}                
              </span>                        
              </span>
            </div>
            <div>
              <span className="block ml-3 font-medium text-[16px] text-[#646C80] pt-10 -mt-9">
                 รูปภาพ
            <div className="ml-[260px] ">
               <img
                 src={serviceName.length > 0 ? serviceName[0].image : ""}    
                 alt={serviceName.length > 0 ? serviceName[0].service_name : "Loading..."}
                className="w-[300px] h-[200px] rounded-lg -mt-5 mb-10 ml-14"
               />
            </div>     
            </span>               
            </div>
            <hr className="border-t-2 border-[#E6E7EB] w-[1235px] ml-3" />
            <span className="block ml-3 font-medium text-[16px] text-[#646C80] py-10 mt-3">
                 รายการบริการย่อย
            </span> 

            {serviceName.map((service, index) => (
            <div key={index} className="mb-4">
            {/* Service items with headers repeated for each item */}
            {service.service_list.map((serviceItem, idx) => (
           <div key={idx} className="mb-2">
            {/* Header for each service item */}
           <div className="service-header grid grid-cols-3 gap-1 mb-2 ml-3">
          <span className="font-normal text-[14px] text-[#646C80]">ชื่อรายการ</span>
          <span className="font-normal text-[14px] text-[#646C80] ml-28">หน่วยการบริการ</span>
          <span className="font-normal text-[14px] text-[#646C80] ">ค่าบริการ / 1 หน่วย</span>
          </div>

           {/* Service item details */}
         <div className="service-list grid grid-cols-3 gap-1 mb-10 ml-3">
          <span className="font-normal text-[16px] text-[#000000]">
            {serviceItem.service_lists || "Loading..."}
          </span>
          <span className="font-normal text-[16px] text-[#000000] ml-28">
            {serviceItem.units || "Loading..."}
          </span>
          <span className="font-normal text-[16px] text-[#000000] ">
            {serviceItem.price || "Loading..."}
          </span>
          </div>
          </div>
         ))}
         </div>
         ))}
            <hr className="border-t-2 border-[#E6E7EB] w-[1235px] ml-3  pt-10" />
            <span className="block ml-3 font-medium text-[16px] text-[#646C80] pt-5">
                 สร้างเมื่อ
              <span className="ml-[240px] font-normal text-[16px] text-[#000000]">
              {serviceName.length > 0 ? dayjs(serviceName[0].service_list[0].created_at).format("DD/MM/YYYY HH:mm A") : "Loading..."}               
              </span>                        
              </span>
              <span className="block ml-3 font-medium text-[16px] text-[#646C80] pt-10 pb-3">
                 แก้ไขล่าสุด
              <span className="ml-[228px] font-normal text-[16px] text-[#000000]">
              {serviceName.length > 0 ? dayjs(serviceName[0].service_list[0].updated_at).format("DD/MM/YYYY HH:mm A") : "Loading..."}               
              </span>                        
              </span>
            </div>
            </div>
      </div>
      </div>   
  );
}

export default AdminServiceView;