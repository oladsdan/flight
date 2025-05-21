import React from "react";
import { RiDashboard2Fill, RiCustomerService2Fill } from "react-icons/ri";
import { MdFlightTakeoff } from "react-icons/md";

function Sidebar() {
  const sidelinks = [
    {
      title: "Bookings",
      icon: <RiDashboard2Fill />,
      link: "/bookings",
      user: "All",
    },
    {
      title: "Manage flights",
      icon: <MdFlightTakeoff />,
      link: "/manage-flights",
      user: "User",
    },
    {
      title: "Customer care",
      icon: <RiCustomerService2Fill />,
      link: "/support-tickets",
      user: "User",
    },
  ];

  return (
    <div className=" h-screen p-6 flex flex-col gap-3 font-semibold ">
      {sidelinks.map((likss, i) => (
        <div
          key={i}
          className=" flex items-center gap-3  hover:bg-[#01004D] hover:text-white rounded-md transition duration-300 p-3"
        >
          {likss.icon}
          {likss.title}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
