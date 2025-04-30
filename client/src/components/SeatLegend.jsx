
import { Armchair, X } from "lucide-react";

export const SeatLegend = () => {
  return (
    <div className="border-t border-border/40 pt-6 flex flex-wrap gap-x-8 gap-y-4 justify-center">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-t-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <Armchair className="h-4 w-4" />
        </div>
        <span className="text-sm">Standard Seat ($15)</span>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-t-md bg-blue-200 dark:bg-blue-900/50 flex items-center justify-center">
          <Armchair className="h-4 w-4" />
        </div>
        <span className="text-sm">Extra Legroom ($25)</span>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-t-md bg-purple-200 dark:bg-purple-900/50 flex items-center justify-center">
          <Armchair className="h-4 w-4" />
        </div>
        <span className="text-sm">Window($45)</span>
      </div>


      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-t-md bg-red-200 dark:bg-purple-900/50 flex items-center justify-center">
          <Armchair className="h-4 w-4" />
        </div>
        <span className="text-sm">Aisle($45)</span>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-t-md bg-blue-900 dark:bg-travel flex items-center justify-center">
          <Armchair className="h-4 w-4 text-white" />
        </div>
        <span className="text-sm">Selected Seat</span>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-t-md bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
          <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </div>
        <span className="text-sm">Unavailable</span>
      </div>
    </div>
  );
};
