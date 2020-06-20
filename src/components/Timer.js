import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import './timer.css'
import Img from '../assets/png.png'




class Timer extends Component{

    constructor(props){
        super(props)
        this.state={
            count:"Loading..."
        }
    }
    
      
    componentDidMount(){
        this.myInterval= setInterval(() => {
            
            var deadline = new Date("june 28, 2020 15:54:25").getTime();
            var now = new Date().getTime();
            var t = deadline - now;

            var days = Math.floor(t / (1000 * 60 * 60 * 24)); 
            var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
            var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
            var seconds = Math.floor((t % (1000 * 60)) / 1000);

            var display=days + " D : "  + hours + "h : " + minutes + " m : " + seconds + " s "
            if (t < 0) { 
                display="Competition has started"
                 
            } 

            this.setState(prevState=>({
                count:display
            }))
        },1000)
    }
   
    render() {
        
        const {count}= this.state
        return (
            <div>
                <ul class="topnav">
                <li><p>μMora Mathematics Competition 2020</p></li>
                <li class="right"><Link to="/About">About</Link></li>
                <li class="right"><Link to="/faq">F.A.Q</Link></li>
                <li class="right"><Link to="/instructions">Instructions</Link></li>
                </ul>
                <div class="tflex-container">
            <div class="tcolumn" id="logoblock">
                <img src={Img} id="logoimg"/>
            </div>

            <div class="timercolumn">
                <div id="timerbox">
                    <p id="caption">Competition begins in</p>
        <p id='demo'>{count}</p>
        <button class='t'><a href="/login">Test Round</a></button>
                </div>
            </div>
            <div class="footer">
        <a href="https://www.facebook.com/UOM.ECLUB" target="_blank">μMora | EClub | University of Moratuwa</a>
    </div>
        </div>

                
                
                
            </div>
        )
    }

    
}
export default Timer