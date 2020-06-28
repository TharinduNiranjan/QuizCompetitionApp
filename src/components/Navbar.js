import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/";
import { connect } from "react-redux";
import NavLogo from "../assets/navBrand.png";
import { analytics } from "../firebase/firebase";
class Navbar extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    analytics.logEvent("force_logout");
    dispatch(logoutUser());
  };
  render() {
    const { isAuthenticated } = this.props;
    return (
      <ul className="topnav">
        <li className="text-center">
          <Link to="/">
            <img alt="umoraLogo" className="navimage" src={NavLogo}></img>
          </Link>
        </li>
        <div className="linksbar">
          {isAuthenticated ? (
            <li className="right">
              <Link to="/login" onClick={this.handleLogout}>
                Logout
              </Link>
            </li>
          ) : (
            <li className="right">
              <Link to="/login">Login</Link>
            </li>
          )}
          <li className="right">
            <Link to="/quiz">Quiz</Link>
          </li>
          <li className="right">
            <Link to="/about">About</Link>
          </li>
          <li className="right">
            <Link to="/faq">FAQ</Link>
          </li>
          <li className="right">
            <Link to="/instructions">Instructions</Link>
          </li>
        </div>
      </ul>
    );
  }
}

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <a href="https://www.facebook.com/UOM.ECLUB" target="_blank" rel="noopener noreferrer">
          μMora | EClub | University of Moratuwa
        </a>
      </div>
    );
  }
}

class MiniFooter extends Component {
  render() {
    return (
      <div className="minifooter">
        <a href="https://www.facebook.com/UOM.ECLUB" target="_blank" rel="noopener noreferrer">
          μMora | EClub | University of Moratuwa
        </a>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}
export default connect(mapStateToProps)(Navbar);
export { Footer, MiniFooter };
