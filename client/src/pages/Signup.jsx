import { useState, useContext, useEffect } from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
import  AuthContext  from "../stateManagement/Auth";
import { useNavigate } from "react-router-dom";



const Signup = () => {
  const { signup, message, user, isLoading, error, setError } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      
      await signup(name, email, password);
      // console.log(message);
      // console.log(user)
      // toast.success(message);
      toast.success("Account created successfully. Please verify your email address.");
      navigate("/email-verification", { state: { email } }, { replace: true });
      setEmail("");
      setPassword("");
      setName("");
      setError(null);
    } catch (error) {
      // toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      console.log(user);
     
    }
  }, [user, message]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Enter Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Enter Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Enter Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Or Sign Up With</p>
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
            >
              Google
            </a>
            <a
              href="#"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300"
            >
              Apple
            </a>
          </div>
        </div>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
