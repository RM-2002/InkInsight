import "./header.css";

export default function header() {
  return (
    <div className="header">
         <div className="headerTitles">
         <span className="headerTitleSm">Discover stories that spark imagination.</span>
        <span className="headerTitleLg mrgnLft"><i>InkInsight</i></span>
         </div>
         <img
        className="headerImg"
        src="https://images.pexels.com/photos/459465/pexels-photo-459465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
      />
    </div>
  )
}
