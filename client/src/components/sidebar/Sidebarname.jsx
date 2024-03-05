import "./sidebar.css";
import pic from "../../assets/sidebar2.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebarname() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("https://insight-kmwu.onrender.com/api/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
        <div className="sidebarItem">
        <span className="sidebarTitle" style={{marginLeft:"8px",wordSpacing:"5px"}}>DISCOVER YOUR VOICE</span>
        <img
          src={pic}
          alt="Blog Logo"
        />
         <p className="sidebarDesc">
            Welcome to the realm of boundless creativity and expression! Our blog application is not just a platform; it's a sanctuary where your thoughts take flight and your words resonate. 
        </p>

        <Link to="/about" className="link aboutLink">
          Learn More About Us
        </Link>
       
        </div>

        <div className="sidebarItem">
        <span className="sidebarTitlee">EXPLORE DIVERSE REALMS</span>
        <ul className="sidebarList">
        {cats.map((c) => (
            <div  className="link">
            <li key={c._id} className="sidebarListItem">{c.name}</li>
            </div>
          ))}
         
        </ul>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">CONNECT & INSPIRE</span>
        <div className="sidebarSocial">
        <a href="https://www.facebook.com/profile.php?id=61556676692956&is_tour_completed=true" target="_blank" rel="noopener noreferrer">
        <i className="sidebarIcon fab fa-facebook-square" style={{color:"#316FF6"}}></i>
        </a>
        <a href="https://www.instagram.com/inkinsight12/" target="_blank" rel="noopener noreferrer">
        <i className="sidebarIcon fab fa-instagram-square" style={{color:"#E4405F"}}></i>
        </a>
        <a href="https://in.pinterest.com/inkinsight12/_created/" target="_blank" rel="noopener noreferrer">
        <i className="sidebarIcon fab fa-pinterest-square" style={{color:"#c8232c"}}></i>
        </a>
        <a href="https://twitter.com/inkinsight12" target="_blank" rel="noopener noreferrer">
        <i className="sidebarIcon fab fa-twitter-square" style={{color:"#1DA1F2"}}></i>
        </a>
        </div>
      </div>
    </div>
  )
}


