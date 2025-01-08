import React from "react";
import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
function CustomNavbar() {
  return (
    <>
      <Navbar fluid className=" px-44  bg-white h-35 ">
        <Navbar.Brand className="px-10">
          <img
            src="/img/flight1.png"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flight Logo
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2 px-10">
          <div className="flex gap-3">
            <button className="bg-blue-500 rounded-lg p-2 text-white">
              <Link to="/login">
                <FaUserCircle />
              </Link>
            </button>
            {/* <Link to="/signup">
              Dont have an account?{" "}
              <button className="bg-red-500 rounded-lg pt-1 pb-1 pl-2 pr-2 text-white">
                Signup
              </button>
            </Link> */}
          </div>

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link className="text-black" href="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link className="text-black" href="/about">
            About
          </Navbar.Link>
          <Navbar.Link className="text-black" href="#">
            Services
          </Navbar.Link>
          <Navbar.Link className="text-black" href="#">
            Pricing
          </Navbar.Link>
          <Navbar.Link className="text-black" href="/contact">
            Contact
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
