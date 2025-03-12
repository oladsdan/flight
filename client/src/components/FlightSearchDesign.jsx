import { Datepicker } from "flowbite-react"
import AirportModal from "./AirportModal"
import { Link } from "react-router-dom"



const FlightSearchDesign = ({setTripType, departureCity, handleInputChange, showModal, activeField, suggestions,
     handleSuggestionClick, destinationCity, departureDate, setDepartureDate, tripType, returnDate, setReturnDate}) => {

  return (
    <div>

        <div className="flex justify-start gap-4 items-center ">
          <div className="flex items-center ">
            {/* <input type="radio" id="oneWay" name="tripType" onChange={() => setTripType("oneWay")} defaultChecked /> */}
            <input type="radio" id="oneWay" name="tripType" onClick={() => setTripType("oneWay")} defaultChecked />
            <label htmlFor="oneWay" className="text-white">
              One-way
            </label>
          </div>
          <div className="flex items-center ">
            {/* <input type="radio" id="roundTrip" name="tripType" onChange={() => setTripType("roundTrip")} checked={tripType === "roundTrip"} /> */}
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
          <Link
            to="/flightsearchcard"
            className="flex justify-center items-center bg-white p-2 rounded-xl border-2 hover:bg-[#01004D] hover:text-white
             transition ease-in-out duration-500 border-white w-1/3 "
          >
            <button>Search flights</button>
          </Link>
        </div>


    </div>
  )
}

export default FlightSearchDesign