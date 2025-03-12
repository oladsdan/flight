import turkish3 from "../assets/turkish3.png";
import searchArrow from "../assets/searchArrow.png";
import flightDatas from "./flightDatas";
import FlightInfo from "./FlightInfo";

export default function FlightDetailsCard({
  departure,
  arrival,
  isRoundTrip,
  cabinClass,
  adultsCount,
  childrenCount,
}) {
  const airportCode = departure.split("-")[1]?.trim().toLowerCase();
  const findSelectedFlight = flightDatas.find(
    (flight) => flight.departureAirport.toLowerCase() === airportCode
  );

  if (!findSelectedFlight) {
    return <p>No flight data found for the selected criteria.</p>;
  }

  const calculatePrice = () => {
    const { price } = findSelectedFlight;
    const adultPrice = price * adultsCount;
    const childPrice = price * childrenCount * 0.5;
    const multiplier = cabinClass === "Business" ? 2.5 : 1;
    return (adultPrice + childPrice) * multiplier;
  };

  const basePrice = calculatePrice();

  return (
    <div className="mb-5 flex flex-row bg-gray-100 rounded-xl lg:p-3 p-2">
      <div className="w-10/12 flex flex-col gap-10">
        <FlightInfo
          imageSrc={turkish3}
          departure={departure}
          arrival={arrival}
          flightDetails={findSelectedFlight}
          isReturn={false}
        />
        {isRoundTrip && (
          <FlightInfo
            imageSrc={turkish3}
            departure={arrival}
            arrival={departure}
            flightDetails={findSelectedFlight}
            isReturn={true}
          />
        )}
      </div>
      <div className="w-3/12 flex flex-col justify-center items-center">
        <p className="lg:text-xs text-[9px] text-color2">
          adults: {adultsCount}
        </p>
        <p className="lg:text-xs text-[9px] text-color2 mt-1">
          children: {childrenCount}
        </p>
        <p className="lg:text-xs text-[9px] mt-2 text-color1 font-semibold">
          ${basePrice.toFixed(2)}
        </p>
        <div className="flex items-center cursor-pointer flex-row bg-color1 lg:gap-2 gap-1 lg:p-2 p-[5px] rounded-lg lg:mt-8 mt-2 hover:bg-color2 transition-all duration-500">
          <button className="lg:text-xs text-[8px] text-color4">Search</button>
          <img
            src={searchArrow}
            alt="search arrow"
            className="lg:w-4 lg:h-4 w-3 h-3"
          />
        </div>
      </div>
    </div>
  );
}
