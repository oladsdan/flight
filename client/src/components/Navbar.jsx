import  {  useContext, useState,} from "react";
import { Navbar } from "flowbite-react";
import { Link, } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import  AuthContext  from "../stateManagement/Auth";


function CustomNavbar() {


  const {  isAuthenticated,  } = useContext(AuthContext);
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


  const handleLogout = () => {
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
                  <button className="bg-blue-500 rounded-lg p-2 text-white  hover:bg-blue-600">
                  <Link to="/login">Login</Link>
                  </button>

                  
                  <Link to="/signup">
                    Dont have an account?{" "}
                    <button className="bg-red-500 rounded-lg pt-1 pb-1 pl-2 pr-2 text-white">
                      Signup
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




