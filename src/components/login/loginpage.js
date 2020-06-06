import React, { Fragment, Component } from 'react';
import {Helmet} from 'react-helmet'

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../login/auth";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

//import {TextField} from '@material-ui/core';
class Login extends Component{
    constructor(props){
        super(props);
        this.state={email:'',password:''}
    }
    handleChange(e){
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleSubmit=(e)=>{
        const { dispatch } = this.props;
        const { email, password } = this.state;
        dispatch(loginUser(email, password));
    }
    render(){
        const { loginError, isAuthenticated } = this.props;
        if (isAuthenticated) {
            return <Redirect to="/quizcompetition/quiz" />;
        }else{
        return(
        <div>
        <Fragment>
            <Helmet><title>Login</title></Helmet>
            <div id="login">
                <section>
                    <h1>Login</h1>
                    <div className="login-container">
                    <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={e=>this.handleChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={e=>this.handleChange(e)}
            />
            {loginError && (
              <Typography >
                Incorrect email or password.
              </Typography>
            )}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Sign In
            </Button>
                    </div>
            </section>
            </div>
        </Fragment>
        
        </div>
    )
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
export default (connect(mapStateToProps)(Login));