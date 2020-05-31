import React, { Fragment } from 'react';
import {Helmet} from 'react-helmet'
import { Link } from 'react-router-dom';

const Home=()=>
    (<Fragment>
            <Helmet><title>Quiz App</title></Helmet>
            <div id="home">
                <section>
                    <h1>Quiz App</h1>
            <div className="play-button-container">
                <ul>
                    <li ><Link className='playbutton' to="/play/instructions">Play</Link></li>
                </ul>
                
            </div>
            
            <div className='auth-container'>
                    <Link className='loginbutton' to="/quizcompetition/login">Login</Link>
            </div>
            </section>
            </div>
        </Fragment>
        
    );

export default Home;