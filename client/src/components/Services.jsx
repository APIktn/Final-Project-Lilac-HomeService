import React, { useState, useEffect } from "react";
import axios from "axios";
import ServiceCard from "./ServiceCard";
import { useNavigate } from "react-router-dom";
import homeServiceVideo from "../assets/images/home-service-video.mp4";
import Review1 from "../assets/images/review1.jpg";
import Review2 from "../assets/images/review2.jpg";
import Review3 from "../assets/images/review3.jpg";

const Services = () => {
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
        `http://localhost:4000/services/top6services`
      );
      setServices(result.data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
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
      name: "คุณแอมแปร์ วิศารุธ ",
      message:
        "ผมใช้บริการ HomService ติดแอร์ที่คาเฟ่ตลอดเพราะช่างเก็บงานละเอียดมาก ทำให้ Mode&Tone ของร้านไม่เสีย มืออาชีพมาก ๆ ครับ ",
      detail: "(เจ้าของกิจการ Ampere Cafe)",
      image: Review2,
    },
    {
      id: 3,
      name: "คุณแป้ง ภัทรภร ",
      message:
        "คือช่างเป็นมืออาชีพมาก มีการอัพเดทสถานะตลอดว่ากำลังเดินทางมา สุภาพมาก มาก่อนเวลานัดด้วยค่ะ แฮปปี้สุด ๆ ",
      detail: "",
      image: Review3,
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
        src="https://res.cloudinary.com/dikwoz5gt/video/upload/f_auto:video,q_auto/oidaz6xzpgbhbslodqj9"
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
                <ServiceCard
                  key={`${service.service_id}-${index}`}
                  service={service}
                />
              ))}
            </div>

            {/* Pagination Buttons */}

            <div className="flex justify-between">
              {/* Previous Button */}
              {currentPage > 0 && (
                <div className="flex justify-between mt-8 absolute  lg:-left-7 lg:right-0 lg:top-28 px-0 ">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out sm:hidden lg:block"
                  >
                    Previous
                  </button>
                </div>
              )}

              {/* Next Button */}
              {endIndex < services.length && (
                <div className="flex justify-between mt-8 absolute  left-[1180px] right-0 top-28 px-0">
                  <button
                    onClick={handleNextPage}
                    disabled={endIndex >= services.length}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out sm:hidden lg:block"
                  >
                    Next
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
                  className="w-32 h-48 rounded-lg mb-4 object-cover"
                />
                <p className="text-[12px] lg:text-[16px] italic">
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

export default Services;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ServiceCard from "./ServiceCard";
// import { useNavigate } from "react-router-dom";
// import homeServiceVideo from "../assets/images/home-service-video.mp4";
// import Review1 from "../assets/images/review1.jpg";
// import Review2 from "../assets/images/review2.jpg";
// import Review3 from "../assets/images/review3.jpg";

// const Services = () => {
//   const [services, setServices] = useState([]);
//   const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
//   const [currentPage, setCurrentPage] = useState(0);

//   const itemsPerPage = 3; // Number of items to show per page

//   const navigate = useNavigate();

//   const handleMenuItemClick = (path) => {
//     navigate(path);
//   };

//   const getServices = async () => {
//     try {
//       const result = await axios.get(
//         `http://localhost:4000/services/top6services`
//       );
//       setServices(result.data.data);
//     } catch (error) {
//       console.error("Error fetching services:", error);
//     }
//   };

//   useEffect(() => {
//     getServices();
//   }, []);

//   // Calculate the start and end indices for the current page

//   const startIndex = currentPage * itemsPerPage;

//   const endIndex = startIndex + itemsPerPage;

//   const displayedServices = services.slice(startIndex, endIndex);
//   // Handlers for pagination

//   const handleNextPage = () => {
//     if (endIndex < services.length) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };
//   const handlePreviousPage = () => {
//     if (startIndex > 0) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   const testimonials = [
//     {
//       id: 1,
//       name: "คุณน้ำฝน ทางสายธาร",
//       message:
//         "ต้องบอกว่าเราใช้บริการที่นี่ครบทุกอย่าง จริง ๆ ระบบการจัดการงานดีมาก ๆ ค่ะ",
//       image: Review1,
//     },
//     {
//       id: 2,
//       name: "คุณแอมแปร์ วิศารุธ ",
//       message:
//         "ผมใช้บริการ HomService ติดแอร์ที่คาเฟ่ตลอดเพราะช่างเก็บงานละเอียดมาก ทำให้ Mode&Tone ของร้านไม่เสีย มืออาชีพมาก ๆ ครับ ",
//       detail: "(เจ้าของกิจการ Ampere Cafe)",
//       image: Review2,
//     },
//     {
//       id: 3,
//       name: "คุณแป้ง ภัทรภร ",
//       message:
//         "คือช่างเป็นมืออาชีพมาก มีการอัพเดทสถานะตลอดว่ากำลังเดินทางมา สุภาพมาก มาก่อนเวลานัดด้วยค่ะ แฮปปี้สุด ๆ ",
//       detail: "",
//       image: Review3,
//     },
//   ];

//   const handleNext = () => {
//     setCurrentTestimonialIndex((prevIndex) =>
//       prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const handlePrevious = () => {
//     setCurrentTestimonialIndex((prevIndex) =>
//       prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
//     );
//   };

//   const getAdjacentIndices = () => {
//     const prevIndex =
//       currentTestimonialIndex === 0
//         ? testimonials.length - 1
//         : currentTestimonialIndex - 1;
//     const nextIndex =
//       currentTestimonialIndex === testimonials.length - 1
//         ? 0
//         : currentTestimonialIndex + 1;

//     return { prevIndex, nextIndex };
//   };

//   const { prevIndex, nextIndex } = getAdjacentIndices();

//   return (
//     <section className="relative py-12 lg:py-8 overflow-hidden">
//       {/* Video Background */}
//       <video
//         className="absolute top-0 left-0 w-full h-full object-cover z-0 hidden md:block" // Hide on mobile
//         src="https://res.cloudinary.com/dikwoz5gt/video/upload/f_auto:video,q_auto/j6p2j1reqkdcqdaemxmc"
//         autoPlay
//         loop
//         muted
//         playsInline
//       />

//       {/* Blue Overlay */}
//       <div className="absolute top-0 left-0 w-full h-full md:bg-blue-300 opacity-50 z-0"></div>

//       {/* White Upper Background */}
//       <div className="absolute top-0 left-0 w-full h-[8%] bg-white z-0"></div>

//       <div className="relative z-10">
//         <div className="container mx-auto px-6 lg:px-8">
//           <h2 className="text-3xl lg:text-4xl font-semibold text-center text-blue-950 mb-12">
//             บริการยอดฮิตของเรา
//           </h2>
//           {/* Grid and Pagination Buttons */}
//           <div className="relative">
//             {/* Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-12">
//               {displayedServices.map((service, index) => (
//                 <ServiceCard
//                   key={`${service.service_id}-${index}`}
//                   service={service}
//                 />
//               ))}
//             </div>

//             {/* Pagination Buttons */}
//             <div className="flex justify-between mt-8 absolute  lg:-left-7 lg:right-0 lg:top-28 px-0 ">
//               <button
//                 onClick={handlePreviousPage}
//                 disabled={currentPage === 0}
//                 className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
//               >
//                 Previous
//               </button>
//             </div>
//             <div className="flex justify-between mt-8 absolute  left-[1180px] right-0 top-28 px-0">
//               <button
//                 onClick={handleNextPage}
//                 disabled={endIndex >= services.length}
//                 className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
//               >
//                 Next
//               </button>
//             </div>
//           </div>

//           <div className="text-center mt-10 lg:mt-12">
//             <button
//               onClick={() => handleMenuItemClick("/servicelist")}
//               className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
//             >
//               ดูบริการทั้งหมด
//             </button>
//           </div>
//         </div>

//         {/* Testimonial Section */}
//         <div className="bg-white mt-12 py-8">
//           <div className="container mx-auto px-6 lg:px-8 text-center">
//             <h3 className="text-2xl font-semibold text-blue-900 mb-6">
//               รีวิวจริงจากลูกค้าของเรา ⭐️
//             </h3>
//             <div className="flex items-center justify-center space-x-4">
//               <button
//                 onClick={handlePrevious}
//                 className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition"
//               >
//                 &lt;
//               </button>

//               {/* Show only current testimonial on mobile */}
//               <div className="hidden md:flex flex-col items-center opacity-50 transition duration-300 ease-in-out">
//                 <img
//                   src={testimonials[prevIndex].image}
//                   alt={testimonials[prevIndex].name}
//                   className="w-24 h-36 rounded-lg mb-2 object-cover"
//                 />
//                 <p className="text-sm">{testimonials[prevIndex].name}</p>
//               </div>

//               {/* Current Testimonial */}
//               <div className="flex flex-col items-center w-full h-[350px] max-w-md p-4 border border-gray-200 rounded-lg  transition duration-300 ease-in-out">
//                 <img
//                   src={testimonials[currentTestimonialIndex].image}
//                   alt={testimonials[currentTestimonialIndex].name}
//                   className="w-32 h-48 rounded-lg mb-4 object-cover"
//                 />
//                 <p className="text-[12px] lg:text-[16px] italic">
//                   "{testimonials[currentTestimonialIndex].message}"
//                 </p>
//                 <p className="mt-4 text-[10px] lg:text-sm font-medium text-blue-900">
//                   - {testimonials[currentTestimonialIndex].name}{" "}
//                   {testimonials[currentTestimonialIndex].detail}
//                 </p>
//               </div>

//               {/* Show only next testimonial on mobile */}
//               <div className="hidden md:flex flex-col items-center opacity-50 transition duration-300 ease-in-out">
//                 <img
//                   src={testimonials[nextIndex].image}
//                   alt={testimonials[nextIndex].name}
//                   className="w-24 h-36 rounded-lg mb-2 object-cover"
//                 />
//                 <p className="text-sm">{testimonials[nextIndex].name}</p>
//               </div>

//               <button
//                 onClick={handleNext}
//                 className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition"
//               >
//                 &gt;
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;
