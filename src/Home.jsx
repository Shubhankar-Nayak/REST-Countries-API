import React ,{ useState } from 'react'
import { IoMoonOutline, IoSearch } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import data from './assets/data.json'
import { Link } from "react-router-dom";

const Home = () => {
    const [dark, setDark] = React.useState(false);
    const [region, setRegion] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
  
    const handleRegionChange = (event) => {
      setRegion(event.target.value);
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
  
    const filteredData = data.filter((country) => {
      const matchesRegion = region ? country.region === region : true;
      const matchesSearch = searchQuery
        ? country.name.toLowerCase().includes(searchQuery)
        : true;
      return matchesRegion && matchesSearch;
    });
  
    return (
      <div className='w-full h-screen dark:text-white font-NunitoSans'>
        <div className="w-full h-[8vh] fixed top-0 px-5 laptop:px-20 bg-white dark:bg-DarkBlue border-b-2 dark:border-VeryDarkBlue flex justify-between items-center">
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
          <div className="w-[60%] laptop:w-[20%] dark:bg-DarkBlue ms-10 mt-5 ps-5 bg-white flex items-center shadow-md rounded-md">
            <select
              id="region"
              className="w-full py-3 ms-3 focus:outline-none bg-transparent border-none dark:bg-DarkBlue cursor-pointer"
              value={region}
              onChange={handleRegionChange}
            >
              <option value="">Filter by Region</option>
              <option value="Africa">Africa</option>
              <option value="Americas">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </div>
  
        <div className="laptop:px-20 laptop:grid laptop:grid-cols-4 laptop:gap-6 dark:bg-VeryDarkBlue">
          {filteredData.map((country, index) => (
            <div key={index} className="w-[70%] laptop:w-[90%] mx-auto my-10 dark:bg-DarkBlue hover:scale-110 duration-500 shadow-lg rounded-md overflow-hidden cursor-pointer">
                <Link to={`/country/${encodeURIComponent(country.name)}`} >
                  <img src={country.flags.png} alt={country.name} className="w-full h-40 object-cover" />
                  <div className="px-7 py-8">
                    <h2 className="mb-5 font-bold text-[20px]">{country.name}</h2>
                    <p><span className='font-semibold'>Population:</span> {formatPopulation(country.population)}</p>
                    <p className='my-1'><span className='font-semibold'>Region:</span> {country.region}</p>
                    <p><span className='font-semibold'>Capital:</span> {country.capital}</p>
                  </div>
                </Link>
            </div>
          ))}
        </div>
      </div>
    )
}

export default Home