import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const CategoryFilter = ({
  category,
  setCategory,
  openDropdown,
  toggleDropdown,
}) => {
  const categories = [
    {
      label: "บริการทั้งหมด",
      abbreviatedLabel: "บริการทั้งหมด",
      value: "บริการทั้งหมด",
    },
    {
      label: "บริการทั่วไป",
      abbreviatedLabel: "บริการทั่วไป",
      value: "บริการทั่วไป",
    },
    {
      label: "บริการห้องครัว",
      abbreviatedLabel: "บริการห้องครัว",
      value: "บริการห้องครัว",
    },
    {
      label: "บริการห้องน้ำ",
      abbreviatedLabel: "บริการห้องน้ำ",
      value: "บริการห้องน้ำ",
    },
  ];

  // Function to get the abbreviated label based on the current category
  const getAbbreviatedLabel = (optionLabel) => {
    const option = categories.find((opt) => opt.label === optionLabel);
    return window.innerWidth < 768 ? option.abbreviatedLabel : option.label;
  };

  return (
    <div className="flex flex-col items-start mt-2 relative w-[125px] xl:w-[200px] border-r border-gray-300">
      <p className="mb-1 ml-1 xl:ml-12 text-xs">หมวดหมู่บริการ</p>
      <div className="relative w-full">
        <span className="flex justify-center">
          <button
            className={`flex justify-center items-center text-[14px] ${
              openDropdown === "category" ? "rounded-t-md" : ""
            }`}
            onClick={toggleDropdown}
          >
            {category
              ? getAbbreviatedLabel(category)
              : getAbbreviatedLabel(categories[0].label)}
          <ArrowDropDownIcon />
          </button>
        </span>
        {openDropdown === "category" && (
          <div
            className="absolute top-full left-0 bg-white border border-gray-300 rounded-md mt-2 p-2 z-10 w-56"
            style={{ whiteSpace: "nowrap" }}
          >
            {categories.map((option) => (
              <div
                key={option.label}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setCategory(option.value);
                  toggleDropdown();
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
