import React, { Component } from "react";
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: "Loading...",
    };
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <h1>μMora</h1>
        <h2>Coming soon...</h2>
        <h1>{count}</h1>
      </div>
    );
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      var deadline = new Date("june 20, 2020 15:54:25").getTime();
      var now = new Date().getTime();
      var t = deadline - now;

      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((t % (1000 * 60)) / 1000);

      var display = days + " Days : " + hours + " Hours : " + minutes + " Minutes : " + seconds + " Seconds ";
      if (t < 0) {
        display = "Competition has started";
      }

      this.setState((prevState) => ({
        count: display,
      }));
    }, 1000);
  }
}
export default Timer;
