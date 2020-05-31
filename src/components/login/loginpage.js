import React, { Fragment, Component } from 'react';
import {Helmet} from 'react-helmet'

//import {TextField} from '@material-ui/core';
class Login extends Component{
    constructor(props){
        super(props);
        this.state={username:'',password:''}
    }
    handleChange(e){
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        console.log(this.state)
    }
    render(){
    return(
        <div>
        <Fragment>
            <Helmet><title>Login</title></Helmet>
            <div id="login">
                <section>
                    <h1>Login</h1>
                    <div className="login-container">
                    <form  onSubmit={this.handleSubmit}>
                    <input type="text" id='username' name="u" placeholder="Username" required="required" onChange={(e)=>this.handleChange(e)} />
                    <input type="password" id='password' name="p" placeholder="Password" required="required" onChange={(e)=>this.handleChange(e)} />

                    <button type="submit" class="btn btn-primary btn-block btn-small">Let me in.</button>
                    </form>
                    </div>
            </section>
            </div>
        </Fragment>
        
        </div>
    )
    }
}
export default Login;