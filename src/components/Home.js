import React, { Fragment, Component } from 'react';

import { Link } from 'react-router-dom';

class Home extends Component{
    render(){
        return(
            <Fragment>
            
            <div id="home">
                <section>
                    <h1>Quiz App</h1>
            <div className="play-button-container">
                <ul>
                    <li ><Link className='playbutton' to="/play/instructions">Instructions</Link></li>
                </ul>
                
            </div>
            
            <div className='auth-container'>
                    <Link className='loginbutton' to="/quizcompetition/login">Login</Link>
            </div>
            </section>
            </div>
        </Fragment>
        )
    }
}
export default Home;