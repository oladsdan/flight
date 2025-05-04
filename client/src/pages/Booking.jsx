import { useState } from "react";
import SeatMap from "../components/SeatMap"
import { SeatLegend } from "../components/SeatLegend";
import { SeatSummary } from "../components/SeatSummary";
import { useNavigate, useLocation } from "react-router-dom";



const Booking = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const {flightPrice, realFlightnums} = location.state || ""




  const [selectedSeats, setSelectedSeats] = useState([]);
  const [flight, setFlight] = useState({
    id: "12345",
    airline: "Ethopian",
    departureCity: "Lagos",
    arrivalCity: "London",
    departureAirport: "MMIA",
    arrivalAirport: "London Heathrow",
    price: 100,
  });

  const handleSeatSelect = (seat) => {
    if (seat.status === "occupied") return;
    
    const isSelected = selectedSeats?.some(s => s.id === seat.id);
    
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, {...seat, status: "selected"}]);
    }
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      // toast.error("Please select at least one seat to continue.");
      return;
    }
    
    // In a real app, we would pass this to a booking confirmation page
    // toast.success(`${selectedSeats.length} seat(s) selected!`);
    navigate("/", { state: { selectedSeats, flight } });
  };
  

  return (
    // <div
    // className="flex justify-center items-center relative"
    // style={{
    //     backgroundImage: "url('/img/illustration-flying-airplane.jpg')",
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //     backgroundRepeat: "no-repeat",
        

    // }}
    // >
    //     {/* overlay */}
    //     <div style={{
    //     position: 'absolute',
    //     top: 0, left: 0,
    //     width: '100%',
    //     height: '100%',
    //     backgroundColor: 'rgba(0, 0, 0, 0.3)', // black with 50% opacity
    //     zIndex: 1
    //   }} />

    //     <div style={{
    //     position: 'relative',
    //     zIndex: 2,
    //     color: 'black',
    //     padding: '1rem'
    //   }}>
    //     <h1>Hello World</h1>
    //     <p>This text stays bright while the background is faded.</p>
    //     <span>lorem100</span>
    //   </div>

   

    // </div>

    <div className="min-h-screen relative">
      <img
        src="/img/illustration-flying-airplane.jpg"
        alt="Airplane"
        className="w-full h-full object-cover opacity-50 z-0 absolute"
      />

     
      <main className="max-w-7xl mx-auto px-4 pb-20 relative">
        <div className="py-6 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Select Your Seat</h1>
          <p className="text-foreground/70">
            {flight.airline} - Flight #{flight.id} | {flight.departureCity} ({flight.departureAirport}) to {flight.arrivalCity} ({flight.arrivalAirport})
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white/50 dark:bg-gray-900/50 rounded-xl p-6 shadow-subtle">
            <SeatMap onSeatSelect={handleSeatSelect} selectedSeats={selectedSeats} />
            <SeatLegend />
          </div>
          
          <div>
            <SeatSummary 
              selectedSeats={selectedSeats} 
              flight={flight}
              flightPrice={flightPrice}
              realFlightnums={realFlightnums}
              onContinue={handleContinue}
              onRemoveSeat={(seatId) => setSelectedSeats(selectedSeats.filter(s => s.id !== seatId))}
            />
          </div>
        </div>
      </main>
      
    </div>
  )
}


export default Booking