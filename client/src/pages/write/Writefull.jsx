import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(false); // New state for loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    if(!title || !desc) {
      setLoading(false);
      return toast.error("Title and description are required!");
    }
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("https://insight-kmwu.onrender.com/api/upload", data);
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data);
      }
    }
    try {
      const res = await axios.post("https://insight-kmwu.onrender.com/api/posts", newPost);
      //window.location.replace("/post/" + res.data._id);
       // Show success notification
       toast.success("Post submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Reset form fields after submission
      setTitle("");
      setDesc("");
      setFile(null);
      setLoading(false); // Reset loading
      navigate('/');
    } catch (err) {
      // Show error notification
      setLoading(false); // Reset loading
      console.log(err);
      toast.error(err.response.data);
    }
  };
  return (
    <div className="write">
      <ToastContainer />
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            //accept=".png, .jpg, .jpeg"
            //value={file}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            value={title}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            value={desc}
            onChange={e=>setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit" disabled={loading}>
        {loading ? 'Publishing...' : 'Publish'}
        </button>
      </form>
    </div>
  );
}
