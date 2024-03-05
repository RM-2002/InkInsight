//import { Link } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect  } from "react";

import "./topbar.css";
import { useContext } from "react";
import pic from "../../assets/settings.png";
import { Context } from "../../context/Context";

export default function Topbar({ setSearchQuery }) {

  const { user, dispatch } = useContext(Context);

  const [searchQuery, setSearchQueryLocally] = useState('');

  useEffect(() => {
    if (searchQuery === '') {
      // Automatically trigger API call when search query is empty
      handleSearch();
    }
  }, [searchQuery]);

  const handleSearch = async () => {
    setSearchQuery(searchQuery);
    localStorage.setItem('searchQuery', searchQuery);
  };


  const PF = "https://insight-kmwu.onrender.com/images/"
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <a href="https://www.facebook.com/profile.php?id=61556676692956&is_tour_completed=true" target="_blank" rel="noopener noreferrer">
        <i className="topIcon fab fa-facebook-square" style={{color:"#316FF6"}}></i>
        </a>
        <a href="https://www.instagram.com/inkinsight12/" target="_blank" rel="noopener noreferrer">
        <i className="topIcon fab fa-instagram-square" style={{color:"#E4405F"}}></i>
        </a>
        <a href="https://in.pinterest.com/inkinsight12/_created/" target="_blank" rel="noopener noreferrer">
        <i className="topIcon fab fa-pinterest-square" style={{color:"#c8232c"}}></i>
        </a>
        <a href="https://twitter.com/inkinsight12" target="_blank" rel="noopener noreferrer">
        <i className="topIcon fab fa-twitter-square" style={{color:"#1DA1F2"}}></i>
        </a>
                
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem topBarItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem topBarItem">
            <Link className="link" to="/about">ABOUT</Link></li>

          <li className="topListItem topBarItem">
            {" "}
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem topBarItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
       
      <input
        type="text"
        placeholder="Search by user..."
        value={searchQuery}
        onChange={(e) => setSearchQueryLocally(e.target.value)}
      />
        <i className="topSearchIcon fas fa-search" onClick={handleSearch}></i>
        
        
        {user ? (
          <Link to="/settings">
             <img className="topImg" src={user.profilePic ? PF + user.profilePic : pic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem authenticationBtn">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem authenticationBtn">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}

        
      </div>
    </div>
  );
}
