import React, { Fragment, Component } from "react";
import Login from "./Login";
import Timer from "./Timer";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <div id="home">
          <div className="row" id="navbar">
            <div>μMora Mathematics Competition 2020</div>
            <div id="logo">
              <img alt="logo" src="src\assets\png.png" id="logoimg" />
            </div>
          </div>
          <section>
            <h1>Quiz App</h1>
            <div className="play-button-container">
              <ul>
                <li>
                  <Link className="playbutton" to="/play/instructions">
                    Instructions
                  </Link>
                </li>
              </ul>
            </div>

            <div className="login-container">
              <Login></Login>
            </div>
            <div className="timer-container">
              <Timer></Timer>
            </div>
          </section>
        </div>
      </Fragment>
    );
  }
}
export default Home;
