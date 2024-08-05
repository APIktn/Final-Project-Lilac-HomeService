import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CategoryFilter from "./filters/CategoryFilter";
import PriceFilter from "./filters/PriceFilter";
import SortFilter from "./filters/SortFilter";
import ServiceCard from "./ServiceCard";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const SearchBar = () => {
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0,5000]);
  const [sortOption, setSortOption] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const [loading, setLoading] = useState(true);

  const getServices = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/services/serviceslist`);
      console.log("Fetched services:", result.data.data);
      setServices(result.data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterServices = () => {
    let filteredServices = services;

    // Filter by category
    if (category && category !== "บริการทั้งหมด") {
      filteredServices = filteredServices.filter(
        (service) => service.categories.category_name.trim() === category.trim()
      );
    }

    // Filter by price range
    filteredServices = filteredServices.filter((service) => {
      const prices = service.service_list.map((detail) => detail.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      return minPrice >= priceRange[0] && maxPrice <= priceRange[1];
    });

    // Filter by search query
    filteredServices = filteredServices.filter((service) =>
      service.service_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort by sortOption
    if (sortOption) {
      if (sortOption === "ตามตัวอักษร (Ascending)") {
        filteredServices.sort((a, b) =>
          a.service_name.localeCompare(b.service_name)
        );
      } else if (sortOption === "ตามตัวอักษร (Descending)") {
        filteredServices.sort((a, b) =>
          b.service_name.localeCompare(a.service_name)
        );
      } else if (sortOption === "บริการยอดนิยม") {
        filteredServices.sort((a, b) => b.quantity - a.quantity);
      }
    }

    return filteredServices;
  };

  const filteredServices = filterServices();

  useEffect(() => {
    const handleScroll = () => {
      const shouldStick = window.scrollY > 0;
      setIsSticky(shouldStick);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="font-prompt w-full mx-auto flex flex-col space-y-4 bg-[#EFEFF2]">
      {/* Filter Bar */}
      <div
        className={`${
          isSticky
            ? "sticky top-0 z-50 bg-white border-b border-gray-200 p-4 xl:px-32 xl:flex xl:justify-around xl:items-center"
            : "bg-white p-4 xl:px-32 xl:flex xl:justify-around xl:items-center"
        }`}
      >
        <section className="flex items-center space-x-2">
          <div className="flex-grow flex items-center border border-gray-300 rounded-md p-0">
            <div className="p-2 xl:w-[200px]">
              <SearchIcon />
            </div>
            <div className="p-2 xl:w-[300px]">
              <input
                type="text"
                placeholder="ค้นหาบริการ..."
                className="flex-grow p-2 outline-none w-[120px] h-[20px] xl:h-[30px]"
                // style={{ height: "44px" }}

                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
          <button
            className="bg-blue-500 text-white px-4 xl:px-6 py-2 rounded-md"
            style={{ height: "44px" }}
          >
            ค้นหา
          </button>
        </section>

        <div className="flex justify-center items-center mt-4 space-x-4 md:mt-0">
          <CategoryFilter
            category={category}
            setCategory={setCategory}
            openDropdown={openDropdown}
            toggleDropdown={() => toggleDropdown("category")}
          />
          <PriceFilter
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            openDropdown={openDropdown}
            toggleDropdown={() => toggleDropdown("price")}
          />
          <SortFilter
            sortOption={sortOption}
            setSortOption={setSortOption}
            openDropdown={openDropdown}
            toggleDropdown={() => toggleDropdown("sort")}
          />
        </div>
      </div>

      {/* Filtered Services */}

      {loading ? (
        <div className="flex justify-center items-center w-full h-[500px]">
          <ClipLoader size={200} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <div className="p-4 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-8 md:px-32 md:py-16">
          {filteredServices.map((service) => (
            <ServiceCard key={service.service_id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

