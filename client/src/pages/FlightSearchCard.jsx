import FlightSearchDesign from "../components/FlightSearchDesign";
import { useContext, useState } from "react";
import AuthContext from "../stateManagement/Auth";
import slidesData from "../components/slidesData";
import FlightDetailsCard from "../components/FlightDetailsCard";
import FlightDetailsCardResult from "../components/FlightDetailsCardResult";
import dataResult from "../Data/queryData.json";


const FlightSearchCard = () => {

  const itineriaries = dataResult?.data?.itineraries;


    const {setTripType, departureCity, handleInputChange, showModal, activeField, suggestions, handleSuggestionClick, destinationCity, departureDate, setDepartureDate, tripType, returnDate, setReturnDate} = useContext(AuthContext);

    const itemHeight = 160;
    const totalHeight = slidesData.length * (itemHeight * 1.3);
    

    //we paginate
    const [currentPage, setCurrentPage] = useState(1);
    const flightsPerPage = 3;
    const totalItems = itineriaries?.length;
    const totalPages = Math.ceil(totalItems / flightsPerPage);
    const startIndex = (currentPage - 1) * flightsPerPage;
    const endIndex = startIndex + flightsPerPage;
    const currentFlightData = itineriaries.slice(startIndex, endIndex);

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
            <div className="w-1/4 p-4 bg-gray-100 ">
              <h2 className="text-lg font-semibold mb-4">Filter</h2>

              {/* Price Filter Example */}
              <label className="block mb-2">Min Price</label>
              <input type="number" className="w-full p-2 border rounded mb-4" />

              <label className="block mb-2">Max Price</label>
              <input type="number" className="w-full p-2 border rounded mb-4" />

              <button className="w-full bg-blue-500 text-white p-2 rounded">
                Apply
              </button>
            </div>

            {/* Results Section */}
              <div className="flex-1 p-4"
                  // style={{ height: "calc(100vh - 0.5rem)" }}
                      
                  >
                  {currentFlightData.map((item, index) => (
                      // <div
                      //     key={index}
                      //     className="overflow-hidden"
                      //     style={{ minHeight: `${itemHeight}px` }}
                      // >
                      //     <FlightDetailsCard
                      //     departure="Paris - CDG"
                      //     arrival={destinationCity}
                      //     isRoundTrip={true}s
                      //     cabinClass="Economy"
                      //     adultsCount={4} 
                      //     childrenCount={1}
                      //     />
                      // </div>
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



                  {/* Pagination */}
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


        
        </div>

        
    
    </>
  );
}
export default FlightSearchCard;