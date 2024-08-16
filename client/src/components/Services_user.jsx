import React, { useState, useEffect } from "react";
import axios from "axios";
import ServiceCard_user from "./ServiceCard_user";
import { useNavigate } from "react-router-dom";
import Review1 from "../assets/images/review1.jpg";
import Review2 from "../assets/images/review2.jpg";
import Review3 from "../assets/images/review3.jpg";
import Review4 from "../assets/images/review4.jpg";
import Review5 from "../assets/images/review5.jpg";

const Service_user = () => {
  const [services, setServices] = useState([]);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 3; // Number of items to show per page

  const navigate = useNavigate();

  const handleMenuItemClick = (path) => {
    navigate(path);
  };

  const getServices = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/services/top6services`
      );
      setServices(result.data.data);
    } catch (error) {
      // console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedServices = services.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (endIndex < services.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (startIndex > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const testimonials = [
    {
      id: 1,
      name: "คุณน้ำฝน ทางสายธาร",
      message:
        "ต้องบอกว่าเราใช้บริการที่นี่ครบทุกอย่าง จริง ๆ ระบบการจัดการงานดีมาก ๆ ค่ะ",
      image: Review1,
    },
    {
      id: 2,
      name: "คุณแอมแปร์ วิศารุธ",
      message:
        "ใช้บริการ HomeServices ติดแอร์ที่คาเฟ่ตลอดเพราะช่างเก็บงานละเอียดมาก ทำให้ Mode&Tone ของร้านไม่เสีย มืออาชีพมาก ๆ ครับ",
      detail: "(เจ้าของกิจการ Ampere Cafe)",
      image: Review2,
    },
    {
      id: 3,
      name: "คุณแป้ง ภัทรภร",
      message:
        "คือช่างเป็นมืออาชีพมาก มีการอัพเดทสถานะตลอดว่ากำลังเดินทางมา สุภาพมาก มาก่อนเวลานัดด้วยค่ะ แฮปปี้สุด ๆ",
      detail: "",
      image: Review3,
    },
    {
      id: 4,
      name: "เชฟ Riccardo Bonucci",
      message:
        "I always rely on HomeServices for installations. Technician was incredibly friendly, and thanks to their expertise. ชอบ มาก ครับ",
      detail: "(เจ้าของร้าน Made in Italian)",
      image: Review4,
    },
    {
      id: 5,
      name: "คุณแก้ว ผ่องใส",
      message:
        "HomeServices ใช้งานได้ง่ายค่ะ ช่างดูแลเราดีมาก ชอบที่ทำงานเสร็จเรียบมากค่ะ",
      detail: "",
      image: Review5,
    },
  ];

  const handleNext = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const getAdjacentIndices = () => {
    const prevIndex =
      currentTestimonialIndex === 0
        ? testimonials.length - 1
        : currentTestimonialIndex - 1;
    const nextIndex =
      currentTestimonialIndex === testimonials.length - 1
        ? 0
        : currentTestimonialIndex + 1;

    return { prevIndex, nextIndex };
  };

  const { prevIndex, nextIndex } = getAdjacentIndices();

  return (
    <section className="relative py-12 lg:py-8 overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0 hidden md:block" // Hide on mobile
        src="https://res.cloudinary.com/dikwoz5gt/video/upload/f_auto:video,q_auto/j6p2j1reqkdcqdaemxmc"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Blue Overlay */}
      <div className="absolute top-0 left-0 w-full h-full md:bg-blue-300 opacity-50 z-0"></div>

      {/* White Upper Background */}
      <div className="absolute top-0 left-0 w-full h-[10%] bg-white z-0"></div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 py-6  lg:px-8 ">
          <h2 className="text-3xl lg:text-4xl font-medium text-center text-blue-900 mb-12">
            บริการยอดฮิตของเรา
          </h2>
          {/* Grid and Pagination Buttons */}
          <div className="relative">
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-12">
              {displayedServices.map((service, index) => (
                <ServiceCard_user
                  key={`${service.service_id}-${index}`}
                  service={service}
                />
              ))}
            </div>

            {/* Pagination Buttons */}

            <div className="flex justify-between">
              {/* Previous Button */}
              {currentPage > 0 && (
                <div className="flex justify-between mt-8 absolute  lg:-left-7 lg:right-0 lg:top-28 px-0 max-sm:hidden lg:block">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out max-sm:hidden lg:block transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    &lt;
                  </button>
                </div>
              )}

              {/* Next Button */}
              {endIndex < services.length && (
                <div className="flex justify-between mt-8 absolute  lg:left-[98%] lg:right-0 lg:top-28 px-0 max-sm:hidden lg:block">
                  <button
                    onClick={handleNextPage}
                    disabled={endIndex >= services.length}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out sm:hidden lg:block transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed "
                  >
                    &gt;
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-10 lg:mt-12">
            <button
              onClick={() => handleMenuItemClick("/servicelist")}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              ดูบริการทั้งหมด
            </button>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="bg-white mt-12 py-8">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6">
              รีวิวจริงจากลูกค้าของเรา ⭐️
            </h3>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={handlePrevious}
                className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition"
              >
                &lt;
              </button>

              {/* Show only current testimonial on mobile */}
              <div className="hidden md:flex flex-col items-center opacity-50 transition duration-300 ease-in-out">
                <img
                  src={testimonials[prevIndex].image}
                  alt={testimonials[prevIndex].name}
                  className="w-24 h-36 rounded-lg mb-2 object-cover"
                />
                <p className="text-sm">{testimonials[prevIndex].name}</p>
              </div>

              {/* Current Testimonial */}
              <div className="flex flex-col items-center w-full h-[350px] max-w-md p-4 border border-gray-200 rounded-lg  transition duration-300 ease-in-out">
                <img
                  src={testimonials[currentTestimonialIndex].image}
                  alt={testimonials[currentTestimonialIndex].name}
                  className="w-32 h-48 rounded-lg mb-4 object-cover  bg-slate-50"
                />
                <p className="text-[12px] lg:text-[16px] lg:w-[400px] italic">
                  "{testimonials[currentTestimonialIndex].message}"
                </p>
                <p className="mt-4 text-[10px] lg:text-sm font-medium text-blue-900">
                  - {testimonials[currentTestimonialIndex].name}{" "}
                  {testimonials[currentTestimonialIndex].detail}
                </p>
              </div>

              {/* Show only next testimonial on mobile */}
              <div className="hidden md:flex flex-col items-center opacity-50 transition duration-300 ease-in-out">
                <img
                  src={testimonials[nextIndex].image}
                  alt={testimonials[nextIndex].name}
                  className="w-24 h-36 rounded-lg mb-2 object-cover"
                />
                <p className="text-sm">{testimonials[nextIndex].name}</p>
              </div>

              <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service_user;
