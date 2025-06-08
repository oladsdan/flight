/* eslint-disable react/no-unescaped-entities */
import { TabItem, Tabs } from "flowbite-react";
import { BookOpen, Ticket, FolderKanban } from 'lucide-react';
import FlightManagement from "./AdminComponent/FlightManagement";
import BookingMonitor from "./AdminComponent/BookingMonitor";
import SupportTickets from "./AdminComponent/SupportTickets";



const AdminDashboard = () => {
  return (
    <div className='bg-blue-50 min-h-screen'>
        <main className='max-w-7xl mx-auto px-4 pb-20'>
         <div className="py-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage flights, bookings, and customer support</p>
        </div>
        



        <div className="overflow-x-auto">
        <Tabs aria-label="Full width tabs" variant="fullWidth">
            <TabItem active title="Flight Management" icon={FolderKanban}>
            <FlightManagement />
            </TabItem>
            <TabItem title="Booking Monitor" icon={BookOpen}>
            <BookingMonitor />
            </TabItem>
            <TabItem title="Support Tickets" icon={Ticket}>
                <SupportTickets />
            </TabItem>
            
            
        </Tabs>
        </div>

        </main>

    </div>
  )
}

export default AdminDashboard