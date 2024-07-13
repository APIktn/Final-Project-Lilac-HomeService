// src/components/filters/PriceFilter.jsx
import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Slider } from "@mui/material";

const PriceFilter = ({
  priceRange,
  setPriceRange,
  openDropdown,
  toggleDropdown,
}) => {
  return (
    <div className="flex flex-col items-start mt-2 relative h-[42px] w-[105px] border-r border-gray-300">
      <p className="mb-1 ml-2 text-xs">ราคา</p>
      <div className="relative w-full">
        <button
          className={`w-full flex justify-center items-center text-[14px] ${
            openDropdown === "price" ? "rounded-t-md" : ""
          }`}
          onClick={toggleDropdown}
        >
          0-5000฿
          <ArrowDropDownIcon />
        </button>
        {openDropdown === "price" && (
          <div className="absolute top-full left-0 w-52 bg-white border border-gray-300 rounded-md mt-2 p-2 z-10">
            <p>0-5000฿</p>
            <Slider
              value={priceRange}
              onChange={(event, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              max={5000}
              className="-mt-2"
            />
            <div className="flex justify-between -mt-5">
              <span>0฿</span>
              <span>5000฿</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceFilter;
