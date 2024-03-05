import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";
import { ToastContainer, toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css";
//import { Link } from "react-router-dom";
export default function Loginfull() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("https://insight-kmwu.onrender.com/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      toast.success("Login Successful");
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });


    } catch (err) {
      console.log(err.response.data);
      toast.error(err.response.data);
      dispatch({ type: "LOGIN_FAILURE" });
      
    }
  };

 
  return (
    <div className="login">
    <ToastContainer/>
    <span className="loginTitle">Login</span>
    <form className="loginForm" onSubmit={handleSubmit}>
      <label>Username</label>
      <input className="loginInput" type="text" placeholder="Enter your username..."  ref={ userRef}/>
      <label>Password</label>
      <input className="loginInput" type="password" placeholder="Enter your password..." ref={passwordRef}/>
      <button className="loginButton" type="Submit" disabled={isFetching}>Login</button>
    </form>
      <button className="loginRegisterButton">
      <Link className="link" to="/register">Register</Link></button>
  </div>
  )
}

