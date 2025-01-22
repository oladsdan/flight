import  {  useContext, useState,} from "react";
import { Navbar } from "flowbite-react";
import { Link, } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import  AuthContext  from "../stateManagement/Auth";


function CustomNavbar() {


  const {  isAuthenticated, logout } = useContext(AuthContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  let timeoutId;
  
  // console.log("thisisauth", isAuthenticated);

  // useEffect(() => {
  //   console.log("thisisauth", isAuthenticated);
  // }, [isAuthenticated]);

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setDropdownVisible(true);
  }

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setDropdownVisible(false);
    }, 300);
  }


  const handleLogout = async() => {
    await logout();
    localStorage.removeItem("auth-token");
  };

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
        <div className="flex md:order-2 px-10 text-sm">
          <div className="flex gap-3">

            {isAuthenticated ? (
              
                  <>
                      <div
                        className="relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="bg-blue-500 rounded-lg p-2 text-white hover:bg-blue-600 cursor-pointer">
                          <FaUserCircle />
                        </div>
                        {dropdownVisible && (
                          <div
                            className="absolute right-0 mt-2 w-48 z-50 bg-white border border-gray-200 rounded-lg shadow-lg"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                          >
                            <Link
                              to="/dashboard"
                              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                            >
                              My Account
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                            >
                              Logout
                            </button>
                          </div>
                        )}
                      </div>
                    
              </>

            ):(
              <>
                  <Link to="/login">
                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Login
                    </span>
                  </button>
                </Link>

                <Link to="/signup">
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Signup
                    </span>
                  </button>
                </Link>
              </>
              

            )}

            
          </div>

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Link to="/">
            <Navbar.Link className="text-black"  active>
              Home
            </Navbar.Link>
          </Link>
          <Link to="/about">
            <Navbar.Link className="text-black">
              About
            </Navbar.Link>
          </Link>
          <Navbar.Link className="text-black" >
            Services
          </Navbar.Link>
          <Navbar.Link className="text-black" >
            Pricing
          </Navbar.Link>

          <Link to="/contact">
            <Navbar.Link className="text-black">
              Contact
            </Navbar.Link>
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default CustomNavbar;




