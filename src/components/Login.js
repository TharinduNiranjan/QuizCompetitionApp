import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../actions";
import Select from "react-select";
import ls from "local-storage";
import "./loginStyle.css";
import Img from "../assets/png.png";

const options = [
  { value: "sinhala", label: "sinhala" },
  { value: "english", label: "english" },
  { value: "tamil", label: "tamil" },
];
class Login extends Component {
  state = { email: "", password: "", selectedOption: {} };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { email, password } = this.state;

    dispatch(loginUser(email, password));
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });

    console.log(`Option selected:`, selectedOption);
  };

  render() {
    //set language object to local storage
    ls.set("language", this.state.selectedOption);
    console.log(ls.get("language"));
    //
    const { classes, loginError, isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/quizcompetition/quiz" />;
    } else {
      return (
        <div>
          <div className="row" id="navbar">
            <div>μMora Mathematics Competition 2020</div>
            <div id="logo">
              <img alt="logo" src={Img} id="logoimg" />
            </div>
          </div>
          <div className="row" id="loginbody">
            <div className="logincontainer col-lg-6 col-md-6">
              <div id="loginbox">
                <div id="signinheader">Sign In</div>
                <span>
                  <label for="uname">
                    <b> Username</b>
                  </label>
                </span>
                <input onChange={this.handleEmailChange} type="text" placeholder="Enter Username" name="uname" required></input>

                <label for="psw">
                  <b>Password</b>
                </label>
                <input onChange={this.handlePasswordChange} type="password" placeholder="Enter Password" name="psw" required></input>

                <label for="psw">
                  <b>Password</b>
                </label>
                <input onChange={this.handlePasswordChange} type="password" placeholder="Enter Password" name="psw" required></input>
                <p></p>
                <Select placeholder="select language" value={this.selectedOption} onChange={this.handleChange} options={options} />
                <br></br>

                <button onClick={this.handleSubmit} type="submit">
                  Login
                </button>
                {loginError && <div className={classes.errorText}>Incorrect email or password.</div>}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(Login);
