import "./single.css";
import Sidebar from "../../components/sidebar/Sidebarname";
import SinglePost from "../../components/singlepost/Singlepostname";
//import SinglePost from "../../components/singlePost/SinglePost";

export default function single() {
  return (
    <div className="single">
      <SinglePost/>
      <Sidebar />
      
      </div>
  )
}
