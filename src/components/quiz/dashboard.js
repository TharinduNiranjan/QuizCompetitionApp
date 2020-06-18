import React, { Component } from "react";
import { db } from "../../firebase/firebase";
import QuestionPage from "./questionPage";
import SubmitPage from "./submit";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/";
import ls from "local-storage";
// const schema = {
//   name : "",
//   email: "",
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
      userid: "68VkB97iNFQctYCwYZB9hZEaEVu1", //ls.get("UserId"), //auth().currentUser.uid, //
      lang: "sinhala",
      questions: [],
      question: "",
      number: 0,
      selected: "",
    };
    this.usercol = "users";
    this.questioncol = "questions";

    this.addUser = this.addUser.bind(this); // testing fucntion to create a fake user
    this.changeQuestion = this.changeQuestion.bind(this); // change question prop of question page (passes question id)
    this.submitAll = this.submitAll.bind(this); // displays submit screen by toggling state parameter submit
  }

  // get all questions from Firestore collection users on loading dashboard and map to array
  componentDidMount() {
    db.collection(this.usercol)
      .doc(this.state.userid)
      .onSnapshot(
        (snapshot) => {
          let allquestions = [];
          let qRef = snapshot.data().questions;
          // console.log(snapshot.data());
          Object.keys(qRef).map((snap) => {
            allquestions[snap - 1] = qRef[snap];
          });
          this.setState({ questions: allquestions });
          this.changeQuestion(this.state.number);
        },
        (error) => {
          console.log(error);
        }
      );
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
    dispatch(logoutUser());
  };

  //testing functions - USER Schema
  addUser() {
    db.collection(this.usercol)
      .add({
        // or use the following to edit an exisitng document
        // .doc("68VkB97iNFQctYCwYZB9hZEaEVu1")
        // .set({
        questions: {
          1: {
            id: "9VbgEeAzpZRkoagkJdof",
            selected: [],
            flag: false,
          },
          2: {
            id: "Sd9XqATmC3xdYP948LZX",
            selected: [],
            flag: false,
          },
        },
        email: "me",
      })
      .then((id) => {
        this.setState({ userid: id });
      });
  }
  render() {
    const { isLoggingOut, logoutError } = this.props;
    return (
      <div>
        <div className="flex">
          {this.state.questions.map((question, key) => {
            return (
              // create the question base
              <div key={key} className={!question.flag ? (question.selected.length === 0 ? "red" : "green") : "yellow"}>
                <button onClick={() => this.changeQuestion(key)}>Q {key + 1}</button> {!question.flag ? (question.selected.length === 0 ? "red" : "green") : "yellow"}
              </div>
            );
          })}
        </div>
        {this.state.submit ? (
          <div>
            Are you sure you want to submit? You can't change your answers once you submit click a question to
            {/* <SubmitPage questions={this.state.questions}></SubmitPage> */}
            <button onClick={() => this.revise()}>Go back</button>
            <button onClick={this.handleLogout}>Submit and Leave</button>
          </div>
        ) : (
          <QuestionPage
            question={this.state.question.id}
            user={this.state.userid}
            number={this.state.number}
            changeQuestion={this.changeQuestion}
            submitAll={this.submitAll}
            lang={this.state.lang}
          ></QuestionPage>
        )}
        {/* <button onClick={() => this.addUser()}>Add User</button> 
        <button onClick={this.handleLogout}>Logout</button>*/}
        {isLoggingOut && <p>Logging Out....</p>}
        {logoutError && <p>Error logging out</p>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
  };
}
export default connect(mapStateToProps)(Dashboard);
