import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import { FaApple } from "react-icons/fa6";
import { toast } from "react-toastify";
import AuthContext from "../stateManagement/Auth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
  
       await login(email, password);
      toast.success("Login successful");
      setEmail("");
      setPassword("");
      navigate("/");

  
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-[80vh]"
      style={{
        backgroundImage: "url('/img/illustration-flying-airplane.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-[full]">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Enter Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Or Login With</p>
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
            >
              {/* <FcGoogle /> */}
              Google
            </a>
            <a
              href="#"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300"
            >
              {/* <FaApple /> */}
              Apple
            </a>
          </div>
        </div>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:underline font-bold"
          >
            Sign Up
          </Link>
        </p>

        <p className="mt-4 text-center text-sm">
          Forget Password?{" "}
          <Link
            to="/ForgetPassword"
            className="text-blue-500 hover:underline font-bold"
          >
            Click here!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
