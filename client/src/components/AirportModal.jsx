
// import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

// const AirportModal = ({ airportSuggestions, handleAirportSelect, onClose }) => {
//   return (
//     <Dialog onClose={onClose}>
//       <DialogOverlay className="fixed inset-0 bg-black bg-opacity-25" />
//       <DialogContent className="fixed inset-1/4 bg-white p-6 rounded-lg">
//         <h2 className="text-lg font-bold mb-4">Select Airport</h2>
//         <ul className="max-h-60 overflow-auto">
//           {airportSuggestions.map((airport, index) => (
//             <li
//               key={index}
//               className="p-2 hover:bg-gray-200 cursor-pointer"
//               onClick={() => handleAirportSelect(`${airport.name} (${airport.code})`)}
//             >
//               {airport.name} ({airport.code})
//             </li>
//           ))}
//         </ul>
//         <Button onClick={onClose} className="w-full mt-4 bg-red-500 text-white">Close</Button>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AirportModal;
import { Modal } from 'flowbite-react';
// import { Button } from "@/components/ui/button";

const AirportModal = ({ airportSuggestions, handleAirportSelect, onClose, showModal }) => {
  return (
    <Modal show={showModal} onClose={onClose}>
      <Modal.Header>Select Airport</Modal.Header>
      <Modal.Body>
        <ul className="max-h-60 overflow-auto">
          {airportSuggestions.map((airport, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleAirportSelect(`${airport.name} (${airport.code})`)}
            >
              {airport.name} ({airport.code})
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onClose} className="bg-red-500 text-white">
            Close
        </button>
        {/* <Button onClick={onClose} className="bg-red-500 text-white">
          Close
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default AirportModal;
