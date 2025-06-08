
import { useState } from "react";
import { Card, } from "flowbite-react"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput, Badge} from "flowbite-react"
// import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Activity } from "lucide-react";



const BookingMonitor = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [bookings] = useState([
    {
      id: 'BK001',
      userId: 'user123',
      userEmail: 'john.doe@email.com',
      flightNumber: 'TF001',
      route: 'New York → Los Angeles',
      travelDate: '2024-06-15',
      cabinClass: 'Economy',
      price: 299.99,
      status: 'Confirmed',
      bookingDate: '2024-05-20'
    },
    {
      id: 'BK002',
      userId: 'user456',
      userEmail: 'jane.smith@email.com',
      flightNumber: 'TF002',
      route: 'Chicago → Miami',
      travelDate: '2024-06-18',
      cabinClass: 'Business',
      price: 749.99,
      status: 'Confirmed',
      bookingDate: '2024-05-22'
    },
    {
      id: 'BK003',
      userId: 'user789',
      userEmail: 'bob.wilson@email.com',
      flightNumber: 'TF001',
      route: 'New York → Los Angeles',
      travelDate: '2024-06-20',
      cabinClass: 'Economy',
      price: 299.99,
      status: 'Pending',
      bookingDate: '2024-05-25'
    }
  ]);

  const stats = {
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter(b => b.status === 'Confirmed').length,
    pendingBookings: bookings.filter(b => b.status === 'Pending').length,
    totalRevenue: bookings
      .filter(b => b.status === 'Confirmed')
      .reduce((sum, b) => sum + b.price, 0)
  };

  const filteredBookings = bookings.filter(booking =>
    booking.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="pb-2">
            <div className="text-lg font-medium">Total Bookings</div>
            <div>All time bookings</div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-travel" />
              <span className="text-2xl font-bold">{stats.totalBookings}</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="pb-2">
            <div className="text-lg font-medium">Confirmed</div>
            <div>Confirmed bookings</div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold">{stats.confirmedBookings}</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="pb-2">
            <div className="text-lg font-medium">Pending</div>
            <div>Awaiting confirmation</div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-yellow-600" />
              <span className="text-2xl font-bold">{stats.pendingBookings}</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="pb-2">
            <div className="text-lg font-medium">Revenue</div>
            <div>Total confirmed revenue</div>
          </div>
          <div>
            <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
          </div>
        </Card>
      </div>

      <Card>
        <div>
          <div>Booking Activity</div>
          <div>Monitor all booking activities and user interactions</div>
          <div className="mt-4">
            <TextInput
              type="text"
              placeholder="Search by email, flight number, or booking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
        </div>
        <div>
          <Table>
            <TableHead>

                <TableHeadCell>Booking ID</TableHeadCell>
                <TableHeadCell>Customer</TableHeadCell>
                <TableHeadCell>Flight</TableHeadCell>
                <TableHeadCell>Route</TableHeadCell>
                <TableHeadCell>Travel Date</TableHeadCell>
                <TableHeadCell>Class</TableHeadCell>
                <TableHeadCell>Price</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell>Booked</TableHeadCell>
              
            </TableHead>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.userEmail}</TableCell>
                  <TableCell>{booking.flightNumber}</TableCell>
                  <TableCell>{booking.route}</TableCell>
                  <TableCell>{new Date(booking.travelDate).toLocaleDateString()}</TableCell>
                  <TableCell>{booking.cabinClass}</TableCell>
                  <TableCell>${booking.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        booking.status === 'Confirmed' ? 'default' :
                        booking.status === 'Pending' ? 'secondary' : 'destructive'
                      }
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(booking.bookingDate).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default BookingMonitor;
