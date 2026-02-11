import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row row__column">
          <div className="footer__list">
            <Link to="/signin" className="footer__link">
              Sign In
            </Link>
            <span className="footer__link no-cursor">About</span>
            <Link to="/signup" className="footer__link">
              Sign Up
            </Link>
            <Link to="/musicplayer" className="footer__link" aria-label="Music Player">
              <FontAwesomeIcon icon="music" />
            </Link>
          </div>
          <div className="footer__copyright">Copyright © 2026 Soundflow Player</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
