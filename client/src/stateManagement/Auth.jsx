import { createContext, useState } from "react";



const AuthContext = createContext();

const API_URL = "http://localhost:5000";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [passwordReset, setPasswordReset] = useState(false);


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
            setIsAuthenticated(true);
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


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, error, isLoading, message, passwordReset, login, setPasswordReset, signup, verifyEmail, forgotPassword, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
        
}

export default AuthContext;