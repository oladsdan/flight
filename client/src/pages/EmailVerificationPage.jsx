import { useEffect, useRef, useState, useContext } from "react";
import {useNavigate, useLocation} from "react-router-dom";
import { toast } from "react-toastify";
import  AuthContext  from "../stateManagement/Auth";



const EmailVerificationPage = () => {

	const {error, isLoading, verifyEmail} = useContext(AuthContext);



    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
	const location = useLocation();
	const email = location.state.email;



    const handleChange = (index, value) => {
		const newCode = [...code];

		// Handle pasted content
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);

			// Focus on the last non-empty input or the first empty one
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex].focus();
		} else {
			newCode[index] = value;
			setCode(newCode);

			// Move focus to the next input field if value is entered
			if (value && index < 5) {
				inputRefs.current[index + 1].focus();
			}
		}
	};

    
	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

	const handleVerification = async (e) => {
		e.preventDefault();
		const verificationCode = code.join("");
		try {
			await verifyEmail(email, verificationCode);
			navigate("/");
			toast.success("Email verified successfully");
		} catch (error) {
			toast.error(error.message);
		}
	}

	//Auto submit when all fields are filled
	useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			handleVerification(new Event("submit"));
		}
		
	}, [code]);





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
          <h2 className="text-2xl font-bold text-center mb-6">Verify Your Email</h2>
          <p className='text-center text-black mb-6'>Enter the 6-digit code sent to your email address.</p>
          <form onSubmit={handleVerification}  className='space-y-6'>
					<div className='flex justify-between'>
						{code.map((digit, index) => (
							<input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type='text'
								maxLength='6'
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								className='w-12 h-12 text-center text-2xl font-bold bg-white text-black border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none'
							/>
						))}
					</div>
					
					{error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
						disabled={isLoading || code.some((digit) => !digit)}
					>
            			{isLoading ? "Verifying..." : "Verify Email"}
          			</button>
				</form>
        </div>
      </div>
    )
}

export default EmailVerificationPage