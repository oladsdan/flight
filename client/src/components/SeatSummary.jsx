
// import { Button } from "@/components/ui/button";
import { X } from "lucide-react";


export const SeatSummary = ({ selectedSeats, flight, onContinue, onRemoveSeat }) => {
  const totalSeatPrice = selectedSeats?.reduce((sum, seat) => sum + seat.price, 0);
  const totalPrice = flight?.price + totalSeatPrice;
  
  return (
    <div className="bg-white/50 dark:bg-gray-900/50 rounded-xl p-6 shadow-subtle sticky top-6">
      <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
      
      <div className="mb-6 pb-6 border-b border-border/40">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="font-medium">{flight?.airline}</p>
            <p className="text-sm text-foreground/70">{flight?.departureCity} to {flight?.arrivalCity}</p>
          </div>
          <span className="font-semibold">${flight?.price}</span>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Flight Base Price</span>
            <span className="text-sm">${flight?.price}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Taxes & Fees</span>
            <span className="text-sm">Included</span>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-3">Selected Seats</h4>
        
        {selectedSeats?.length === 0 ? (
          <p className="text-sm text-foreground/70 mb-4">No seats selected yet</p>
        ) : (
          <div className="space-y-3 mb-4">
            {selectedSeats.map(seat => (
              <div key={seat.id} className="flex justify-between items-center bg-background/50 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center text-white">
                    {seat.row}{seat.column}
                  </div>
                  <div>
                    <p className="font-medium text-sm">Seat {seat?.row}{seat?.column}</p>
                    <p className="text-xs text-foreground/70">
                      {seat.type === "standard" ? "Standard" : 
                       seat.type === "extra-legroom" ? "Extra Legroom" : "Premium"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">${seat.price}</span>
                  <button 
                    onClick={() => onRemoveSeat(seat.id)}
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mb-8 pb-6 border-b border-border/40">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Seat Selection</span>
          <span className="text-sm">${totalSeatPrice}</span>
        </div>
        
        <div className="flex justify-between items-center font-bold mt-4">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>
      </div>
      
      <button
        onClick={onContinue}
        className="w-full p-2 bg-blue-600 rounded-lg  hover:bg-blue-700 text-white"
        size="lg"
      >
        Continue to Payment
      </button>
      
      <p className="text-xs text-center text-foreground/60 mt-4">
        By continuing, you agree to our terms and conditions.
      </p>
    </div>
  );
};
