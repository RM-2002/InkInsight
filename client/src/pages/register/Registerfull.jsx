import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Registerfull() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false); // New state for loading
  const [error, setError] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true); // Set loading to true when starting the API call
  
    // Check if any field is empty
    if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
      setLoading(false); // Reset loading
      return toast.error("All fields are mandatory");
    }
  
    // Check password length
    if (password.length < 8) {
      setLoading(false); // Reset loading
      return toast.error("Password must be at least 8 characters long");
    }
  
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setLoading(false); // Reset loading
      return toast.error("Passwords do not match");
    }
  
    try {
      const res = await axios.post("https://insight-kmwu.onrender.com/api/auth/register", {
        firstName,
        lastName,
        username,
        email,
        password,
      });
      console.log(res.data)
      if(res.data) {
        setRegistrationSuccess(true);
        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setLoading(false); // Reset loading
       
        toast.success("Registration successful! You can now log in.");


        navigate('/login');
      }
    } catch (err) {
      setError(true);
      setLoading(false); // Reset loading
      console.log(err);
      toast.error(err.response.data);
    }
  };

  return (
    <div className="register">
      <ToastContainer />
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <div className="fieldGroup">
          <div className="nameFields">
            <label>First Name</label>
            <input className="registerInput" type="text" placeholder="Enter your first name..." value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="nameFields">
            <label>Last Name</label>
            <input className="registerInput" type="text" placeholder="Enter your last name..." value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
        </div>
        <div className="fieldGroup">
          <div className="usernameEmailFields">
            <label>Username</label>
            <input className="registerInput" type="text" placeholder="Enter your username..." value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="usernameEmailFields">
            <label>Email</label>
            <input className="registerInput" type="text" placeholder="Enter your email..." value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <div className="fieldGroup">
          <div className="passwordFields">
            <label>Password</label>
            <input className="registerInput" type="password" placeholder="Enter your password..." value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="passwordFields">
            <label>Confirm Password</label>
            <input className="registerInput" type="password" placeholder="Confirm your password..." value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
        </div>
        <button className="registerButton" type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p className="error-message">Please try again!</p>}
      </form>
      {registrationSuccess ? (
        <div>
          <button className="registerLoginButton">
            <Link className="link" to="/login">Go to Login</Link>
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
