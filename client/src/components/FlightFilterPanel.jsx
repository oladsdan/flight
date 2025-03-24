import { Armchair, ListFilter } from 'lucide-react';
import { RangeSlider, Checkbox} from "flowbite-react";
import { airlines, stopOptions,  cabinClassOptions } from '../Data/airlines';
import { IoIosAirplane } from "react-icons/io";
import { Clock } from 'lucide-react';


const FlightFilterPanel = ({filter, setFilter}) => {
  return (
    <div className='mt-4 p-4 bg-white shadow-md rounded-md'>
        <div className='flex items-center gap-2'>
            <ListFilter/>
            <span className='font-semibold text-gray-500'>Filter</span>
        </div>
        {/* price range */}
        <div className='flex flex-col gap-2 mt-4'>
            <span className='font-semibold text-gray-500'>Price Range</span>

            <div className='pt-2'>

              {/* <input type='range' min='0' max='1000' step='50' value={filter.priceRange} onChange={(e) => setFilter({...filter, priceRange: e.target.value})} className='w-full' /> */}
              {/* <input type='range' min='0' max='1000' step='50' className='w-full' /> */}
            

              {/* <RangeSlider min={0} max={1000} step={50} value={filter.priceRange} onChange={(value) => setFilter({...filter, priceRange: value})} /> */}
              <RangeSlider min={0} max={1000} defaultValue={[0, 1000]} step={50} className="w-full h-2  rounded-lg appearance-none cursor-pointer my-4" />

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">${0}</span>
                <span className="text-sm font-medium text-gray-600">$5000</span>
              </div>
            </div>

        </div>
        {/* airline */}
        <div className="space-y-4">
          <h4 className="font-bold text-sm flex items-center gap-2 text-gray-500 ">
            <IoIosAirplane className="h-4 w-4 text-travel" />
            Airlines
          </h4>
        <div className="space-y-2">
          {airlines.map(airline => (
            <div key={airline} className="flex items-center text-gray-600 space-x-2">
              <Checkbox 
                id={`airline-${airline}`}
                // checked={filters.airlines.includes(airline)}
                // onCheckedChange={() => handleAirlineChange(airline)}
              />
              <label 
                htmlFor={`airline-${airline}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {airline}
              </label>
            </div>
          ))}
        </div>
        </div>
        

        {/* Stops Filter */}
        <div className="space-y-4 mt-4">
            <h4 className="font-bold text-sm flex text-gray-600 items-center gap-2">
              <Clock className="h-4 w-4 text-travel" />
              Stops
            </h4>
          <div className="space-y-2">
            {stopOptions.map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={`stops-${option.value}`}
                  // checked={filters.stops.includes(option.value)}
                  // onCheckedChange={() => handleStopsChange(option.value)}
                />
                <label 
                  htmlFor={`stops-${option.value}`}
                  className="text-sm font-medium leading-none text-gray-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        

        
        {/* Travel Time Filter */}
        <div className="space-y-4 mt-4">
          <h4 className="font-bold text-gray-600 text-sm flex items-center gap-2">
            <Clock className="h-4 w-4 text-travel" />
            Travel Time
          </h4>
          <div className="pt-2">
            <RangeSlider
              // defaultValue={[travelTimeRange[0], travelTimeRange[1]]}
              max={1440}
              step={30}
              // onValueChange={handleTravelTimeChange}
              className="my-4"
            />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">10.00</span>
              <span className="text-sm font-medium text-gray-500">19.00</span>
              {/* <span className="text-sm font-medium">{formatTravelTime(travelTimeRange[0])}</span>
              <span className="text-sm font-medium">{formatTravelTime(travelTimeRange[1])}</span> */}
            </div>
          </div>
        </div>
        
        {/* Cabin Class Filter */}
        <div className="space-y-4 mt-4">
          <h4 className="text-gray-600 font-bold text-sm flex items-center gap-2">
            <Armchair className="h-4 w-4 text-travel" />
            Cabin Class
          </h4>
          <div className="space-y-2">
            {cabinClassOptions.map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={`cabin-${option.value}`}
                  // checked={filters.cabinClass.includes(option.value)}
                  // onCheckedChange={() => handleCabinClassChange(option.value)}
                />
                <label 
                  htmlFor={`cabin-${option.value}`}
                  className="text-sm font-medium text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Clear All Filters */}
        <div className="pt-2">
          <button
            // onClick={handleClearFilters}
            className="text-sm text-travel text-blue-600 hover:underline"
          >
            Clear all filters
          </button>
        </div>


    </div>
  )
}

export default FlightFilterPanel