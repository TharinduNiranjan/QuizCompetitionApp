import React, { Component } from "react";
import { db, analytics } from "../../firebase/firebase";
import QuestionPage from "./questionPage";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/";
import { srvTime } from "../servertime";
import ls from "local-storage";
import { Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
// const schema = {
//   name : "",
// startTime:"",
// deadline:"",
//   questions : {1:{
//     id:"",
//     selected:[],
//     flag: false
//   },
// }
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: ls.get("UserId"), //auth().currentUser.uid, //
      lang: "english", //default
      questions: [],
      question: "",
      number: 0,
      selected: "",
      timeup: false,
      early: true,
      questioncol: "testing",
      startTime: 0,
      deadline: 0,
    };
    this.usercol = process.env.REACT_APP_USER_DB;
    this.questioncol = process.env.REACT_APP_JUNIOR_DB;
    // this.usercol = "competition";
    this.offset = 0;
    // this.startTime = 0;
    // this.deadline = 0;
    this.disconnectUsers = "";
    // this.updateTime = this.updateTime.bind(this);
    this.updateTimer = ""; // timer variable to clear on exit
    this.timer = this.timer.bind(this);
    this.waitingTimer = this.waitingTimer.bind(this);
    this.addUser = this.addUser.bind(this); // testing fucntion to create a fake user
    this.changeQuestion = this.changeQuestion.bind(this); // change question prop of question page (passes question id)
    this.submitAll = this.submitAll.bind(this); // displays submit screen by toggling state parameter submit
  }

  // get all questions from Firestore collection users on loading dashboard and map to array
  componentDidMount() {
    // this.addUser();
    if (ls.get("UserId")) {
      this.setState({ userid: ls.get("UserId") });
    } else {
      return <Redirect to="/login" />;
    }
    if (ls.get("language")) {
      this.setState({ lang: ls.get("language") });
    }
    // this.updateTime();

    if (!ls.get("offset")) {
      let serverTime = new Date(srvTime());
      this.offset = new Date(new Date().getTime() - serverTime.getTime());
      // console.log(this.offset, serverTime, "serverTime");
      ls.set("offset", this.offset);
    } else {
      this.offset = new Date(ls.get("offset"));
    }

    // this.deadline = new Date(ls.get("logTime")).toString();
    this.disconnectUsers = db
      .collection(this.usercol)
      .doc(this.state.userid)
      .onSnapshot(
        (snapshot) => {
          let allquestions = [];
          let datafromUser = snapshot.data();
          // console.log(snapshot.data(), snapshot.exists, this.state);
          let startTime = datafromUser.startTime;
          let questioncol = datafromUser.collection;
          let deadline = datafromUser.deadline;
          let qRef = datafromUser.questions;
          let submit = datafromUser.submit;
          // console.log(snapshot.data());
          // console.log("DBTIme", this.startTime, this.deadline);
          Object.keys(qRef).forEach((snap) => {
            allquestions[snap - 1] = qRef[snap];
          });
          this.setState({ questions: allquestions, done: submit, questioncol: questioncol, startTime: startTime, deadline: deadline });
          this.changeQuestion(this.state.number);
          // if (new Date(deadline) - new Date() + this.offset < 0) {
          //   //console.log("EndQuiz", deadline);
          //   this.startTime = "june 25, 2030 14:00:00";
          //   this.setState({ submit: true, early: false, timeup: true, questions: [] });
          // }
        },
        (error) => {
          console.log(error);
        }
      );

    //console.log(this.deadline);
    // console.log(this.offset,this.state.deadline,this.state.startTime)
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
  // Other CRUD Operations
  // updateTime() {
  //   var self = this;
  //   fetch(window.location.href.toString()).then((res) => {
  //     res.headers.forEach(function (val, key) {
  //       if (key == "date") {
  //         console.log(val);
  //         let serverTime = new Date(val);
  //         self.offset = new Date(new Date().getTime() - serverTime.getTime());
  //         console.log(this.offset, serverTime, "serverTime");
  //       }
  //     });
  //   });
  // }
  // switch between questions
  changeQuestion(n) {
    let newq = this.state.questions[n];
    if (!newq) {
      return;
    }
    this.setState({ question: newq, number: n });
  }
  // submit answers and log out
  submitAll() {
    this.setState({ submit: true });
  }
  revise() {
    this.setState({ submit: false });
    this.changeQuestion(this.state.number);
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
    // db.collection(this.usercol)
    //   .doc(this.state.userid)
    //   .update({ submit: true })
    //   .then(
    //     (val) => {

    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
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
      this.setState({ submit: true, timeup: true, questions: [] });
      this.disconnectUsers();
      // logout and submit
    }
    // let days = Math.floor(t / (1000 * 60 * 60 * 24));

    let hours = ("0" + Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2);
    let minutes = ("0" + Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))).slice(-2);
    let seconds = ("0" + Math.floor((t % (1000 * 60)) / 1000)).slice(-2);
    let display = (
      <div className="xtimervalue">
        {hours}:{minutes}
        <span className="small-text">:{seconds}</span>
      </div>
    );
    this.setState({ time: display });
  }
  //testing functions - USER Schema
  addUser() {
    db.collection(this.usercol)
      // .add({
      // or use the following to edit an exisitng document
      .doc("DBU2REMMaWMmRzmibcgd7jObLr13")
      .set({
        questions: {
          1: {
            id: "YRG15I2qurO8SFfEArFg",
            selected: [],
            flag: false,
          },
          2: {
            id: "DUPGYOlRJI0S8nTx7w4I",
            selected: [],
            flag: false,
          },
          3: {
            id: "q2Bp5lSNfLhAhFwNqVKT",
            selected: [],
            flag: false,
          },
          4: {
            id: "d0AOJdqACcmMpoXYNGtO",
            selected: [],
            flag: false,
          },
          5: {
            id: "quC2P33onlG1dOXyQfPW",
            selected: [],
            flag: false,
          },
        },
        collection: "questions",
        deadline: "june 20, 2020 15:54:25",
        startTime: "june 20, 2020 15:54:25",
        submit: "false",
      })
      .then((id) => {
        this.setState({ userid: id });
      });
  }
  render() {
    const { isLoggingOut, logoutError } = this.props;
    if (this.state.done) {
      return (
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
    if (this.state.early) {
      return (
        <Row className="warning">
          <div className="submit-warning">
            <h1>Competition starts in {this.state.wait}</h1>
            Please wait for the competion to start
          </div>{" "}
        </Row>
      );
    }
    if (this.state.timeup) {
      // console.log(this.state);
      return (
        <Row className="warning">
          <div className="submit-warning">
            <h1>Time's Up</h1> Your answers have been saved please logout
          </div>
          <button className="submit" onClick={this.handleLogout}>
            Logout
          </button>
        </Row>
      );
    } else {
      return (
        <Container>
          <Row className="timerprogress">
            <Col sm="2" className="xtimervalue">
              {this.state.time}
            </Col>

            <Col sm="10">
              <Row className="xbar">
                {this.state.questions.map((question, key) => {
                  return (
                    // create the question base
                    <div key={key} onClick={() => this.changeQuestion(key)} className={`q ${this.state.number === key ? "bDefault" : !question.flag ? (question.selected == "" ? "bRed" : "bGreen") : "bYellow"} `}>
                      {key + 1}
                    </div>
                  );
                })}
              </Row>
            </Col>
          </Row>
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
            <QuestionPage question={this.state.question.id} user={this.state.userid} usercol={this.usercol} questioncol={this.state.questioncol} number={this.state.number} changeQuestion={this.changeQuestion} submitAll={this.submitAll} lang={this.state.lang} length={this.state.questions.length}></QuestionPage>
          )}
          {/* <button onClick={() => this.addUser()}>Add User</button> 
        <button onClick={this.handleLogout}>Logout</button>*/}
          {isLoggingOut && <p>Logging Out....</p>}
          {logoutError && <p>Error logging out</p>}
        </Container>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
  };
}
export default connect(mapStateToProps)(Dashboard);
