import React ,{ useState, useEffect } from 'react'
import { IoMoonOutline, IoSearch } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import { Link } from "react-router-dom";

const api = "https://restcountries.com/v3.1/all"

const Home = () => {
    const [dark, setDark] = React.useState(false);
    const [region, setRegion] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [countries, setCountries] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      
      const fetchCountries = async () => {
        try {
          setLoading(true);
          const response = await fetch(api);
          if (!response.ok) throw new Error("Failed to fetch countries");
          const data = await response.json();
          setCountries(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
  
      fetchCountries();
    }, []);
  
    const handleRegionChange = (event) => {
      setRegion(event);
      setIsOpen(false);
    };
  
    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }
  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value.toLowerCase());
    };
  
    const formatPopulation = (population) => {
      return new Intl.NumberFormat("en-US").format(population);
    };
  
    const filteredData = countries.filter((country) => {
      const matchesRegion = region ? country.region === region : true;
      const matchesSearch = searchQuery
        ? country.name.common.toLowerCase().includes(searchQuery)
        : true;
      return matchesRegion && matchesSearch;
    });
  
    return (
      <div className='w-full h-screen dark:bg-VeryDarkBlue dark:text-white font-NunitoSans'>
        <div className="w-full h-[8vh] fixed z-50 top-0 px-5 laptop:px-20 bg-white dark:bg-DarkBlue border-b-2 dark:border-VeryDarkBlue flex justify-between items-center">
          <h1 className='text-[20px] font-bold'>Where in the world?</h1>
          <div className='flex items-center gap-2 cursor-pointer' onClick={darkModeHandler}>
            { !dark && <IoMoonOutline /> }
            { dark && <FaMoon /> }
            <p>Dark Mode</p>
          </div>
        </div>
  
        <div className='w-full mt-[7vh] pt-[3vh] dark:bg-VeryDarkBlue flex flex-col laptop:flex-row justify-start laptop:justify-between items-start laptop:items-center laptop:px-20'>
          <div className='w-[90%] laptop:w-[40%] h-fit dark:bg-DarkBlue ps-5 bg-white flex items-center mx-auto laptop:mx-0 shadow-md rounded-lg'>
            <IoSearch />
            <input 
              className='w-[90%] py-3 ms-3 focus:outline-none dark:bg-DarkBlue' 
              type="text" 
              placeholder='Search for a country...'
              value={searchQuery}
              onChange={handleSearchChange} 
            />
          </div>
          <div className="relative w-[60%] laptop:w-[20%] ms-10 mt-5 bg-white dark:bg-DarkBlue shadow-md rounded-md cursor-pointer">
            <div
              onClick={() => setIsOpen(!isOpen)} 
              className="py-3 px-5 flex justify-between items-center"
            >
              <span>{region || "Filter by Region"}</span>
              <MdOutlineKeyboardArrowDown />
            </div>

            {isOpen && (
              <div className="absolute top-14 left-0 w-full bg-white dark:bg-DarkBlue shadow-md rounded-md z-10">
                <div
                  onClick={() => handleRegionChange("")}
                  className="py-2 px-5 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Filter by Region
                </div>
                <div
                  onClick={() => handleRegionChange("Africa")}
                  className="py-2 px-5 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Africa
                </div>
                <div
                  onClick={() => handleRegionChange("Americas")}
                  className="py-2 px-5 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  America
                </div>
                <div
                  onClick={() => handleRegionChange("Asia")}
                  className="py-2 px-5 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Asia
                </div>
                <div
                  onClick={() => handleRegionChange("Europe")}
                  className="py-2 px-5 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Europe
                </div>
                <div
                  onClick={() => handleRegionChange("Oceania")}
                  className="py-2 px-5 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Oceania
                </div>
              </div>
            )}
          </div>
        </div>
  
        <div className="laptop:px-20 laptop:grid laptop:grid-cols-4 laptop:gap-6 dark:bg-VeryDarkBlue">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : filteredData.length > 0 ? (
            filteredData.map((country, index) => (
              <div
                key={index}
                className="w-[70%] laptop:w-[90%] mx-auto my-10 dark:bg-DarkBlue hover:scale-110 duration-500 shadow-lg rounded-md overflow-hidden cursor-pointer"
              >
                <Link to={`/country/${encodeURIComponent(country.name.common)}`}>
                  <img
                    src={country.flags.png}
                    alt={country.name.common}
                    className="w-full h-40 object-cover"
                  />
                  <div className="px-7 py-8">
                    <h2 className="mb-5 font-bold text-[20px]">{country.name.common}</h2>
                    <p>
                      <span className="font-bold">Population:</span>{" "}
                      {formatPopulation(country.population)}
                    </p>
                    <p className="my-1">
                      <span className="font-bold">Region:</span> {country.region}
                    </p>
                    <p>
                      <span className="font-bold">Capital:</span>{" "}
                      {country.capital?.[0] || "No Capital"}
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center">No countries found</p>
          )}
        </div>
      </div>
    )
}

export default Home