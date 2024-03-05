import "./footer.css";
export default function Footer()  {
    return (
        <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">InkInsight</div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} InkInsight. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }