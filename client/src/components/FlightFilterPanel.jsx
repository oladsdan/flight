import { Armchair, ListFilter } from 'lucide-react';
import { RangeSlider, Checkbox} from "flowbite-react";
import { airlines, stopOptions,  cabinClassOptions } from '../Data/airlines';
import { IoIosAirplane } from "react-icons/io";
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';



export const formatTravelTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
};



const FlightFilterPanel = ({filters, setFilters}) => {

  

  const [priceRange, setPriceRange] = useState(filters?.priceRange);
  const [travelTimeRange, setTravelTimeRange] = useState(filters?.travelTime || [0, 1440]);





  //formatpricerange to naira
  function formatToNairaShort(number) {
    const format = (val, suffix) => {
      const rounded = Math.round(val * 10) / 10; // round to 1 decimal place
      return `₦${Number.isInteger(rounded) ? rounded : rounded.toFixed(1)}${suffix}`;
    };
  
    if (number >= 1_000_000_000) {
      return format(number / 1_000_000_000, 'b');
    } else if (number >= 1_000_000) {
      return format(number / 1_000_000, 'm');
    } else if (number >= 1_000) {
      return format(number / 1_000, 'k');
    } else {
      return `₦${Number.isInteger(number) ? number : number.toFixed(2)}`;
    }
  }



  //handle price change
  const handlePriceChange = (value) => {
    const numValue = Number(value[0]);
    const newPriceRange = [numValue, priceRange[1]];
    setPriceRange(newPriceRange);
    setFilters(prev => ({ ...prev, priceRange: newPriceRange }));
  }

  //handle AirlineChange
  const handleAirlineChange = (value) => {
    setFilters(prev => {
      const airlines = prev.airlines.includes(value) ? prev.airlines.filter(item => item !== value) : [...prev.airlines, value];
      return { ...prev, airlines };
    });
  }

  //handleTravelTimeChange
  const handleTravelTimeChange = (value) => {
    const numValue = Number(value);
    const newTravelTimeRange = [numValue, 1440];
    setTravelTimeRange(newTravelTimeRange);
    setFilters(prev => ({ ...prev, travelTime: newTravelTimeRange }));
  }

 
  //handlestopschange
  const handleStopsChange = (value) => {
    setFilters(prev => {
      const stops = prev.stops.includes(value) ? prev.stops.filter(item => item !== value) : [...prev.stops, value];
      return { ...prev, stops };
    });
  }

  //handleCabinClassChange
  const handleCabinClassChange = (value) => {
    setFilters(prev => {
      const cabinClass = prev.cabinClass.includes(value) ? prev.cabinClass.filter(item => item !== value) : [...prev.cabinClass, value];
      return { ...prev, cabinClass };
    });
  }

  const handleClearFilters = () => {
    setFilters({
      priceRange: [0, 10000000],
      airlines: [],
      stops: [],
      travelTime: [0, 1440],
      cabinClass: [],
    });
    setPriceRange([0, 10000000]);
    setTravelTimeRange([0, 1440]);
  }


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
              <RangeSlider min={0} max={filters?.priceRange[1]} defaultValue={priceRange} step={50} onChange={(e) => handlePriceChange([e.target.value, priceRange[1]])} className="w-full h-2  rounded-lg appearance-none cursor-pointer my-4" />

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">{formatToNairaShort(priceRange[0])}</span>
                <span className="text-sm font-medium text-gray-600">{formatToNairaShort(priceRange[1])}</span>
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
                checked={filters.airlines.includes(airline)}
                onClick={() => handleAirlineChange(airline)}
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
                  checked={filters.stops.includes(option.value)}
                  onClick={() => handleStopsChange(option.value)}
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
              max={1440}
              step={30}
              onChange={(e) => handleTravelTimeChange(e.target.value)}
              defaultValue={[travelTimeRange[0], travelTimeRange[1]]}
              className="my-4"
            />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">{formatTravelTime(travelTimeRange[0])}</span>
              <span className="text-sm font-medium text-gray-500">{formatTravelTime(travelTimeRange[1])}</span>
             
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
                  checked={filters.cabinClass.includes(option.value)}
                  onClick={() => handleCabinClassChange(option.value)}
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
            onClick={handleClearFilters}
            className="text-sm text-travel text-blue-600 hover:underline"
          >
            Clear all filters
          </button>
        </div>


    </div>
  )
}

export default FlightFilterPanel