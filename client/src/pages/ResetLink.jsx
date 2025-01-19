import { useState, useContext } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthContext from "../stateManagement/Auth";
import { toast } from "react-toastify";

const ResetLink = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  const {token} = useParams();

  const {resetPassword, error, isLoading, message} = useContext(AuthContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorText("Passwords do not match");
      return;
    }

    try {
			await resetPassword(token, password);

			toast.success("Password reset successfully, redirecting to login page...");
			setTimeout(() => {
				navigate("/login", { replace: true });
			}, 2000);
		} catch (error) {
			console.error(error);
			toast.error(error.message || "Error resetting password");
		};
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
      <div className="bg-white/0 p-8 rounded-lg shadow-lg w-full max-w-md h-[full]">
        {/* <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2> */}
				{message && <p className='text-green-500 text-sm mb-4'>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="flex justify-center items-center relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
             <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            </div>
            
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <div className="flex justify-center items-center relative">

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required
                />
                <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {errorText && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetLink;
