import "./home.css";
import Header from "../../components/header/Headername";
import Posts from "../../components/posts/Postsname";
import Sidebar from "../../components/sidebar/Sidebarname";
import Footer from "../../components/footer/Footer";
//import { useEffect, useState } from "react";
//import axios from "axios";
//import { useLocation } from "react-router";


export default function Homefull({ searchQuery }) {

 /* const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url = "https://insight-kmwu.onrender.com/api/posts";
        if (searchQuery.trim() !== '') {
          url += `?user=${searchQuery}`;
        }
        const res = await axios.get(url);
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [searchQuery]);*/

  return (
    <>
       <Header/>
    <div className="home">
       
       <Posts searchQuery={searchQuery}/>
       <Sidebar/>
    </div>
     <Footer/>


    </>
  )
}
