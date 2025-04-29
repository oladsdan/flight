import { useEffect, useState } from "react";
import { Armchair, X} from "lucide-react";


const SeatMap = ({selectedSeats, onSeatSelect}) => {

  const [seats, setSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //generate seate layout 
  const generateSeatData = () => {
    const seats = [];
    const rows = 20; // Number of rows
    const columns = ["A", "B", "C", "D", "E", "F"]; // Column letters

    for (let row = 1; row <= rows; row++){
      for (let col of columns){
        // Random status distribution (70% available, 30% occupied)
        const status = Math.random() > 0.3 ? "available" : "occupied";


        //Determine seat type
        let type = "standard" | "extra-legroom" | "aisle" | "window";
        let price = 0; // Default price



        if (col === "A" || col === "F") {
          type = "window";
          price = 45;
        } else if (col === "C" || col === "D") {
          type = "aisle";
          price = 30;
        } else if (row === 1) {
          type = "extra-legroom";
          price = 25;
        } else {
          type = "standard";
          price = 15;
          
        }

        seats.push({
          id: `${row}${col}`,
          row,
          column: col,
          type,
          status,
          price
        });

      }
    }

    return seats;

  };

  // Generate seats when the component mounts
  useEffect(() => {
    // Simulate loading seat data from API
    setIsLoading(true);
    setTimeout(() => {
      setSeats(generateSeatData());
      setIsLoading(false);
    }, 800);
  }, []);


  const getSeatStatus = (seat) => {
    const isSelected = selectedSeats?.some(s => s.id === seat.id);
    if (isSelected) return "selected";
    return seat.status;
  };
 

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-travel"></div>
      </div>
    );
  }


  const columns = ["A", "B", "C", "D", "E", "F"];
  const rows = Array.from(new Set(seats.map((seat) => seat.row))).sort((a, b) => a - b); // Generates an array of numbers from 1 to 30
  

  return (
    <div className="flex flex-col items-center mb-8" >
        <div className="mb-8 w-full max-w-2xl">
            <div className="bg-gray-200 dark:bg-gray-800 h-8 rounded-t-lg flex items-center justify-center mb-10">
                <span className="text-sm font-medium">Front of Aircraft</span>
            </div>



            <div className="relative">
              {/* Row numbers */}
              <div className=" absolute -left-10 top-0 bottom-0 flex flex-col justify-around">
                {/* {rows.} */}
                {rows.map(row => (
                  <div key={`row-${row}`} className="h-10 flex items-center justify-center text-sm font-medium text-foreground/70">
                    {row}
              </div>
               ))}
              </div>

                  {/* Column letters */}
              <div className="flex justify-between mb-2 px-2">
                {columns.map((col, index) => (
                  <div key={`col-${col}`} className={(
                    "w-10 flex items-center justify-center text-sm text-foreground/70",
                    index === 2 && "mr-8",
                    index === 3 && "ml-8"
                  )}>
                    {col}
                  </div>
                ))}
              </div>


              
                {/* Seat grid */}
                <div className="flex flex-col gap-2">
                  {rows.map(row => (
                    <div key={`seat-row-${row}`} className="flex justify-between">
                      {columns.map((col, index) => {
                        const seat = seats.find(s => s.row === row && s.column === col);
                        if (!seat) return null;
                        
                        const status = getSeatStatus(seat);
                       
                        
                        return (
                          <div key={`seat-${row}${col}`} className={(
                            "relative",
                            index === 2 && "mr-8",
                            index === 3 && "ml-8"
                          )}>
                            <button
                              onClick={() => onSeatSelect(seat)}
                              disabled={status === "occupied"}
                              className={`
                                "w-10 h-10 rounded-t-md p-3 flex items-center justify-center transition-colors",
                                ${status === "available" && seat.type === "standard" && "bg-gray-200 hover:bg-gray-300/30 dark:bg-gray-700 dark:hover:bg-travel/50"},
                                ${status === "available" && seat.type === "extra-legroom" &&  "bg-blue-200 hover:bg-blue-300 dark:bg-blue-900/50 dark:hover:bg-blue-800/60"},
                                ${status === "available" && seat.type === "window" && "bg-purple-200 hover:bg-purple-300 dark:bg-purple-900/50 dark:hover:bg-purple-800/60"},
                                ${status === "available" && seat.type === "aisle" && "bg-red-200 hover:bg-purple-300 dark:bg-red-600/50 dark:hover:bg-red-800/60"},
                                ${status === "occupied" && "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"},
                                ${status === "selected" && "bg-blue-900 hover:bg-gray-900 text-white"}
                              `}
                            >
                              {status === "occupied" ? (
                                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                              ) : (
                                <Armchair className="h-5 w-5" />
                              )}
                            </button>
                            <div className="h-1 bg-gray-300 dark:bg-gray-700 rounded-b-sm"></div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
                    
            

            </div>

        </div>

    </div>
  )
}

export default SeatMap