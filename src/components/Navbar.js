import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <ul className="topnav">
        <li>
          <p>μMora Mathematics Competition 2020</p>
        </li>
        <li className="right">
          <Link to="/About">About</Link>
        </li>
        <li className="right">
          <Link to="/faq">F.A.Q</Link>
        </li>
        <li className="right">
          <Link to="/instructions">Instructions</Link>
        </li>
      </ul>
    );
  }
}

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <a href="https://www.facebook.com/UOM.ECLUB" target="_blank">
          μMora | EClub | University of Moratuwa
        </a>
      </div>
    );
  }
}
export { Navbar, Footer };
