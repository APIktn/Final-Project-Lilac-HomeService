//drag and drop work
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { format } from "date-fns";

function AdminServiceList() {
  const [groupedServices, setGroupedServices] = useState({});
  const [loading, setLoading] = useState(true);
  const [draggedService, setDraggedService] = useState(null);

  const getServices = async () => {
    try {
      const result = await axios.get("http://localhost:4000/adminserviceslist");
      const sortedGroupedServices = result.data.data;

      // Ensure categories are sorted by position_id
      const sortedCategories = Object.values(sortedGroupedServices).sort(
        (a, b) => a.category.position_id - b.category.position_id
      );

      setGroupedServices(sortedCategories);
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

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-[#001C59] w-[240px] p-4 flex flex-col justify-between">
        <div>
          <div
            className="bg-[#E7EEFF] p-2 rounded-lg flex items-center justify-center mb-6"
            onClick={() => navigate("/")}
          >
            <span className="text-[#336DF2] text-[20px]">Homeservice</span>
          </div>
          <div>
            <div
              className="flex items-center mb-4 p-2 rounded-md hover:bg-[#022B87] cursor-pointer"
              onClick={() => navigate("/admin/category")}
            >
              <span className="text-white">หมวดหมู่</span>
            </div>
            <div className="flex items-center mb-4 p-2 rounded-md bg-[#022B87] cursor-pointer">
              <span className="text-white">บริการ</span>
            </div>
            <div
              className="flex items-center p-2 rounded-md hover:bg-[#022B87] cursor-pointer"
              onClick={() => navigate("/admin/promotion")}
            >
              <span className="text-white">Promotion Code</span>
            </div>
          </div>
        </div>
        <div className="flex items-center p-2 rounded-md hover:bg-[#022B87] cursor-pointer">
          <span className="text-white">ออกจากระบบ</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#EFEFF2]">
        {/* Admin Topbar */}
        <div className="bg-white p-4 flex justify-between items-center">
          <div className="text-lg">บริการ</div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="ค้นหาบริการ..."
              className="p-2 border rounded-md"
            />
            <button className="bg-[#336DF2] text-white py-2 px-4 rounded-md">
              + เพิ่มบริการ
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
            {groupedServices.map(({ category, services }) => (
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
                    className="grid grid-cols-12 gap-4 items-center border-b-2 p-2 text-[14px] text-[#646C80]"
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
                    <div className="col-span-2 flex space-x-4">
                      <button className="text-red-600">Delete</button>
                      <button className="text-blue-600">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminServiceList;
