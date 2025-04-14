import FlightSearchDesign from "../components/FlightSearchDesign";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../stateManagement/Auth";

import FlightDetailsCard from "../components/FlightDetailsCard";
import FlightDetailsCardResult from "../components/FlightDetailsCardResult";
import dataResult from "../Data/queryData.json";
import loadingGif from "../assets/loading.gif";
import { TicketsPlane, PlaneTakeoff, Filter } from 'lucide-react';
import { IoIosAirplane } from "react-icons/io";
import FlightFilterPanel from "../components/FlightFilterPanel";



const FlightSearchCard = () => {


  
  const LoadingIcon = () => (
    <div className="flex-1 flex p-5 justify-center items-center h-screen">
      <div className="flex justify-center items-center py-20 transform -translate-y-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    </div>
  );


  const itineriaries  = dataResult?.data?.itineraries;
  const [filteredItineraries, setFilteredItineraries] = useState("");


    const {setTripType, departureCity, handleInputChange, showModal, activeField, suggestions, handleSuggestionClick, destinationCity, departureDate, setDepartureDate, tripType, returnDate, setReturnDate, loading, setLoading} = useContext(AuthContext);


    //state for the filter options
    const [filters, setFilters] = useState({
      priceRange: [0, 10000000], // 0 to 10,000,000
      airlines: [],
      stops: [1,2],
      duration: null,
      travelTime: [0, 1440], // 0 to 24 hours in minutes
      cabinClass: [],
    });

    //loading state
    // const [isLoading, setisLoading] = useState(true);



    const itemHeight = 160;
    // const totalHeight = slidesData.length * (itemHeight * 1.3);

    //Apply fliters whenever they change

    useEffect(() => {
      setLoading(true);
      const filteredData = dataResult?.data?.itineraries?.filter((item) => {
        // enable loading state
        return (
          item.price >= filters.priceRange[0] &&
          item.price <= filters.priceRange[1] &&
          filters.airlines.includes(item.airline) &&
          filters.stops.includes(item.stops) &&
          item.duration <= filters.duration &&
          item.travelTime >= filters.travelTime[0] &&
          item.travelTime <= filters.travelTime[1] &&
          filters.cabinClass.includes(item.cabinClass)
        );
      });
      
      setTimeout(() => {
        setFilteredItineraries(filteredData);
        setLoading(false);
      }, 2000);
    }, [filters.priceRange, filters.airlines, filters.stops, filters.duration, filters.travelTime, filters.cabinClass]
    );

   

    //we paginate
    const [currentPage, setCurrentPage] = useState(1);
    const flightsPerPage = 5;
    const totalItems = itineriaries?.length;
    const totalPages = Math.ceil(totalItems / flightsPerPage);
    const startIndex = (currentPage - 1) * flightsPerPage;
    const endIndex = startIndex + flightsPerPage;
    const currentFlightData = itineriaries.slice(startIndex, endIndex);

    // state for

    // function to change the page
    const handlePageChange = (page) => {
    setCurrentPage(page);
    };


  return (
    <>
        <div
            className="flex justify-center items-center h-[50vh] relative"
            style={{
                backgroundImage: "url('/img/illustration-flying-airplane.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            >
            <div className="bg-white/5 p-8 rounded-lg shadow-lg w-full max-w-max h-[full] absolute">
                {/* <h2 className="text-2xl font-bold text-center mb-6">Flight Search Card</h2>
                <div className="flex justify-center items-center">
                <Fullscreen className="h-12 w-12 text-blue-500" />
                </div> */}
                <FlightSearchDesign setTripType={setTripType} departureCity={departureCity}
                handleInputChange={handleInputChange} 
                showModal={showModal} 
                activeField={activeField} 
                suggestions={suggestions}
                handleSuggestionClick={handleSuggestionClick} 
                destinationCity={destinationCity} 
                departureDate={departureDate} 
                setDepartureDate={setDepartureDate} 
                tripType={tripType} returnDate={returnDate}
                setReturnDate={setReturnDate}
                
                />
            </div>
        
        
        </div>

        <div className="flex ">
            {/* Filter Section */}
            <div className="w-1/4 p-4 m-8 rounded-2xl bg-gray-100 transition-all duration-300 ease-in-out ">

              <div className="flex gap-2 items-center p-2">
                  <TicketsPlane />
                  <h2 className="text-lg text-gray-500 font-semibold">Your Flight Tickets</h2>
              </div>
              <div className="flex items-center gap-3 border-b border-gray-400">
                <PlaneTakeoff className="h-12 w-12 bg-gray-500/25 p-2 rounded-l" />
                <div className="flex flex-col p-2">
                  <h3 className="font-semibold">Departure Flight</h3>
                  <span className="text-gray-500 text-sm">Sat, 22 Mar 2025</span>
                </div>
                  
              </div>
              {/* best flight */}
              <span className="text-gray-500 text-sm italic flex justify-center">Cheapest Flight</span>
              <div className="flex flex-row place-items-center justify-between gap-3 p-2">
                <div className="flex items-center gap-2">
                    <img alt="Airline Logo" className="w-10 h-10" src="https://logos.skyscnr.com/images/airlines/favicon/ET.png"/>
                    
                    <div className="flex flex-col ml-2">
                        <p className="text-xs text-gray-500 font-bold">Ethopian Airlines</p>
                        <p className="text-xs text-gray-500">QR1456</p>  
                    </div>

                </div>
                <button className=" hover:shadow-md text-green-500 bg-gray-300 font-bold py-2 px-4 rounded underline italic">Book</button>

              </div>

                <div className="flex items-center justify-between gap-2 p-2 border-b border-gray-400">
                  <div className="flex flex-col"> 
                    <span className="font-semibold">Lagos (LOS)</span>
                    <p className="text-gray-500 text-sm">10:00</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-500 text-3xl">•</p> 
                      <IoIosAirplane className="h-8 w-8 text-gray-400 mx-2" /> 
                      <p className="text-gray-500 text-3xl">•</p>
                    </div>
                    <span className="text-gray-500 text-sm">8h 34m</span>
                  </div>
                  <div className="flex flex-col">
                  <span className="font-semibold">London (LHR)</span>
                  <p className="text-gray-500 text-sm">18:34</p>
                  </div>
                </div>

                {/* filter section */}

                <FlightFilterPanel filters={filters} setFilters={setFilters} />

                     
            </div>
                    

            {/* Flight Details Section */}
            {loading ? (
              <LoadingIcon />
            ) : (
              <div className="flex-1 p-4"
                // style={{ height: "calc(100vh - 0.5rem)" }}
                    
                >
                {currentFlightData.map((item, index) => (
                    
                    <>
                      <div
                        key={index}
                        className="overflow-hidden"
                        style={{ minHeight: `${itemHeight}px` }}
                      >
                          
                          <FlightDetailsCardResult item={item}  />  

                      </div>

                    
                    </>

                  
                ))}


                  {/* pagination */}
                
                <div className="flex justify-center items-center mt-4">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 mx-1 rounded ${
                            currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white"
                        }`}
                        >
                        {index + 1}
                        </button>
                    ))}
                </div>
              </div>
            )}


        
        </div>

        
    
    </>
  );
}
export default FlightSearchCard;