import { Plane } from 'lucide-react';


const AirportModal = ({ suggestions, handleSuggestionClick }) => {
  return (
    <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg w-[400px] shadow-lg z-50 font-bold">
    <ul>
      {suggestions.map((suggestion) => (
        <li
          key={suggestion.iata_code}
          className="p-2 text-black hover:bg-gray-200 cursor-pointer"
          onClick={() => handleSuggestionClick(suggestion)}
        >
            <div className="flex  items-center">
            <Plane className="w-6 h-6" />   {suggestion.name} 
          ({suggestion.iata})
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default AirportModal;