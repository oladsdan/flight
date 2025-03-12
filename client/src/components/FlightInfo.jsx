export default function FlightInfo({
  imageSrc,
  departure,
  arrival,
  flightDetails,
  isReturn,
}) {
  const departureTime = isReturn
    ? flightDetails.returnDepartureTime
    : flightDetails.departureTime;
  const arrivalTime = isReturn
    ? flightDetails.returnArrivalTime
    : flightDetails.arrivalTime;
  const flightDuration = isReturn
    ? flightDetails.returnFlightDuration
    : flightDetails.flightDuration;
  const stops = flightDetails.stops;

  return (
    <div className="flex flex-row justify-center lg:gap-8 gap-3 items-center">
      <img src={imageSrc} className="lg:w-10 lg:h-3 w-8 h-3" alt="Airline" />
      <div>
        <p className="lg:text-xs text-[9px] text-color1 font-semibold">
          {departure}
        </p>
        <p className="lg:text-xs text-[9px] text-color1 font-semibold text-right">
          {departureTime}
        </p>
      </div>
      <div className="flex flex-col justify-center gap-1 w-2/12 text-center">
        <p className="lg:text-xs text-[9px] text-color1">{flightDuration}</p>
        <div className="border-t-2 border-color5"></div>
        <p className="lg:text-xs text-[9px] text-color1">{stops}</p>
      </div>
      <div>
        <p className="lg:text-xs text-[9px] text-color1 font-semibold">
          {arrival}
        </p>
        <p className="lg:text-xs text-[9px] text-color1 font-semibold text-right">
          {arrivalTime}
        </p>
      </div>
    </div>
  );
}
