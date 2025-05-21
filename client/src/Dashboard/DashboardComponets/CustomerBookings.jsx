import { Card } from "flowbite-react";
import { Armchair } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../stateManagement/Auth";
import { Link } from "react-router-dom";



const CustomerBookings = () => {

    const {isAuthenticated} = useContext(AuthContext);

    // get the booking history from the backend
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {



            try {
                
                const response = await fetch('http://localhost:5000/api-booking/get-all-bookings',{
                    method: 'GET',
                   headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${isAuthenticated}`,
                  },
                });
                const data = await response.json();
                setBookings(data?.bookings);
                setLoading(false);
                console.log(bookings)
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setLoading(false);
            }
        };
        fetchBookings();
    }, [isAuthenticated]);

    console.log("this is the bookings", bookings)



    if (loading) {
    return (
      <div className="flex-1 flex p-5 justify-center items-center h-screen">
      <div className="flex justify-center items-center py-20 transform -translate-y-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    </div>
    );
  }
  



  return (



    <main className='max-w-7xl mx-auto px-4 pb-20'>
        <div className="px-20 pt-20 pb-4">
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground mt-2">View and manage your travel bookings</p>
        </div>

        {/* booking stats */}
        <div className='px-20 grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
          <Card className="max-w-sm">
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Total Bookings
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Your lifetime bookings
                </p>
                <span className="text-2xl">{bookings?.length || 0}</span>

         </Card>
          <Card className="max-w-sm">
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Upcoming trips
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Flights in the next 30 days
                </p>
                <span className="text-2xl">
                     {bookings?.filter(b => {
                  const travelDate = new Date(b.travelDate).getDate();
                  const today = new Date();
                  const thirtyDaysFromNow = new Date();
                  thirtyDaysFromNow.setDate(today.getDate() + 30);
                  return travelDate >= today && travelDate <= thirtyDaysFromNow;
                }).length || 0}
                </span>
         </Card>
          <Card className="max-w-sm">
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Most used class
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Your preferred cabin
                </p>
                <span className="text-2xl flex items-center ">                  
                    <Armchair className="mr-2 h-5 w-5 text-blue-600" />
                    Business
                </span>
         </Card>
        </div>


        {/* booking history */}

        <div className='px-20'>
          <h2 className="text-2xl font-bold mb-4">Booking History</h2>
          
            <Card className="overflow-x-auto">
               {bookings && bookings.length > 0 ? (
                <Table striped className="w-full">
                    <TableHead>
                    
                        <TableHeadCell>Airline</TableHeadCell>
                        <TableHeadCell>From - To</TableHeadCell>
                        <TableHeadCell>Date</TableHeadCell>
                        <TableHeadCell>Return Date</TableHeadCell>
                        <TableHeadCell>Stops</TableHeadCell>
                        <TableHeadCell>Price</TableHeadCell>
                        <TableHeadCell>
                            <span className="sr-only">Delete</span>
                        </TableHeadCell>
                    
                    </TableHead>
                    <TableBody className="divide-y">
                        {bookings.map((booking) => (
                        <TableRow key ={booking?.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {booking?.airline}
                            </TableCell>
                            <TableCell>{booking?.departure} - {booking?.arrival}</TableCell>
                            <TableCell>{booking?.travelDate}</TableCell>
                            <TableCell>{booking?.returnDate || "N/A"}</TableCell>
                            <TableCell>{booking?.stopCount}</TableCell>
                            <TableCell>{booking?.price}</TableCell>
                            <TableCell>
                                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                    Delete
                                </a>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>

                ):(
                    <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">No bookings found</h3>
                <p className="text-muted-foreground mb-4">Start your journey by booking a flight today!</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                  <Link to="/flight-search">Search Flights</Link>
                </button>
                    </div>
                )}
            </Card>
        

        
        
        </div>


        
    </main>
  )
}

export default CustomerBookings