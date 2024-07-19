import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import vectorCategory from "../assets/icons/Vector-category.svg";
import vectorService from "../assets/icons/Vector-service.svg";
import vectorPromotionCode from "../assets/icons/Vector-promotion-code.svg";
import vectorHouse from "../assets/icons/Vector-house.svg";
import vectorLogout from "../assets/icons/Vector-logout.svg";
import vectorDragDrop from "../assets/icons/Vector-dragdrop.svg";
import vectorBin from "../assets/icons/Vector-bin.svg";
import vectorEdit from "../assets/icons/Vector-edit.svg";
import vectorAlert from "../assets/icons/Vector-alert.svg";
import vectorClose from "../assets/icons/Vector-close.svg";
import vectorSearch from "../assets/icons/Vector-search.svg";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { format } from "date-fns";

const initialItems = [
  {
    id: "1",
    service: "ล้างแอร์",
    category: "บริการทั่วไป",
    created: "12/02/2022 10.30PM",
    modified: "12/02/2022 10.30PM",
  },
  {
    id: "2",
    service: "ซ่อมแอร์",
    category: "บริการห้องครัว",
    created: "15/03/2022 12.00PM",
    modified: "15/03/2022 12.00PM",
  },
  {
    id: "3",
    category: "บริการห้องน้ำ",
    service: "ล้างห้องน้ำ",
    created: "18/04/2022 9.30AM",
    modified: "18/04/2022 9.30AM",
  },
  {
    id: "4",
    service: "ซ่อมรถ",
    category: "บริการห้องอื่น ๆ",
    created: "18/04/2022 9.30AM",
    modified: "18/04/2022 9.30AM",
  },
  {
    id: "5",
    service: "ยกของ",
    category: "บริการทั่วไป",
    created: "18/04/2022 9.30AM",
    modified: "18/04/2022 9.30AM",
  },
  {
    id: "6",
    service: "ติดตั้งเตาอบ",
    category: "บริการห้องครัว",
    created: "18/04/2022 9.30AM",
    modified: "18/04/2022 9.30AM",
  },
  {
    id: "7",
    service: "ติดตั้งชักโครก",
    category: "บริการห้องน้ำ",
    created: "18/04/2022 9.30AM",
    modified: "18/04/2022 9.30AM",
  },
  {
    id: "8",
    service: "ซ่อมท่อ",
    category: "บริการห้องอื่น ๆ",
    created: "18/04/2022 9.30AM",
    modified: "18/04/2022 9.30AM",
  },
];

const categoryStyles = {
  บริการทั่วไป: {
    backgroundColor: "#E7EEFF",
    color: "#0E3FB0",
  },
  บริการห้องครัว: {
    backgroundColor: "#ECE6FF",
    color: "#4512B4",
  },
  บริการห้องน้ำ: {
    backgroundColor: "#DFF9F6",
    color: "#00596C",
  },
};

