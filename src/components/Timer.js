import React, { Component, Fragment } from "react";
import { MiniFooter } from "./Navbar";
import { srvTime } from "./servertime";
import ls from "local-storage";
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: "Loading...",
    };
  }
  componentDidMount() {
    // let offset = new Date() - new Date(srvTime());
    let offset;
    if (!ls.get("offset")) {
      let serverTime = new Date(srvTime());
      offset = new Date(new Date().getTime() - serverTime.getTime());
      // console.log(offset, serverTime, "serverTime");
      ls.set("offset", offset);
    } else {
      offset = new Date(ls.get("offset"));
    }

    this.myInterval = setInterval(() => {
      var deadline = new Date("june 28, 2020 13:00:00 GMT+0530").getTime();
      var now = new Date() - offset;
      var t = deadline - now;

      var days = ("0" + Math.floor(t / (1000 * 60 * 60 * 24))).slice(-2);
      var hours = ("0" + Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2);
      var minutes = ("0" + Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))).slice(-2);
      var seconds = ("0" + Math.floor((t % (1000 * 60)) / 1000)).slice(-2);

      var display = days + " : " + hours + " : " + minutes + "  : " + seconds;
      if (t < 0) {
        display = "Competition has started";
      }

      this.setState((prevState) => ({
        count: display,
      }));
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.myInterval);
  }
  render() {
    const { count } = this.state;
    return (
      <Fragment>
        <div className="timercolumn">
          <div id="timerbox">
            <p id="caption">μMora Mathematics Competition Final Round</p>
            {/* <h1 className="heartbeat">Starts  Released</h1> */}
            <p>August 9th</p>
            {/* <p id="demo">{count}</p>
            <p> Days : Hours : Minutes : Seconds </p> */}
            <br></br>
            <a className="link" href="/quiz">
              Login
            </a>
          </div>
          <MiniFooter></MiniFooter>
        </div>
      </Fragment>
    );
  }
}
export default Timer;
