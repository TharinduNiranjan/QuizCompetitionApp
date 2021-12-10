import React, { Component, Fragment } from "react";
import ls from "local-storage";
import MultiFileUpload from "./multipleFileUpload";
import QuestionPaper from "./questions";
import Navbar, { Footer } from "../Navbar";
import { db, analytics } from "../../firebase/firebase";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/";
import { srvTime } from "../servertime";
import { Redirect } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./competition.css";
class Competition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "default",
      lang: "sinhala",
      url: "notfound",
      early: true,
      timeup: false,
      done: false,
    };

    // this.usercol = process.env.REACT_APP_USER_DB;
    this.usercol = "finalround";
    this.offset = 0;
    this.disconnectUsers = "";
    this.updateTimer = ""; // timer variable to clear on exit
    this.timer = this.timer.bind(this);
    this.waitingTimer = this.waitingTimer.bind(this);
    this.init = this.init.bind(this);
    this.submitAll = this.submitAll.bind(this); // displays submit screen by toggling state parameter submit
  }
  // get all questions from Firestore collection users on loading dashboard and map to array
  componentDidMount() {
    this.init();
    this.updateTimer = setInterval(this.timer, 1000);
    this.waitingTime = setInterval(this.waitingTimer, 1000);
  }
  componentWillUnmount() {
    if (this.disconnectUsers) {
      this.disconnectUsers();
    }
    clearInterval(this.updateTimer);
    clearInterval(this.waitingTime);
  }
  init() {
    if (ls.get("UserId")) {
      let userid = ls.get("UserId");
      // let folderName = auth.getInstance().getCurrentUser().getDisplayName();
      this.setState({ userid: userid });
      let lang = "english";
      if (ls.get("language")) {
        lang = ls.get("language");
      }
      this.disconnectUsers = db
        .collection(this.usercol)
        .doc(userid)
        .onSnapshot(
          (snapshot) => {
            // console.log(snapshot);
            let datafromUser = snapshot.data();
            let startTime = datafromUser.startTime;
            let deadline = datafromUser.deadline;
            let url = datafromUser.questions[lang]; //
            let submit = datafromUser.submit;
            this.setState({ done: submit, startTime: startTime, deadline: deadline, url: url });
            // console.log("updated");
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      return <Redirect to="/login" />;
    }

    if (!ls.get("offset")) {
      let serverTime = new Date(srvTime());
      this.offset = new Date(new Date().getTime() - serverTime.getTime());
      ls.set("offset", this.offset);
    } else {
      this.offset = new Date(ls.get("offset"));
    }
  }
  // submit answers and log out
  submitAll() {
    this.setState({ submit: true });
  }
  revise() {
    this.setState({ submit: false });
  }
  //logout user
  handleSubmit = () => {
    const { dispatch } = this.props;
    analytics.logEvent("submit");
    dispatch(logoutUser());
    db.collection(this.usercol)
      .doc(this.state.userid)
      .update({ submit: true })
      .then(
        (val) => {},
        (err) => {
          console.log(err);
        }
      );
  };
  handleLogout = () => {
    const { dispatch } = this.props;
    analytics.logEvent("submit");
    dispatch(logoutUser());
  };
  unSubmit = () => {
    db.collection(this.usercol).doc(this.state.userid).update({ submit: false });
    analytics.logEvent("redo_quiz");
    let dt = new Date();
    // dt.setHours(dt.getHours() + 1);
    // this.deadline = dt.getTime();
    // this.setState({ done: false, timeup: true, early: true });
  };
  waitingTimer() {
    // console.log(this.offset, "rrr");
    // let startTime = new Date(this.startTime);
    let display = "a litte time...";
    let now = new Date(new Date().getTime() - this.offset.getTime());
    // console.log(deadline, this.deadline);
    let t = new Date(this.state.startTime).getTime() - now.getTime();
    if (t <= 0) {
      // console.log("StartQuiz", this.startTime, now, t);
      this.setState({ early: false, submit: false });
      // console.log(this.state);
      clearInterval(this.waitingTime);
      // logout and submit
    }
    if (t > 0) {
      // let days = Math.floor(t / (1000 * 60 * 60 * 24));
      this.setState({ early: true });
      let hours = ("0" + Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2);
      let minutes = ("0" + Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))).slice(-2);
      let seconds = ("0" + Math.floor((t % (1000 * 60)) / 1000)).slice(-2);
      display = (
        <div className="inline-block">
          {hours}:{minutes}
          <span className="small-text">:{seconds}</span>
        </div>
      );
    }
    this.setState({ wait: display });
  }
  timer() {
    let now = new Date(new Date().getTime() - this.offset.getTime());
    let deadline = new Date(this.state.deadline);
    let t = new Date(deadline.getTime() - now.getTime()).getTime();
    // console.log("quiz", deadline, now, deadline - new Date());
    if (t <= 0) {
      // console.log("EndQuiz", deadline, now, t);
      this.setState({ timeup: true });
      this.disconnectUsers();
      // logout and submit
    }
    // let days = Math.floor(t / (1000 * 60 * 60 * 24));

    let hours = ("0" + Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2);
    let minutes = ("0" + Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))).slice(-2);
    let seconds = ("0" + Math.floor((t % (1000 * 60)) / 1000)).slice(-2);
    let display = (
      <div className="timervalue">
        {hours}:{minutes}
        <span className="small-text">:{seconds}</span>
      </div>
    );
    this.setState({ time: display });
  }
  render() {
    const { isLoggingOut, logoutError } = this.props;
    let content = <div></div>;
    // if submitted
    if (this.state.done) {
      content = (
        <Row className="warning">
          <div className="submit-warning">
            <h1>Your answers have been saved</h1>
            <p>Thank you for participating</p>
            <button className="submit" onClick={this.handleLogout}>
              Logout
            </button>
            {/* <p>This button will not be present on competition day</p> */}
          </div>
        </Row>
      );
    }
    // if deadline over, content = competition over page
    else if (this.state.timeup) {
      content = (
        <Row className="warning">
          <div className="submit-warning">
            <h1>Time's Up</h1> Your answers have been saved please logout
          </div>
          <button className="submit" onClick={this.handleLogout}>
            Logout
          </button>
        </Row>
      );
    }
    // if early content = waiting area page
    else if (this.state.early) {
      content = (
        <Row className="warning">
          <div className="submit-warning">
            <h1>Competition starts in {this.state.wait}</h1>
            Please wait for the competion to start
          </div>{" "}
        </Row>
      );
    }
    // else
    else {
      content = (
        <Fragment>
          {this.state.submit ? (
            <Row className="warning">
              <div className="submit-warning">
                <h1>Are you sure you want to submit?</h1> You can't change your answers once you submit
              </div>
              <button onClick={() => this.revise()}>Go back</button>
              <button className="submit" onClick={this.handleSubmit}>
                Submit and Leave
              </button>
            </Row>
          ) : (
            <Fragment>
              <h2>Final Round {/* <span className="float-right">{this.state.time}</span> */}</h2>
              <h3>1) View paper</h3>
              <p> Download the question paper from the link below and write your answers on a paper. Take clear photographs of your work and upload it.</p>
              <QuestionPaper url={this.state.url}></QuestionPaper>

              <h3 className="mt-5">2) Upload Answers</h3>
              <div className="timer">Time remaining to upload: {this.state.time}</div>
              <MultiFileUpload folderName={this.state.userid}></MultiFileUpload>
              <button className="submit ml-2" onClick={() => this.submitAll()}>
                Submit and Exit
              </button>
            </Fragment>
          )}
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Navbar></Navbar>
        {isLoggingOut && <p>Logging Out....</p>}
        {logoutError && <p>Error logging out</p>}
        <div className="container-fluid content">{content}</div>
        <Footer></Footer>
      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
  };
}
export default connect(mapStateToProps)(Competition);
