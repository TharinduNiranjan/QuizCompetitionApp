import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <ul className="topnav">
        <li className="text-center">
          <Link to="/">μMora 2020</Link>
        </li>
        <div>
          <li className="right">
            <Link to="/about">About</Link>
          </li>
          <li className="right">
            <Link to="/faq">F.A.Q</Link>
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
export { Navbar, Footer, MiniFooter };
