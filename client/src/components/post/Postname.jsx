import "./post.css";
import { Link } from "react-router-dom";

export default function post({ post }) {
  const PF = "https://insight-kmwu.onrender.com/images/";
  return (
    <div className="post">
      <Link to={`/post/${post._id}`} className="link">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      </Link>
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
         
          </Link>
          
       
        <hr />
        <span className="postAuthor">{post.username}</span>
        <span className="postDate">
          {" "}
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>

      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
