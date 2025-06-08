
import { useState } from "react";
import { Card, Toast } from "flowbite-react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Dropdown, DropdownItem, TextInput, Button} from "flowbite-react";

// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Users } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";



const FlightManagement = () => {
//   const { toast } = useToast(); 
  const [flights, setFlights] = useState([
    {
      id: '1',
      flightNumber: 'TF001',
      departure: 'New York (JFK)',
      arrival: 'Los Angeles (LAX)',
      departureTime: '08:00',
      arrivalTime: '11:30',
      price: 299.99,
      capacity: 180,
      status: 'Active'
    },
    {
      id: '2',
      flightNumber: 'TF002',
      departure: 'Chicago (ORD)',
      arrival: 'Miami (MIA)',
      departureTime: '14:15',
      arrivalTime: '17:45',
      price: 249.99,
      capacity: 160,
      status: 'Active'
    }
  ]);

  const [newFlight, setNewFlight] = useState({
    flightNumber: '',
    departure: '',
    arrival: '',
    departureTime: '',
    arrivalTime: '',
    price: '',
    capacity: '',
    status: 'Active'
  });

  const handleAddFlight = () => {
    if (!newFlight.flightNumber || !newFlight.departure || !newFlight.arrival) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const flight = {
      id: (flights.length + 1).toString(),
      flightNumber: newFlight.flightNumber,
      departure: newFlight.departure,
      arrival: newFlight.arrival,
      departureTime: newFlight.departureTime,
      arrivalTime: newFlight.arrivalTime,
      price: parseFloat(newFlight.price) || 0,
      capacity: parseInt(newFlight.capacity) || 0,
      status: newFlight.status
    };

    setFlights([...flights, flight]);
    setNewFlight({
      flightNumber: '',
      departure: '',
      arrival: '',
      departureTime: '',
      arrivalTime: '',
      price: '',
      capacity: '',
      status: 'Active'
    });

    // toast({
    //   title: "Flight added",
    //   description: `Flight ${flight.flightNumber} has been added successfully`,
    // });
  };

//   const updateFlightStatus = (id, status) => {
//     setFlights(flights.map(flight => 
//       flight.id === id ? { ...flight, status } : flight
//     ));
    
//     toast({
//       title: "Flight updated",
//       description: `Flight status changed to ${status}`,
//     });
//   };

  return (
    <div className="space-y-6">
      <Card>
           <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Add New Flight
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                   create new flight schedule
                </p>
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="flightNumber">Flight Number</label>
              <TextInput
                id="flightNumber"
                value={newFlight.flightNumber}
                onChange={(e) => setNewFlight({...newFlight, flightNumber: e.target.value})}
                placeholder="TF001"
              />
            </div>
            <div>
              <label htmlFor="departure">Departure</label>
              <TextInput
                id="departure"
                value={newFlight.departure}
                onChange={(e) => setNewFlight({...newFlight, departure: e.target.value})}
                placeholder="New York (JFK)"
              />
            </div>
            <div>
              <label htmlFor="arrival">Arrival</label>
              <TextInput
                id="arrival"
                value={newFlight.arrival}
                onChange={(e) => setNewFlight({...newFlight, arrival: e.target.value})}
                placeholder="Los Angeles (LAX)"
              />
            </div>
            <div>
              <label htmlFor="price">Price ($)</label>
              <TextInput
                id="price"
                type="number"
                value={newFlight.price}
                onChange={(e) => setNewFlight({...newFlight, price: e.target.value})}
                placeholder="299.99"
              />
            </div>
            <div>
              <label htmlFor="departureTime">Departure Time</label>
              <TextInput
                id="departureTime"
                type="time"
                value={newFlight.departureTime}
                onChange={(e) => setNewFlight({...newFlight, departureTime: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="arrivalTime">Arrival Time</label>
              <TextInput
                id="arrivalTime"
                type="time"
                value={newFlight.arrivalTime}
                onChange={(e) => setNewFlight({...newFlight, arrivalTime: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="capacity">Capacity</label>
              <TextInput
                id="capacity"
                type="number"
                value={newFlight.capacity}
                onChange={(e) => setNewFlight({...newFlight, capacity: e.target.value})}
                placeholder="180"
              />
            </div>
            <div>
              <label htmlFor="status">Status</label>

                    <Dropdown label={newFlight.status} dismissOnClick={true}>
                        <DropdownItem>Active</DropdownItem>
                        <DropdownItem>Cancelled</DropdownItem>
                        <DropdownItem>Delayed</DropdownItem>
                    </Dropdown>

              {/* <Select value={newFlight.status} onValueChange={(value) => setNewFlight({...newFlight, status: value as Flight['status']})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                  <SelectItem value="Delayed">Delayed</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
          </div>
          <Button onClick={handleAddFlight} className="mt-4 w-40">
            Add Flight
          </Button>
      </Card>

      <Card>
        {/* <CardHeader>
          <CardTitle>Flight Schedule</CardTitle>
          <CardDescription>Manage existing flights and schedules</CardDescription>
        </CardHeader> */}
          <Table>
              <TableHead>
                <TableHeadCell>Flight</TableHeadCell>
                <TableHeadCell>Route</TableHeadCell>
                <TableHeadCell>Time</TableHeadCell>
                <TableHeadCell>Price</TableHeadCell>
                <TableHeadCell>Capacity</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell>Actions</TableHeadCell>
              </TableHead>
            <TableBody>
              {flights.map((flight) => (
                <TableRow key={flight.id}>
                  <TableCell className="font-medium">{flight.flightNumber}</TableCell>
                  <TableCell>{flight.departure} → {flight.arrival}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{flight.departureTime} - {flight.arrivalTime}</span>
                    </div>
                  </TableCell>
                  <TableCell>${flight.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{flight.capacity}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      flight.status === 'Active' ? 'bg-green-100 text-green-800' :
                      flight.status === 'Delayed' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {flight.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    



                    <Dropdown label={flight.status} dismissOnClick={true}>
                        <DropdownItem>Active</DropdownItem>
                        <DropdownItem>Cancelled</DropdownItem>
                        <DropdownItem>Delayed</DropdownItem>
                    </Dropdown>



                    {/* <Select value={flight.status} onValueChange={(value) => updateFlightStatus(flight.id, value as Flight['status'])}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                        <SelectItem value="Delayed">Delayed</SelectItem>
                      </SelectContent>
                    </Select> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </Card>
    </div>
  );
};

export default FlightManagement;
