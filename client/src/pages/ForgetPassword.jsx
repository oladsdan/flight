import { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
import  AuthContext  from "../stateManagement/Auth";
import {Loader, ArrowLeft} from "lucide-react";
import { Link } from "react-router-dom";


const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading,  forgotPassword } = useContext(AuthContext);


  const handleSubmit = async (e) => {
      e.preventDefault();
      await forgotPassword(email);
      setIsSubmitted(true);
      
  
  }


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
        <h2 className="text-2xl font-bold text-center mb-6">Forget Password</h2>

        {!isSubmitted ? (
              <form onSubmit={handleSubmit} >
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
    
              <button
                type="submit" 
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                {isLoading ? <Loader className='size-6 animate-spin mx-auto' /> : "Send Reset Link"}
              </button>
            </form>

        ) : (
          <p className='text-center text-black mb-6'>Password reset email sent successfully to {email}. you will receive a reset link shortly.</p>
        )}

        <div className="flex justify-center items-center">

          <Link to="/login" className="text-blue-500 mt-4 flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login</Link>
        </div>
        

      
      </div>
        
    </div>
  );
};

export default ForgetPassword;
