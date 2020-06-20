import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import Timer from './Timer';
class Home extends Component{
    render(){
        return(
          <div>
              <Timer/>
          </div>
        )
    }
}
export default Home;