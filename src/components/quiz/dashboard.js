import React, { Component } from "react";
import { db } from "../../firebase/firebase";
import QuestionPage from "./questionPage";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/";
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
      timeup: true,
      early: true,
    };
    this.usercol = process.env.REACT_APP_USER_DB;
    this.questioncol = process.env.REACT_APP_SENIOR_DB;
    this.disconnectUsers = "";
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
    this.disconnectUsers = db
      .collection(this.usercol)
      .doc(this.state.userid)
      .onSnapshot(
        (snapshot) => {
          let allquestions = [];
          this.startTime = snapshot.data().startTime;
          this.questioncol = snapshot.data().collection;
          // this.deadline = snapshot.data().deadline;
          let qRef = snapshot.data().questions;
          let submit = snapshot.data().submit;
          // console.log(snapshot.data());
          Object.keys(qRef).forEach((snap) => {
            allquestions[snap - 1] = qRef[snap];
          });
          this.setState({ questions: allquestions, done: submit });
          this.changeQuestion(this.state.number);
        },
        (error) => {
          console.log(error);
        }
      );
    this.deadline = ls.get('logTime')
    this.updateTimer = setInterval(this.timer, 1000);
    this.waitingTime = setInterval(this.waitingTimer, 1000);
  }
  componentWillUnmount() {
    this.disconnectUsers();
    clearInterval(this.updateTimer);
    clearInterval(this.waitingTime);
  }
  // Other CRUD Operations

  // switch between questions
  changeQuestion(n) {
    let newq = this.state.questions[n];
    if (!newq) {
      return;
    }
    this.setState({ question: newq, number: n });
    // console.log(n, newq, this.state);
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
  handleLogout = () => {
    const { dispatch } = this.props;
    db.collection(this.usercol).doc(this.state.userid).update({ submit: true });
    dispatch(logoutUser());
  };
  unSubmit = () => {
    db.collection(this.usercol).doc(this.state.userid).update({ submit: false });
    let dt = new Date();
    dt.setHours(dt.getHours() + 1);
    this.deadline = dt.getTime();
    this.setState({ done: false });
  };
  waitingTimer() {
    let deadline = new Date(this.startTime).getTime();
    let display = "a litte time...";
    let now = new Date().getTime();
    if (deadline > now) {
      this.setState({ timeup: true, early: true });
    }
    // console.log(deadline, this.deadline);
    let t = deadline - now;
    if (deadline <= now) {
      this.setState({ timeup: false, early: false, submit: false });
      // console.log(this.state);
      clearInterval(this.waitingTime);
      // logout and submit
    }
    if (t) {
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
    let now = new Date().getTime();
    let deadline = this.deadline;
    // let deadline = new Date(this.deadline).getTime();
    let t = deadline - now;
    if (deadline <= now) {
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
            <button onClick={this.unSubmit}>Do again</button>
            <p>This button will not be present on competition day</p>
          </div>
        </Row>
      );
    }
    if (this.state.timeup) {
      // console.log(this.state);
      return (
        <Row className="warning">
          {this.state.early ? (
            <div className="submit-warning">
              <h1>Competition starts in {this.state.wait}</h1>
              Please wait for the competion to start
            </div>
          ) : (
            <div className="submit-warning">
              <h1>Time's Up</h1> Your answers have been saved please logout
            </div>
          )}
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
                    <div
                      key={key}
                      onClick={() => this.changeQuestion(key)}
                      className={`q ${this.state.number === key ? "bDefault" : !question.flag ? (question.selected == "" ? "bRed" : "bGreen") : "bYellow"} `}
                    >
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
              <button className="submit" onClick={this.handleLogout}>
                Submit and Leave
              </button>
            </Row>
          ) : (
            <QuestionPage
              question={this.state.question.id}
              user={this.state.userid}
              usercol={this.usercol}
              questioncol={this.questioncol}
              number={this.state.number}
              changeQuestion={this.changeQuestion}
              submitAll={this.submitAll}
              lang={this.state.lang}
              length={this.state.questions.length}
            ></QuestionPage>
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
