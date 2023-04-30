import './Footer.css';
import mainLogo from "../LibraryImages/summit-logo-transparent.png"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="gularte">GULART<span>E</span></div>
        <section className="code-conduct">
          <p>
          © 2023 Gularte Corporation. All rights reserved. All trademarks are property of their respective owners in the US and other countries.
            VAT included in all prices where applicable.
          </p>
        </section>
        <div className="footer-logo">
        <img  className="main-logo" src={mainLogo} />
          <h1>SUMMIT</h1>
        </div>
      </div>
      <div className="footer-info">
        <span>
          <a>React</a> |
          <a>Redux</a> |
          <a>Flask</a> |
          <a>PostgreSQL</a>
        </span>
      </div>
    </footer>
  )
};

export default Footer;