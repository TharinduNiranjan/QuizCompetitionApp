import React, { Component } from "react";
import { db } from "../../firebase/firebase";
import QuestionPage from "./questionPage";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/";
import ls from 'local-storage';
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
      userid: "dp2bEKxEyWUag2bvmxJ8", //auth().currentUser,
      questions: [],
      question: "",
      number: 0,
      selected: "",
    };
    // this.handleChange = this.handleChange.bind(this);
    this.addUser = this.addUser.bind(this);
    this.updateSelection = this.updateSelection.bind(this);
    this.usercol = "users";
    this.questioncol = "questions";
    this.changeQuestion = this.changeQuestion.bind(this);
  }

  // get all questions from Firestore on loading dashboard
  componentDidMount() {
    // this.createNote();
    db.collection(this.usercol)
      .doc(this.state.userid)
      .onSnapshot(
        (snapshot) => {
          let allquestions = [];
          let qRef = snapshot.data().questions;
          // console.log(snapshot.data());
          Object.keys(qRef).map((snap) => {
            allquestions.push(qRef[snap]);
          });
          this.setState({ questions: allquestions });
          this.changeQuestion(this.state.number);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
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
  updateSelection(sel) {
    this.setState({ selected: sel });
  }
  //testing functions
  addUser() {
    db.collection(this.usercol)
      .add({
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
  //logout user
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  render() {
    console.log(ls.get('UserId'))
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
        <QuestionPage question={this.state.question.id} user={this.state.userid} number={this.state.number} changeQuestion={this.changeQuestion}></QuestionPage>
        <button onClick={() => this.addUser()}>Add User</button>
        <div>
      </div>
        
      <button onClick={this.handleLogout}>Logout</button>
      {isLoggingOut && <p>Logging Out....</p>}
      {logoutError && <p>Error logging out</p>}
      </div>
 
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}
export default connect(mapStateToProps)(Dashboard);