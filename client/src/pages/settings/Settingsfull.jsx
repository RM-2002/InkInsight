import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebarname";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName); 
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading
  console.log(user);
  console.log(firstName, lastName, username, email, password);

 
  const PF = "https://insight-kmwu.onrender.com/images/"

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]); // Run this effect whenever 'user' changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(firstName, lastName, username, email, password);
    setLoading(true); // Set loading to true when starting the API call

    if (!firstName || !lastName || !username || !email || !password) {
      setLoading(false); // Reset loading
      return toast.error("All fields are mandatory");
      
    }
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
      firstName,
      lastName  
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("https://insight-kmwu.onrender.com/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("https://insight-kmwu.onrender.com/api/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setLoading(false); // Reset loading
      toast.success("Profile updated successfully");
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
      setLoading(false); // Reset loading
      toast.error("Failed to update profile.Please try again!");
    }
  };


  return (
    <div className="settings">
         <ToastContainer /> {/* Add ToastContainer */}
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
        <label>First Name</label>
          <input
            type="text"
            placeholder="Enter your first name..."
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

        <label>Last Name</label>
          <input
            type="text"
            placeholder="Enter your last name..."
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
          </button>
          
        </form>
      </div>
      <Sidebar />
    </div>
  );
}