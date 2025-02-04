
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import AirportModal from "../components/AirportModal";
// import dotenv from "dotenv";

// dotenv.config();
// const APi_KEY = process.env.Aviation_API_KEY;
//eslint
// const API_KEY = process.env.REACT_APP_AVIATION_API_KEY;


function Home() {

  //we dynamically call the trip type by using state
  const [tripType, setTripType] = useState("oneWay");
  const [departureCity, setDepartureCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [airports, setAirports] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeField, setActiveField] = useState("");


  



  useEffect(() => {
    const fetchAirports = async () => {

      try {
        const response = await fetch(`https://api.aviationstack.com/v1/airports?access_key=d6cc78c7ea5cbafc33a181beb3ff92ff`);
        const data = await response.json();
        setAirports(data.data);
        console.log(data.data)
        
        
      } catch (error) {
        console.error('Error fetching airports:', error);
        
      }
    
    };
    fetchAirports();
  }, []);

  //Then we get suggestions
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : airports.filter((airport) =>
          airport.airport_name.toLowerCase().includes(inputValue) || airport.iata_code.toLowerCase().includes(inputValue)
        ).slice(0, 10);
  };
  

  //we handleInputChange
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (field === "departure") {
      setDepartureCity(value);
      setActiveField("departure");
    } else {
      setDestinationCity(value);
      setActiveField("destination");
    }
    setSuggestions(getSuggestions(value));
    if (value === "") {
      setShowModal(false);
    }else{
      setShowModal(true);
    }
    
  };


  //we handle when the user click the suggestion
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "departure") {
      setDepartureCity(`${suggestion.airport_name} (${suggestion.iata_code})`);
    } else {
      setDestinationCity(`${suggestion.airport_name} (${suggestion.iata_code})`);
    }
    setShowModal(false);
    setSuggestions([]);
  };


  return (
    <div className="bg-gray-50 min-h-screen ">
      {/* Header Section */}
      <div
        className="bg-cover bg-center h-[60vh] flex items-center justify-center relative  "
        style={{
          backgroundImage: "url('/img/illustration-flying-airplane.jpg')",
          objectFit: "cover",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="pr-2 pl-2 text-6xl font-bold text-center md:text-6xl text-black pb-3">
            Let's Book Your Next Trip.
          </h1>

          <p className="text-black font-bold text-center">
            Choose From Over 450 Airlines Worldwide
          </p>
        </div>
      </div>

      {/* Flight Search Section */}

     
      <div className="flex flex-col gap-8 bg-gradient-to-br from-green-400 to-blue-600  shadow-lg rounded-lg mx-auto mt-[-3rem] w-9/12 max-w-9xl p-6 relative">
        <div className="flex justify-start gap-4 items-center ">
          <div className="flex items-center ">
            <input type="radio" id="oneWay" name="tripType" onChange={() => setTripType("oneWay")} defaultChecked />
            <label htmlFor="oneWay" className="text-white">
              One-way
            </label>
          </div>
          <div className="flex items-center ">
            <input type="radio" id="roundTrip" name="tripType" onChange={() => setTripType("roundTrip")} checked={tripType === "roundTrip"} />
            <label htmlFor="roundTrip" className="text-white">
              Roundtrip
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5  gap-4 w-full text-black text-sm">
          <div className="relative">
            <p className="flex">Departure City</p>
            <input
              type="text"
              placeholder="Departure City"
              value={departureCity}
              onChange={(e) => handleInputChange(e, "departure")}
              className="border rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {showModal && activeField === "departure" && (
            <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg w-[500px] shadow-lg z-50 font-bold">
              <ul>
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.iata_code}
                    className="p-2 text-black hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.airport_name} ({suggestion.iata_code})
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          </div>

          <div>
            <p>Destination City</p>
            <input
              type="text"
              placeholder="Destination City"
              className="border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <p>Departure Date</p>
            <input
              type="date"
              placeholder="Departure Date"
              className="border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {tripType === "roundTrip" && (
            <div>
              <p>Return Date</p>
              <input
                type="date"
                placeholder="Return Date"
                className="border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

          )}

          <div>
            <p>Cabin class</p>
            <select
              className="border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              defaultValue="Domestic"
            >
              <option>Domestic</option>
              <option>International</option>
            </select>
          </div>
        </div>

        <div className=" font-serif font-semibold w-full flex justify-center items-center pt-1">
          <button className="bg-white p-2 rounded-xl border-2 hover:bg-[#01004D] hover:text-white transition ease-in-out duration-500 border-white w-1/3 ">
            Search flights
          </button>
        </div>
      </div>






      {/* Features Section */}
      <div className="text-center mt-8 px-6 pb-5">
        <h2 className="text-2xl font-bold mb-4">FEATURING</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg p-4 rounded-lg">
            <div className="text-red-500 text-4xl">✈️</div>
            <h3 className="text-lg font-bold mt-2">
              Book Flights to Over 15,000 Destinations
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Book flights online with Aerofly to over 15,000 destinations and
              get easy access to cheap flights with a wide selection of airline
              options at special affordable fares.
            </p>
          </div>
          <div className="bg-white shadow-lg p-4 rounded-lg">
            <div className="text-blue-500 text-4xl">🔍</div>
            <h3 className="text-lg font-bold mt-2">
              Quick and Easy Flight Search
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Flight bookings on Almosafar are quick and hassle-free. With over
              450 airlines including Saudi Airlines and flynas at your
              fingertips.
            </p>
          </div>
          <div className="bg-white shadow-lg p-4 rounded-lg">
            <div className="text-green-500 text-4xl">💵</div>
            <h3 className="text-lg font-bold mt-2">
              Affordable Flight Tickets
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              We offer convenience, affordability, and zero effort for flight
              bookings. Compare costs of different airlines to find cheap
              flights.
            </p>
          </div>
        </div>
      </div>

      <div className="grid justify-center items-center">
        <div className="flex justify-center items-center text-2xl font-bold tracking-tight text-gray-900 p-4">
          VISITING PLACES
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-2 w-full gap-3 p-5">
          <Card
            className="max-w-sm transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-100"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc="/img/famous-eiffel-tower-paris-with-gorgeous-colors.jpg"
          >
            <h5 className="flex justify-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              FRANCE (PARIS)
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </Card>
          <Card
            className="max-w-sm transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-100"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc="/img/big-ben-houses-parliament-london-uk.jpg"
          >
            <h5 className="flex justify-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              UNITED KINGDOM (MANCHESTER)
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </Card>
          <Card
            className="max-w-sm transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-100"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc="/img/city-water.jpg"
          >
            <h5 className="flex justify-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              CHINA (CITY WATER)
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;

// import React from "react";

// function Home() {
//   return (
//     <>
//       <div className="bg-gray-50 min-h-screen">
//         <div
//           className="h-[60vh] flex justify-center items-center bg-cover  bg-center w-full
//          "
//           style={{
//             backgroundImage: "url('/img/illustration-flying-airplane.jpg')",
//             objectFit: "cover",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <div>
//             <h1 className="pr-2 pl-2 text-6xl font-bold text-center md:text-6xl text-black pb-3">
//               Let's Book Your Next Trip.
//             </h1>
//             <p className="text-black font-bold text-center">
//               Choose From Over 450 Airlines Worldwide
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Home;
