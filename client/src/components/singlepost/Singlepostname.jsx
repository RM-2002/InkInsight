import "./singlepost.css";
import { useLocation } from "react-router";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function Singlepostname() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "https://insight-kmwu.onrender.com/images/";
   const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [loading, setLoading] = useState(true); // State to track loading status
  const navigate = useNavigate();


  useEffect(() => {

    setLoading(true); // Set loading to true when starting to fetch data
    const getPost = async () => {

      try{ const res = await axios.get("https://insight-kmwu.onrender.com/api/posts/" + path);
      //console.log(res);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);}
      catch(err){
        console.error("Error fetching posts:", err);
      }finally {
        setLoading(false); // Set loading to false once data is fetched (whether successful or not)
    }

    };
    getPost();
  }, [path]);


  const handleDelete = async () => {
    try {
      await axios.delete(`https://insight-kmwu.onrender.com/api/posts/${post._id}`, {
        data: { username: user.username },
      });
      navigate('/');
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong.Please try again!");
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    if ( !title || !desc) {
      setLoading(false);
     return toast.error("Please enter a title and description");      
    }

    try {
      await axios.put(`https://insight-kmwu.onrender.com/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
      setLoading(false);
      toast.success("Post has been updated");
      navigate('/');
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Something went wrong.Please try again!");
    }
  };



  return (
    <div className="singlePost">
      <ToastContainer/>
       {loading ? ( // Display loader if loading is true
        <div className="loader-container">
          <div className="loader"></div>
          <p className="loader-text">Loading...</p>
        </div>
      ) : 
      (
        <>
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit" title="Edit post"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt" title="Delete post"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
        <Link to={"/"} className="link" title="Go to home page">
          <span className="singlePostAuthor">
            Author:           
              <b> {post.username}</b>            
          </span>
          </Link>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate} disabled={loading} >
          {loading ? "Updating..." : "Update"}
          </button>
        )}
      </div>
      </>
      )}

    </div>
   
  );
}
