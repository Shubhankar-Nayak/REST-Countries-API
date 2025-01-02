import React, {useState, useEffect} from 'react'
import { IoMoonOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useParams, Link } from "react-router-dom";

const Country = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null); 
  const [bordercountries, setBorderCountries] = useState([]);
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  }

  const formatPopulation = (population) => {
    return new Intl.NumberFormat("en-US").format(population);
  };

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        setLoading(true);

        const countryResponse = await fetch(
          `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`
        );
        if (!countryResponse.ok) throw new Error("Country not found");
        const countryData = await countryResponse.json();
        const fetchedCountry = countryData[0]; 
        setCountry(fetchedCountry);

        if (fetchedCountry.borders) {
          const borderResponse = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${fetchedCountry.borders.join(",")}`
          );
          const borderData = await borderResponse.json();
          setBorderCountries(borderData.map((border) => border.name.common));
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [name]);

  if (loading)
   return <div className='w-full h-screen absolute dark:bg-VeryDarkBlue dark:text-white flex justify-center items-center gap-2'>
            <AiOutlineLoading3Quarters className='animate-spin' />
            <p>Loading</p>
          </div>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (!country) return <p>Country not found</p>;

  return (
    <div className='w-full h-screen dark:bg-VeryDarkBlue dark:text-white font-NunitoSans'>
      <div className="w-full h-[8vh] fixed laptop:relative top-0 px-5 laptop:px-20 bg-white dark:bg-DarkBlue border-b-2 dark:border-VeryDarkBlue flex justify-between items-center">
        <h1 className='text-[20px] font-bold'>Where in the world?</h1>
        <div className='flex items-center gap-2 cursor-pointer' onClick={darkModeHandler}>
          { !dark && <IoMoonOutline /> }
          { dark && <FaMoon /> }
          <p>Dark Mode</p>
        </div>
      </div>

      <div className='w-full h-fit mt-[8vh] laptop:mt-0 flex flex-col justify-center items-center dark:bg-VeryDarkBlue'>
        <div className='w-[85%]'>
          <Link to="/" className='w-fit h-fit dark:bg-DarkBlue hover:bg-sky-600 hover:text-white dark:hover:bg-teal-600 my-10 px-5 py-2 flex justify-center items-center gap-2 rounded-md duration-300' style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
            <FaArrowLeftLong />
            <p>Back</p>
          </Link>
        </div>

        <div className='w-[85%] pb-5 flex flex-col laptop:flex-row laptop:justify-between'>
          <img className='laptop:w-[45%]' src={country.flags.png} alt="" />
          <div className='laptop:w-[40%]'>
            <h1 className='text-[20px] laptop:text-[30px] my-5 font-bold'>{country.name.common}</h1>
            <div className='flex laptop:flex-row'>
              <div className='laptop:w-[50%]'>
                <p className='my-1 dark:text-DarkGray font-medium'>
                  <span className='font-semibold dark:text-white'>Native Name: </span>
                  {Object.values(country.name.nativeName || {})[0]?.common || "N/A"}
                </p>
                <p className='my-1 dark:text-DarkGray font-medium'>
                  <span className='font-semibold dark:text-white'>Population: </span>
                  {formatPopulation(country.population)}
                </p>
                <p className='my-1 dark:text-DarkGray font-medium'>
                  <span className='font-semibold dark:text-white'>Region: </span>
                  {country.region}
                </p>
                <p className='my-1 dark:text-DarkGray font-medium'>
                  <span className='font-semibold dark:text-white'>Sub Region: </span>
                  {country.subregion}
                </p>
                <p className='mt-1 mb-10 dark:text-DarkGray font-medium'>
                  <span className='font-semibold dark:text-white'>Capital: </span>
                  {country.capital?.[0] || "N/A"}
                </p>
              </div>
              <div className='laptop:w-[50%]'>
                <p className='mt-5 mb-1 dark:text-DarkGray font-medium'>
                  <span className='font-semibold dark:text-white'>Top Level Domain: </span>
                  {country.tld?.[0] || "N/A"}
                </p>
                <p className='my-1 dark:text-DarkGray font-medium'>
                  <span className='font-semibold dark:text-white'>Currencies: </span>
                  {Object.values(country.currencies || {})
                    .map((currency) => currency.name)
                    .join(", ") || "N/A"}
                </p>
                <p className='mt-1 mb-10 dark:text-DarkGray font-medium'>
                  <span className='font-semibold dark:text-white'>Languages: </span>{" "}
                  {Object.values(country.languages || {}).join(", ") || "N/A"}
                </p>
              </div>
            </div>           

            <div className='flex flex-col gap-2'>
              <p className='font-semibold'>Border Countries:</p>
              {bordercountries.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {bordercountries.map((borderName, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-200 dark:bg-DarkBlue rounded-md shadow-md"
                    >
                      {borderName}
                    </span>
                  ))}
                </div>
              ) : (
                <p>No border countries</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Country