function DashBoardService() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const[itemdropdown,setItemdropdown] = useState('');

  const handleDragStart = (e, draggedIndex) => {
    e.dataTransfer.setData("draggedIndex", draggedIndex.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, droppedIndex) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("draggedIndex"));
    const draggedItem = items[draggedIndex];

    let newItems = items.filter((item, index) => index !== draggedIndex);

    newItems.splice(droppedIndex, 0, draggedItem);

    newItems = newItems.map((item, index) => ({
      ...item,
      ลำดับที่: index + 1,
    }));

    setItems(newItems);
    setFilteredItems(newItems);
    setItemdropdown(newItems)
  };

  const handleCategoryCreate = (newCategory) => {
    const updatedItems = [...items, newCategory];
    setItems(updatedItems);
    setFilteredItems(updatedItems);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = items.filter((item) =>
      item.categories.category_name.toLowerCase().includes(searchValue));
    setFilteredItems(filtered);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setItems(items.filter((item) => item.service_id !== itemToDelete.service_id));
    setFilteredItems(
      filteredItems.filter((item) => item.service_id !== itemToDelete.service_id)
    );
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const getServicesAdmin = async () => {

    try {

      const result = await axios.get(`http://localhost:4000/adminserviceslist`);

      const services = Object.values(result.data.data).flat();

      setItems(services);

      setFilteredItems(services);

      console.log("Fetched services:", services);

    } catch (error) {

      console.error("Error fetching services:", error);

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    getServicesAdmin();

  },[itemdropdown]);

  const formatDateTime = (dateString) => {
    return format(new Date(dateString), "dd/MM/yyyy hh:mma");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-[#001C59] w-[240px] p-4 flex flex-col justify-between">
        <div>
          <div
            className="bg-[#E7EEFF] p-2 rounded-lg flex items-center justify-center mb-6"
            onClick={() => navigate("/")}
          >
            <img src={vectorHouse} alt="House" className="mr-2" />
            <span className="text-[#336DF2] text-[20px]">Homeservice</span>
          </div>
          <div
            className="flex items-center mb-4 p-2 rounded-md hover:bg-[#022B87] cursor-pointer"
            onClick={() => navigate("/admin/dashboard")}
          >
            <img src={vectorCategory} alt="Category" className="mr-2" />
            <span className="text-white">หมวดหมู่</span>
          </div>
          <div className="flex items-center mb-4 p-2 rounded-md bg-[#022B87] cursor-pointer">
            <img src={vectorService} alt="Service" className="mr-2" />
            <span className="text-white">บริการ</span>
          </div>
          <div
            className="flex items-center p-2 rounded-md hover:bg-[#022B87] cursor-pointer"
            onClick={() => navigate("/admin/promotion")}
          >
            <img
              src={vectorPromotionCode}
              alt="Promotion Code"
              className="mr-2"
            />
            <span className="text-white">Promotion Code</span>
          </div>
        </div>
        <div className="flex items-center p-2 rounded-md hover:bg-[#022B87] cursor-pointer">
          <img src={vectorLogout} alt="Logout" className="mr-2" />
          <span className="text-white">ออกจากระบบ</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#EFEFF2]">
        {/* Admin Topbar */}
        <div className="bg-white p-4 flex justify-between items-center">
          <div className="text-lg">บริการ</div>
          <div className="flex items-center space-x-4">
            <div className="flex w-72 h-11 border rounded-md p-2 items-center">
              <img
                src={vectorSearch}
                alt="search-icon"
                className="ml-2 mr-2 h-[18px] w-[18px] "
              />
              <input
                type="text"
                placeholder="ค้นหาบริการ"
                value={searchTerm}
                onChange={handleSearch}
                className="outline-none text-[16px] font-light"
              />
            </div>
            <button

           

              onClick={() => navigate("/admin/service/create")}

              className="bg-[#336DF2] text-white py-2 px-4 rounded-md w-40 h-11"
            >
              เพิ่มบริการ +
            </button>
          </div>
        </div>

        
        {/* Workspace */}
        <div className="p-4 pt-8 flex-1 overflow-auto rounded-md shadow-md">
          <div className="rounded-md shadow-md rounded-b-none">
            <div
              style={{ fontWeight: 400 }}
              className="grid grid-cols-12 gap-4 items-center bg-[#E6E7EB] rounded-md p-2 shadow-md border border-[#EFEFF2] text-[14px] text-[#646C80]"
            >
              <div className="col-span-1"></div>
              <div className="col-span-1">ลำดับ</div>
              <div className="col-span-3 ml-3">ชื่อบริการ</div>
              <div className="col-span-2">หมวดหมู่</div>
              <div className="col-span-2">สร้างเมื่อ</div>
              <div className="col-span-2">แก้ไขล่าสุด</div>
              <div className="col-span-1">Action</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md rounded-t-none">
            {filteredItems.map((item, index) => {
               const categoryStyle = categoryStyles[item.categories.category_name] || {


                backgroundColor: "#fde68a",
                color: "#f97316",
              };
              return (
                <div
                key={item.service_id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e)}
                  onDrop={(e) => handleDrop(e, index)}
                  className="grid grid-cols-12 gap-4 items-center mb-4 bg-white rounded-md p-2 shadow-sm"
                >
                  <div className="col-span-1 flex items-center cursor-grab">
                    <img
                      src={vectorDragDrop}
                      alt="DragDrop"
                      className="mr-2 cursor-grab"
                    />
                    <img
                      src={vectorDragDrop}
                      alt="DragDrop"
                      className="mr-2 cursor-grab -ml-1"
                    />
                  </div>
                  <div className="col-span-1">{index + 1}</div>
                  <div
                    className="col-span-3"
                    style={{
                      weight: 400,
                    }}
                  >
                    {item.service_name}
                  </div>
                  <div
                    className="col-span-2 w-fit"
                    style={{
                      backgroundColor: categoryStyle.backgroundColor,
                      color: categoryStyle.color,
                      padding: "4px 10px",
                      borderRadius: "8px",
                    }}
                  >
                    <p className="text-xs">{item.categories.category_name}</p>
                  </div>
                  <div className="col-span-2">{formatDateTime(item.created_at)}</div>
                  <div className="col-span-2"> {formatDateTime(item.updated_at)}</div>
                  <div className="col-span-1 flex space-x-2 justify-between">
                    <img
                      src={vectorBin}
                      alt="Bin"
                      className="cursor-pointer"
                      onClick={() => handleDeleteClick(item)}
                    />
                    <img
                      src={vectorEdit}
                      alt="Edit"
                      className="cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/admindashboard/category/${encodeURIComponent(
                            item.category
                          )}`
                        )
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="relative flex flex-col bg-white w-[360px] h-[270px] p-6 rounded-lg justify-center items-center">
            {/* Close Button */}
            <img
              src={vectorClose}
              alt="Close"
              className="absolute top-4 right-4 cursor-pointer"
              onClick={handleDeleteCancel}
            />

            {/* Modal Content */}
            <div className="flex  mb-4 flex-col items-center">
              <img src={vectorAlert} alt="Alert" className="mr-2" />
              <span className="text-lg">ยืนยันการลบรายการ?</span>
            </div>
            <div className="mb-4">
              คุณต้องการลบรายการ ‘{itemToDelete?.category}’ ใช่หรือไม่
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDeleteConfirm}
                className="bg-[#336DF2] text-white py-2 px-4 rounded-md"
                style={{ padding: "10px 24px", borderRadius: "8px" }}
              >
                ลบรายการ
              </button>
              <button
                onClick={handleDeleteCancel}
                className="bg-white text-[#336DF2] py-2 px-4 rounded-md border border-[#336DF2]"
                style={{ padding: "10px 24px", borderRadius: "8px" }}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashBoardService;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import vectorCategory from "../assets/icons/Vector-category.svg";
// import vectorService from "../assets/icons/Vector-service.svg";
// import vectorPromotionCode from "../assets/icons/Vector-promotion-code.svg";
// import vectorHouse from "../assets/icons/Vector-house.svg";
// import vectorLogout from "../assets/icons/Vector-logout.svg";
// import vectorDragDrop from "../assets/icons/Vector-dragdrop.svg";
// import vectorBin from "../assets/icons/Vector-bin.svg";
// import vectorEdit from "../assets/icons/Vector-edit.svg";
// import vectorAlert from "../assets/icons/Vector-alert.svg";
// import vectorClose from "../assets/icons/Vector-close.svg";
// import vectorSearch from "../assets/icons/Vector-search.svg";
// import { ClipLoader } from "react-spinners";
// import axios from "axios";
// import { format } from "date-fns";

// const categoryStyles = {
//   "บริการทั่วไป": {
//     backgroundColor: "#E7EEFF",
//     color: "#0E3FB0",
//   },
//   "บริการห้องครัว": {
//     backgroundColor: "#ECE6FF",
//     color: "#4512B4",
//   },
//   "บริการห้องน้ำ": {
//     backgroundColor: "#DFF9F6",
//     color: "#00596C",
//   },
// };

// function DashBoardService() {
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const handleDragStart = (e, draggedIndex) => {
//     e.dataTransfer.setData("draggedIndex", draggedIndex.toString());
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e, droppedIndex) => {
//     e.preventDefault();
//     const draggedIndex = parseInt(e.dataTransfer.getData("draggedIndex"));
//     const draggedItem = items[draggedIndex];

//     let newItems = items.filter((item, index) => index !== draggedIndex);

//     newItems.splice(droppedIndex, 0, draggedItem);

//     newItems = newItems.map((item, index) => ({
//       ...item,
//       ลำดับที่: index + 1,
//     }));

//     setItems(newItems);
//     setFilteredItems(newItems);
//   };

//   const handleCategoryCreate = (newCategory) => {
//     const updatedItems = [...items, newCategory];
//     setItems(updatedItems);
//     setFilteredItems(updatedItems);
//   };

//   const handleSearch = (e) => {
//     const searchValue = e.target.value.toLowerCase();
//     setSearchTerm(searchValue);
//     const filtered = items.filter((item) =>
//       item.categories.category_name.toLowerCase().includes(searchValue)
//     );
//     setFilteredItems(filtered);
//   };

//   const handleDeleteClick = (item) => {
//     setItemToDelete(item);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteConfirm = () => {
//     setItems(items.filter((item) => item.service_id !== itemToDelete.service_id));
//     setFilteredItems(
//       filteredItems.filter((item) => item.service_id !== itemToDelete.service_id)
//     );
//     setShowDeleteModal(false);
//     setItemToDelete(null);
//   };

//   const handleDeleteCancel = () => {
//     setShowDeleteModal(false);
//     setItemToDelete(null);
//   };

//   const getServicesAdmin = async () => {
//     try {
//       const result = await axios.get(`http://localhost:4000/adminserviceslist`);
//       const services = Object.values(result.data.data).flat();
//       setItems(services);
//       setFilteredItems(services);
//       console.log("Fetched services:", services);
//     } catch (error) {
//       console.error("Error fetching services:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getServicesAdmin();
//   }, []);

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="bg-[#001C59] w-[240px] p-4 flex flex-col justify-between">
//         <div>
//           <div
//             className="bg-[#E7EEFF] p-2 rounded-lg flex items-center justify-center mb-6"
//             onClick={() => navigate("/")}
//           >
//             <img src={vectorHouse} alt="House" className="mr-2" />
//             <span className="text-[#336DF2] text-[20px]">Homeservice</span>
//           </div>
//           <div
//             className="flex items-center mb-4 p-2 rounded-md hover:bg-[#022B87] cursor-pointer"
//             onClick={() => navigate("/admin/dashboard")}
//           >
//             <img src={vectorCategory} alt="Category" className="mr-2" />
//             <span className="text-white">หมวดหมู่</span>
//           </div>
//           <div className="flex items-center mb-4 p-2 rounded-md bg-[#022B87] cursor-pointer">
//             <img src={vectorService} alt="Service" className="mr-2" />
//             <span className="text-white">บริการ</span>
//           </div>
//           <div
//             className="flex items-center p-2 rounded-md hover:bg-[#022B87] cursor-pointer"
//             onClick={() => navigate("/admin/promotion")}
//           >
//             <img
//               src={vectorPromotionCode}
//               alt="Promotion Code"
//               className="mr-2"
//             />
//             <span className="text-white">Promotion Code</span>
//           </div>
//         </div>
//         <div className="flex items-center p-2 rounded-md hover:bg-[#022B87] cursor-pointer">
//           <img src={vectorLogout} alt="Logout" className="mr-2" />
//           <span className="text-white">ออกจากระบบ</span>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col bg-[#EFEFF2]">
//         {/* Admin Topbar */}
//         <div className="bg-white p-4 flex justify-between items-center">
//           <div className="text-lg">บริการ</div>
//           <div className="flex items-center space-x-4">
//             <div className="flex w-72 h-11 border rounded-md p-2 items-center">
//               <img
//                 src={vectorSearch}
//                 alt="search-icon"
//                 className="ml-2 mr-2 h-[18px] w-[18px] "
//               />
//               <input
//                 type="text"
//                 placeholder="ค้นหาบริการ"
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 className="outline-none text-[16px] font-light"
//               />
//             </div>
//             <button
//               onClick={() => navigate("/admin/service/create")}
//               className="bg-[#336DF2] text-white py-2 px-4 rounded-md w-40 h-11"
//             >
//               เพิ่มบริการ +
//             </button>
//           </div>
//         </div>

//         {/* Workspace */}
//         <div className="p-4 pt-8 flex-1 overflow-auto rounded-md shadow-md">
//           <div className="rounded-md shadow-md rounded-b-none">
//             <div
//               style={{ fontWeight: 400 }}
//               className="grid grid-cols-12 gap-4 items-center bg-[#E6E7EB] rounded-md p-2 shadow-md border border-[#EFEFF2] text-[14px] text-[#646C80]"
//             >
//               <div className="col-span-1"></div>
//               <div className="col-span-1">ลำดับ</div>
//               <div className="col-span-3 ml-3">ชื่อบริการ</div>
//               <div className="col-span-2">หมวดหมู่</div>
//               <div className="col-span-2">สร้างเมื่อ</div>
//               <div className="col-span-2">แก้ไขล่าสุด</div>
//               <div className="col-span-1">Action</div>
//             </div>
//           </div>
//           <div className="bg-white p-4 rounded-md shadow-md rounded-t-none">
//             {filteredItems.map((item, index) => {
//               const categoryStyle = categoryStyles[item.categories.category_name] || {
//                 backgroundColor: "#fde68a",
//                 color: "#f97316",
//               };
//               return (
//                 <div
//                   key={item.service_id}
//                   draggable
//                   onDragStart={(e) => handleDragStart(e, index)}
//                   onDragOver={(e) => handleDragOver(e)}
//                   onDrop={(e) => handleDrop(e, index)}
//                   className="grid grid-cols-12 gap-4 items-center mb-4 bg-white rounded-md p-2 shadow-sm"
//                 >
//                   <div className="col-span-1 flex items-center cursor-grab">
//                     <img
//                       src={vectorDragDrop}
//                       alt="DragDrop"
//                       className="mr-2 cursor-grab"
//                     />
//                     <img
//                       src={vectorDragDrop}
//                       alt="DragDrop"
//                       className="cursor-grab"
//                     />
//                   </div>
//                   <div className="col-span-1">{item.ลำดับที่}</div>
//                   <div className="col-span-3 ml-3">{item.service_name}</div>
//                   <div className="col-span-2">
//                     <div
//                       className="py-1 px-2 rounded-md text-center"
//                       style={{
//                         backgroundColor: categoryStyle.backgroundColor,
//                         color: categoryStyle.color,
//                       }}
//                     >
//                       {item.categories.category_name}
//                     </div>
//                   </div>
//                   <div className="col-span-2">
//                     {format(new Date(item.created_at), "dd MMM yyyy")}
//                   </div>
//                   <div className="col-span-2">
//                     {format(new Date(item.updated_at), "dd MMM yyyy")}
//                   </div>
//                   <div className="col-span-1 flex items-center justify-center space-x-2">
//                     <img
//                       src={vectorEdit}
//                       alt="Edit"
//                       className="cursor-pointer"
//                       onClick={() =>
//                         navigate(`/admin/service/edit/${item.service_id}`)
//                       }
//                     />
//                     <img
//                       src={vectorBin}
//                       alt="Delete"
//                       className="cursor-pointer"
//                       onClick={() => handleDeleteClick(item)}
//                     />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Delete Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-8 rounded-lg shadow-lg">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl">Confirm Delete</h2>
//               <img
//                 src={vectorClose}
//                 alt="Close"
//                 className="cursor-pointer"
//                 onClick={handleDeleteCancel}
//               />
//             </div>
//             <p>Are you sure you want to delete this item?</p>
//             <div className="flex justify-end space-x-4 mt-4">
//               <button
//                 className="bg-gray-300 text-black py-2 px-4 rounded-md"
//                 onClick={handleDeleteCancel}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-red-500 text-white py-2 px-4 rounded-md"
//                 onClick={handleDeleteConfirm}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {loading && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <ClipLoader color="#ffffff" size={100} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default DashBoardService;
