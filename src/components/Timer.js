import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import './timer.css'
class Timer extends Component{

    constructor(props){
        super(props)
        this.state={
            count:"Loading..."
        }
    }
    componentDidMount(){
        this.myInterval= setInterval(() => {
            
            var deadline = new Date("june 20, 2020 15:54:25").getTime();
            var now = new Date().getTime();
            var t = deadline - now;

            var days = Math.floor(t / (1000 * 60 * 60 * 24)); 
            var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
            var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
            var seconds = Math.floor((t % (1000 * 60)) / 1000);

            var display=days + " Days : "  + hours + " Hours : " + minutes + " Minutes : " + seconds + " Seconds "
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
                <li class="right"><Link to="/quizcompetition/About">About</Link></li>
                <li class="right"><Link to="/quizcompetition/faq">F.A.Q</Link></li>
                <li class="right"><Link to="/quizcompetition/instructions">Instructions</Link></li>
                </ul>
                
                <h1>{count}</h1>
                
                
                
            </div>
        )
    }

    
}
export default Timer