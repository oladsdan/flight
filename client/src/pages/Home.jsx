
import { Card, Datepicker } from "flowbite-react";
import { useEffect, useState, useContext, useMemo } from "react";
import AirportModal from "../components/AirportModal";
import { Link, useNavigate } from "react-router-dom";
import  AuthContext  from "../stateManagement/Auth";
import data from "../Data/airportdata.json";





function Home() {

  const { tripType, setTripType, departureCity, setDepartureCity, destinationCity, setDestinationCity, airports, setAirports, suggestions, setSuggestions, departureDate, setDepartureDate, returnDate, setReturnDate, showModal, setShowModal, activeField, setActiveField, handleInputChange, handleSuggestionClick, setLoading } = useContext(AuthContext);

  setAirports(data.data);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    navigate("/flightsearchcard");

    setTimeout(() => {
      setLoading(false);
    }
    , 2000);
  }



  // useEffect(() => {
  //   const fetchAirports = async () => {


  //     const url = 'https://sky-scanner3.p.rapidapi.com/flights/airports';
  //     const options = {
	//       method: 'GET',
  //       headers: {
  //         "x-rapidapi-key":
  //           "7c33786fdbmsh8027dd69e06f847p159523jsn4093e0a6cc3d",
  //         "x-rapidapi-host": "sky-scanner3.p.rapidapi.com",
  //       },
  //     };

  //     try {
  //       const response = await fetch(url, options);
  //       const result = await response.json();
  //       setAirports(result.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
    
  //   };
  //   fetchAirports();
  // }, []);


  // // useMemo instead of useEffect above
  // useMemo(() => {
  //   const fetchAirports = async () => {


  //     const url = 'https://sky-scanner3.p.rapidapi.com/flights/airports';
  //     const options = {
  //       method: 'GET',
  //       headers: {
  //         "x-rapidapi-key":
  //           "7c33786fdbmsh8027dd69e06f847p159523jsn4093e0a6cc3d",
  //         "x-rapidapi-host": "sky-scanner3.p.rapidapi.com",
  //       },
  //     };

  //     try {
  //       const response = await fetch(url, options);
  //       const result = await response.json();
  //       setAirports(result.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
      
  //   };
  //   fetchAirports();
  // }, []);




  // const getSuggestions = (value) => {
  //   const inputValue = value.trim().toLowerCase();
  //   const inputLength = inputValue.length;

  //   return inputLength === 0
  //     ? []
  //     : airports.filter((airport) =>
  //        airport.location? airport.location.toLowerCase().includes(inputValue) : airport.name.toLowerCase().includes(inputValue) || airport.iata.toLowerCase().includes(inputValue)
  //       ).slice(0, 10);
  // };
  

  // //we handleInputChange
  // const handleInputChange = (e, field) => {
  //   const value = e.target.value;
  //   if (field === "departure") {
  //     setDepartureCity(value);
  //     setActiveField("departure");
  //   } else {
  //     setDestinationCity(value);
  //     setActiveField("destination");
  //   }
  //   setSuggestions(getSuggestions(value));
  //   if (value === "") {
  //     setShowModal(false);
  //   }else{
  //     setShowModal(true);
  //   }
    
  // };



  // const handleSuggestionClick = (suggestion) => {
  //   if (activeField === "departure") {
  //     setDepartureCity(`${suggestion.name} (${suggestion.iata})`);
  //   } else {
  //     setDestinationCity(`${suggestion.name} (${suggestion.iata})`);
  //   }
  //   setShowModal(false);
  //   setSuggestions([]);
  // };


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

      
        
            <form onSubmit={handleSubmit} >
                <div className="flex flex-col gap-8 bg-gradient-to-br from-green-400 to-blue-600  shadow-lg rounded-lg mx-auto mt-[-3rem] w-9/12 max-w-9xl p-6 relative">
                  <div className="flex justify-start gap-4 items-center ">
                    <div className="flex items-center ">
                    
                      <input type="radio" id="oneWay" name="tripType" onClick={() => setTripType("oneWay")} defaultChecked  />
                      <label htmlFor="oneWay" className="text-white">
                        One-way
                      </label>
                    </div>
                    <div className="flex items-center ">
                    
                      <input type="radio" id="roundTrip" name="tripType" onClick={() => setTripType("roundTrip")} checked={tripType === "roundTrip"} />
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
                        required
                      />
                      {showModal && activeField === "departure" && (
                      <AirportModal suggestions={suggestions} handleSuggestionClick={handleSuggestionClick} />
                    )}
                    
                    </div>

                    <div className="relative">
                      <p>Destination City</p>
                      <input
                        type="text"
                        placeholder="Destination City"
                        value={destinationCity}
                        onChange={(e) => handleInputChange(e, "destination")}
                        className="border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        required
                      />

                      {showModal && activeField === "destination" && (
                      <AirportModal suggestions={suggestions} handleSuggestionClick={handleSuggestionClick} />
                      )}

                    </div>
                    <div>
                      <p>Departure Date</p>
                      <Datepicker
                        selected={departureDate}
                        onChange={(date) => setDepartureDate(date)}
                        minDate={new Date()}
                        className="border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        required
                      />
                    </div>

                    {tripType === "roundTrip" && (
                      <div>
                        <p>Return Date</p>
                        <Datepicker
                          selected={returnDate}
                          onChange={(date) => setReturnDate(date)}
                          minDate={departureDate}
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
                    <div
                      className="flex justify-center items-center bg-white p-2 rounded-xl border-2 hover:bg-[#01004D] hover:text-white
                      transition ease-in-out duration-500 border-white w-1/3 "
                    >
                      <button type="submit">Search flights</button>
                    </div>
                  </div>
                </div>

            </form>
       





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

