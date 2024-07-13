// import * as React from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { Button, CardActions, Box } from "@mui/material";
// import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import { useNavigate } from "react-router-dom";

// const categoryStyles = {
//   บริการทั่วไป: {
//     backgroundColor: "#E7EEFF",
//     color: "#0E3FB0",
//   },
//   บริการห้องครัว: {
//     backgroundColor: "#ECE6FF",
//     color: "#4512B4",
//   },
//   บริการห้องน้ำ: {
//     backgroundColor: "#DFF9F6",
//     color: "#00596C",
//   },
// };

// const ServiceCard = ({ service }) => {
//   const navigate = useNavigate();
//   const handleClick = (path) => {
//     navigate(path);
//   };

//   const categoryStyle = categoryStyles[service.category.trim()] || {};

//   return (
//     <Card>
//       <CardMedia
//         component="img"
//         height="140"
//         image={service.image}
//         alt={service.service_name}
//       />
//       <CardContent>
//         <div
//           className="text-xs mb-2 inline-block px-2 py-1 rounded"
//           style={{
//             backgroundColor: categoryStyle.backgroundColor,
//             color: categoryStyle.color,
//           }}
//         >
//           {service.category}
//         </div>
//         <h1 className="text-[18px]">{service.service_name}</h1>
//         <Box display="flex" alignItems="center" className="text-[14px]">
//           <LocalOfferIcon
//             style={{
//               color: "#8A95A6",
//               marginRight: 6,
//               width: "16px",
//               height: "16px",
//             }}
//           />
//           <p className="text-[14px] text-[#646C80]">{service.description}</p>
//         </Box>
//       </CardContent>
//       <CardActions>
//         <button className="font-prompt text-[16px] text-[#336DF2] underline decoration-solid" 
//         onClick={() => handleClick("/cart")}>เลือกบริการ</button>
//         </CardActions>
//     </Card>
//   );
// };

// export default ServiceCard;
import * as React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActions, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SellTag from "../assets/images/SellTag.png";

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

const ServiceCard_user = ({ service }) => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  let minPrice = 0;
  let maxPrice = 0;

  if (service && service.service_list && service.service_list.length > 0) {
    const prices = service.service_list.map((detail) => detail.price);
    minPrice = Math.min(...prices);
    maxPrice = Math.max(...prices);
  }

  const categoryStyle = categoryStyles[service.categories.category_name.trim()] || {};

  return (
    <div className = "border-[2px] border-gray-200 bg-white rounded-lg"> 
      <CardMedia
        component="img"
        height="140"
        image={service.image}
        alt={service.service_name}
      />
      <CardContent>
        <div
          className="text-xs mb-2 inline-block px-2 py-1 rounded font-normal"
          style={{
            backgroundColor: categoryStyle.backgroundColor,
            color: categoryStyle.color,
          }}
        >
          {service.categories.category_name}
        </div>
        <h1 className="text-[18px] text-[#232630] font-medium ">{service.service_name}</h1>
        <Box display="flex" alignItems="center" className="text-[14px]">
          <img
            src={SellTag}
            alt="SellTag Logo"
            className="mr-2 h-4 w-4 lg:h-5 lg:w-5"
          />
          <p className="text-[14px] text-[#646C80]">
            {minPrice === maxPrice
              ? `ค่าบริการประมาณ ${minPrice}.00 ฿`
              : `ค่าบริการประมาณ ${minPrice}.00 - ${maxPrice}.00 ฿`}
          </p>
        </Box>
      </CardContent>
      <CardActions>
        <button
          className="font-prompt text-[16px] text-[#336DF2] underline decoration-solid ml-4 mb-[18px] font-semibold"
          onClick={() => handleClick(`/cart/${service.service_name}`)}
          >
          เลือกบริการ
        </button>
      </CardActions>
    </div>
  );
};

export default ServiceCard_user;

