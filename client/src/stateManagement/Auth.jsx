import { createContext, useState } from "react";



const AuthContext = createContext();

const API_URL = "http://localhost:5000";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [passwordReset, setPasswordReset] = useState(false);


    //seerch components for flight card to be used as state
    //we dynamically call the trip type by using state
  const [tripType, setTripType] = useState("oneWay");
  const [departureCity, setDepartureCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [airports, setAirports] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeField, setActiveField] = useState("");
  const [loading, setLoading] = useState(false);


  //functions used for search components
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : airports.filter((airport) =>
         airport.location? airport.location.toLowerCase().includes(inputValue) : airport.name.toLowerCase().includes(inputValue) || airport.iata.toLowerCase().includes(inputValue)
        ).slice(0, 10);
  };
  

  //we handleInputChange
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (field === "departure") {
      setDepartureCity(value);
      setActiveField("departure");
    } else {
      setDestinationCity(value);
      setActiveField("destination");
    }
    setSuggestions(getSuggestions(value));
    if (value === "") {
      setShowModal(false);
    }else{
      setShowModal(true);
    }
    
  };



  const handleSuggestionClick = (suggestion) => {
    if (activeField === "departure") {
      setDepartureCity(`${suggestion.name} (${suggestion.iata})`);
    } else {
      setDestinationCity(`${suggestion.name} (${suggestion.iata})`);
    }
    setShowModal(false);
    setSuggestions([]);
  };





    const signup = async (name, email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            }); 

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
            const data = await response.json();
            setUser(data.user);
            setIsAuthenticated(true);
            setIsLoading(false);
            setMessage(data.message);
           

        } catch (error) {
            setError(error.message || "Error signing up");
            setIsLoading(false);
            throw error;
        }
            
        
    }

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
            const data = await response.json();
            setUser(data.user);
            setIsAuthenticated(data?.token);
            setIsLoading(false);
            setMessage(data.message);

        } catch (error) {
            setError(error.message || "Error logging in");
            setIsLoading(false);
            throw error;
        }
    }

    const verifyEmail = async (email, verificationToken) => {
        
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/auth/verify-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, verificationToken }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }   
            const data = await response.json();
            setUser(data.user);
            setIsAuthenticated(true);
            setIsLoading(false)
        } catch (error) {
            setError(error.message || "Error verifying email");
            setIsLoading(false);
            throw error;
            
        }
    }

    const forgotPassword = async (email) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
            
            const data = await response.json();
            setMessage(data.message);
            setIsLoading(false);
            setPasswordReset(true);
            
        } catch (error) {
            setError(error.message || "Error sending reset password email");
            setIsLoading(false);
            throw error;
            
        }
    }

    const resetPassword = async(token, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/auth/reset-password/${token}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
            
            const data = await response.json();
            setMessage(data.message);
            setIsLoading(false);
            
        } catch (error) {
            setError(error.message || "Error resetting password");
            setIsLoading(false);
            throw error;
            
        }
    }

    const logout = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // await fetch(`${API_URL}/auth/logout`, {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            // });
            setUser(null);
            setIsAuthenticated("");
            setIsLoading(false);
            
        } catch (error) {
            setError(error.message || "Error logging out");
            setIsLoading(false);
            throw error;
        }
    }


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, error, isLoading, message, passwordReset, login, setPasswordReset, signup, verifyEmail, forgotPassword, resetPassword, logout, tripType, setTripType, departureCity, setDepartureCity, destinationCity, setDestinationCity, airports, setAirports, suggestions, setSuggestions, departureDate, setDepartureDate, returnDate, setReturnDate, showModal, setShowModal, activeField, setActiveField, handleInputChange, handleSuggestionClick, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
        
}

export default AuthContext;