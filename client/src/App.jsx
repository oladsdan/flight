import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Dashboard/Dashboard";
import ForgetPassword from "./pages/ForgetPassword";
import ResetLink from "./pages/ResetLink";
import EmailVerificationPage from "./pages/EmailVerificationPage";
// import Logout from "./components/Logout";
// import Banner from "./components/Banner";
import AuthContext from "./stateManagement/Auth";






// protected routes that require authentication

const ProtectedRoute = ({ children }) => {

  const {isAuthenticated, user} = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified){
    return <Navigate to="/email-verification" replace />;
  }

  return children;


}

//redirect authenticated users and verified users to homepage

const RedirectAuthenticatedUser = ({ children }) => {

  const {isAuthenticated, user} = useContext(AuthContext);

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;

}



function App() {
  
  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer />
        {/* <Banner /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetpassword" element={
            <RedirectAuthenticatedUser>
              <ForgetPassword />
            </RedirectAuthenticatedUser>

          } />
          <Route path="/reset-password/:token" element={
              <ResetLink />
            
            } />
          {/* <Route path="/logout" element={<Logout />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/email-verification" element={<EmailVerificationPage />} />


          {/* we catch all routes */}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
