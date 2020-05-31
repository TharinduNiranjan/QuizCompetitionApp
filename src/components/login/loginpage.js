import React, { Fragment, Component } from 'react';
import {Helmet} from 'react-helmet'
import { Link } from 'react-router-dom';
class Login extends Component{
    render(){
    return(
        <Fragment>
            <Helmet><title>Login</title></Helmet>
            <div id="home">
                <section>
                    <h1>Login</h1>
                    <form>

                    </form>
            
            <div className='auth-container'>
                    <Link className='loginbutton' to="/quizcompetition/login">Login</Link>
            </div>
            </section>
            </div>
        </Fragment>
    )
    }
}
export default Login;