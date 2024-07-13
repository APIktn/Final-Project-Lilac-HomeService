import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const SortFilter = ({
  sortOption,
  setSortOption,
  openDropdown,
  toggleDropdown,
}) => {
  const sortingOptions = [
    {
      label: "บริการแนะนำ",
      abbreviatedLabel: "บริการแนะ...",
      value: "บริการแนะนำ",
    },
    {
      label: "บริการยอดนิยม",
      abbreviatedLabel: "บริการยอด...",
      value: "บริการยอดนิยม",
    },
    {
      label: "ตามตัวอักษร (Ascending)",
      abbreviatedLabel: "ตามตัวอัก...",
      value: "ตามตัวอักษร (Ascending)",
    },
    {
      label: "ตามตัวอักษร (Descending)",
      abbreviatedLabel: "ตามตัวอัก...",
      value: "ตามตัวอักษร (Descending)",
    },
  ];

  // Function to get the label based on screen size
  const getLabel = (option) => {
    return window.innerWidth < 768 ? option.abbreviatedLabel : option.label;
  };
  return (
    <div className="flex flex-col items-start justify-start mt-2 relative w-[125px] xl:w-[200px]">
      <p className="mb-1 ml-1 text-xs">เรียงตาม</p>
      <div className="relative w-full">
        <span className="flex justify-start items-center">
          <button
            className={`flex justify-center items-center text-[14px] ${
              openDropdown === "sort" ? "rounded-t-md" : ""
            }`}
            onClick={toggleDropdown}
          >
            {sortOption
              ? getLabel(sortingOptions.find((opt) => opt.value === sortOption))
              : getLabel(sortingOptions[0])}
          </button>
          <ArrowDropDownIcon />
        </span>
        {openDropdown === "sort" && (
          <div
            className="absolute top-full right-0 bg-white border border-gray-300 rounded-md mt-2 p-2 z-10 w-56"
            style={{ whiteSpace: "nowrap" }}
          >
            {sortingOptions.map((option) => (
              <div
                key={option.value}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSortOption(option.value);
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

export default SortFilter;
