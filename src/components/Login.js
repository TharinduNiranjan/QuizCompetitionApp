import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../actions";
import { withStyles } from "@material-ui/styles";
import image from '../assets/cover.jpg'
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Select from 'react-select';
import ls from 'local-storage';
import './loginStyle.css';
import Img from '../assets/png.png';
const styles = () => ({
  '@global': {
    body: {
      backgroundColor: '#ffff',
    },
  },
  paper: {
    marginTop: 100,
    display: "flex",
    padding: 20,
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#f50057"
  },
  form: {
    marginTop: 1
  },
  errorText: {
    color: "#f50057",
    marginBottom: 5,
    textAlign: "center"
  }
});

const options = [
  { value: 'sinhala', label: 'sinhala' },
  { value: 'english', label: 'english' },
  { value: 'tamil', label: 'tamil' },
];
class Login extends Component {
  state = { email: "", password: "" ,selectedOption: {}};

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

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    
    
    console.log(`Option selected:`, selectedOption);
    
  };

  render() {
    //set language object to local storage
    ls.set('language',(this.state.selectedOption))
    console.log(ls.get('language'))
    //
    const { classes, loginError, isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/quizcompetition/quiz" />;
    } else {
      return (
      
       <div>
    <div class="row" id="navbar">
        <div >μMora Mathematics Competition 2020</div>
        <div id="logo">
            <img src={Img} id="logoimg" />
        </div>
    </div>
        <div class="row" id="loginbody">
            <div class="container col-lg-6 col-md-6">
                <div  id="loginbox">
                    <div id="signinheader">Sign In</div>
                    <span><label for="uname"><b>Username</b></label></span>
                    <input onChange={this.handleEmailChange} type="text" placeholder="Enter Username" name="uname" required></input>

                    <label for="psw"><b>Password</b></label>
                    <input onChange={this.handlePasswordChange} type="password" placeholder="Enter Password" name="psw" required></input>
                   <p></p>
                     <Select
                        placeholder='select language'
                          value={this.selectedOption}
                          onChange={this.handleChange}
                          options={options}
                        /><br></br>

                    <button onClick={this.handleSubmit} type="submit">Login</button>
                    {loginError && (
                  <Typography component="p" className={classes.errorText}>
                    Incorrect email or password.
                  </Typography>
                )}
                
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
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Login));
