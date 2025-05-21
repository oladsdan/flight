import React from "react";
import Sidebar from "./DashboardComponets/Sidebar";
import CustomerBookings from "./DashboardComponets/CustomerBookings";
// import HandleCustomersTicket from "./components/HandleCustomersTicket";
// import ManageFlights from "./components/ManageFlights";
// import MonitorFlights from "./components/MonitorFlights";

const Dashboard = () => {
  const role = "Admin";
  return (
    <div className="w-full bg-[#FFFFFF] p-4 min-h-screen ">
      {role === "Admin" ? (
        <div className="w-full flex">
          <div className="w-[25%] h-44 lg:w-[15%] ">
            <Sidebar />
          </div>

          <div className="flex-1 w-full  lg:w-[75%] bg-[#e6e6e6]">
            <CustomerBookings/>
          </div>
        </div>
      ) : (
        <div className="w-full h-[100vh] bg-red-500 flex">
          <div >mmmmm</div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
