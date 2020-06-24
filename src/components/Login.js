import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../actions";
import { Form } from "react-bootstrap";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import ls from "local-storage";
import logo from "../assets/horizontalLogo.png";
import { MiniFooter } from "./Navbar";

class Login extends Component {
  constructor(props) {
    super(props);
    this.pswshow = false;
    this.state = { email: "", password: "", selectedOption: "english" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handleSubmit = () => {
    var str = this.state.email;
    var Senior = str.includes("sr");
    ls.set("language", this.state.selectedOption);
    if (this.state.selectedOption == null) {
      alert("please select language");
    } else if (this.state.selectedOption != "english" && Senior) {
      alert("University students can only use english language");
    } else if ((this.state.selectedOption == "english") & Senior) {
      const { dispatch } = this.props;
      const { email, password } = this.state;

      dispatch(loginUser(email, password));
    } else if ((this.state.selectedOption != null) & (Senior === false)) {
      const { dispatch } = this.props;
      const { email, password } = this.state;

      dispatch(loginUser(email, password));
    }
  };

  handleChange(e) {
    this.setState({ selectedOption: e.target.value });
    console.log(`Option selected:`, e.target.value);
    // ls.set("language", this.state.selectedOption);
  }

  showHidePw = () => {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
      this.pswshow = true;
    } else {
      x.type = "password";
      this.pswshow = false;
    }
  };

  render() {
    const { loginError, isAuthenticated } = this.props;
    if (isAuthenticated && ls.get("language") && ls.get("UserId")) {
      return <Redirect to="/quiz" />;
    } else {
      return (
        <Fragment>
          <div className="logincolumn">
            <div id="timerbox">
              <img alt="logo" className="img-fluid logoImage" src={logo}></img>
              {/* <Form> */}
              <Form.Control className="logininput" onChange={this.handleEmailChange} type="text" placeholder="Enter Username" name="uname" required />
              <div className="password-field">
                <Form.Control id="password" className="logininput" onChange={this.handlePasswordChange} type="password" placeholder="Enter Password" name="psw" required />
                <span className="password-icon" onClick={this.showHidePw}>
                  {this.pswshow ? <VisibilityOff /> : <Visibility />}
                </span>
              </div>
              {/* <input  type="checkbox" onChange={this.showHidePw}/>Show Password */}
              {/* 
                <input onChange={this.handlePasswordChange} type="password" placeholder="Enter Password" name="psw" required></input>
                <p></p> */}
              <Form.Control as="select" defaultValue="english" value={this.selectedOption} onChange={this.handleChange}>
                <option value="english">English</option>
                <option value="sinhala">සිංහල</option>
                <option value="tamil">தமிழ்</option>
              </Form.Control>
              <br></br>

              <button onClick={this.handleSubmit} type="submit">
                 Start Quiz
              </button>
              {loginError && <div className="errorText">Incorrect email or password.</div>}
              {/* </Form> */}
            </div>
            <MiniFooter></MiniFooter>
          </div>
        </Fragment>
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
