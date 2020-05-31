import React, { Fragment, Component } from 'react';
import {Helmet} from 'react-helmet'

//import {TextField} from '@material-ui/core';
class Login extends Component{
    constructor(props){
        super(props);
        this.state={username:'',password:''}
    }
    render(){
    return(
        <Fragment>
            <Helmet><title>Login</title></Helmet>
            <div id="login">
                <section>
                    <h1>Login</h1>
                    <div className="login-container">
                    <form >
                    <input type="text" name="u" placeholder="Username" required="required" />
                    <input type="password" name="p" placeholder="Password" required="required" />

                    <button type="submit" class="btn btn-primary btn-block btn-large">Let me in.</button>
                    </form>
                    </div>
            </section>
            </div>
        </Fragment>
    )
    }
}
export default Login;