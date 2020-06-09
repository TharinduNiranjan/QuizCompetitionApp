import React, { Component } from "react";
import { db } from "../firebase/firebase";
import QuestionPage from "./questionPage";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { uid: "JI1bUSAcvs9UZyyT0BT5" }, //auth().currentUser,
      questions: [],
      question: {},
      content: "",
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.createNote = this.createNote.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
  }

  // get all questions from Firestore on loading dashboard
  componentDidMount() {
    // this.createNote();
    db.doc(`questions/${this.state.user.uid}`).onSnapshot(
      (snapshot) => {
        let allquestions = [];
        let qRef = snapshot.data().questions;
        // console.log(snapshot.data());
        qRef.forEach((snap) => {
          allquestions.push(snap);
        });
        this.setState({ questions: allquestions, question: allquestions[0] });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleChange(e) {
    this.setState({
      content: e.target.value,
    });
  }
  // Other CRUD Operations

  createNote() {
    const user_id = this.state.user.uid;
    const content = {
      choices: ["A", "B", "C"],
      description: "Question 1 text",
      image: "url to image",
      flag: false,
      number: 1,
      selected: ["A"],
    };
    //   const question = this.state.question;
    //   if (question && question.content) {
    return db.doc(`questions/${user_id}`).update({
      questions: [content],
    });
    //       .then((_) => {
    //         this.setState({ content: "", question: {} });
    //       });
    //   }

    //   db.doc(`questions/${uid}/questions`)
    //     .arrayUnion({ content })
    //     .then((_) => {
    //       this.setState({ content: "" });
    //     });
  }

  // editNote(number) {
  //   db.doc(`questions/${this.state.user.uid}`)
  //     .get()
  //     .then((snapshot) => {
  //       let qref = snapshot.data().questions.find((q) => q.number === number);
  //       if (snapshot.exists === false) {
  //         console.log("Doesn't exist");
  //         return;
  //       }
  //       console.log(qref);
  //       this.setState({
  //         question: qref.description,
  //         content: qref.number,
  //       });
  //     });
  // }

  // switch between questions
  changeQuestion(n) {
    let newq = this.state.questions.find((q) => q.number === n);
    if (!newq) {
      return;
    }
    this.setState({ question: newq });
    console.log(n, newq, this.state);
  }

  render() {
    return (
      <div className="flex">
        {this.state.questions.map((question) => {
          return (
            // create the question base
            <div key={question.number} className={!question.flag ? (question.selected.length === 0 ? "red" : "green") : "yellow"}>
              <button onClick={() => this.changeQuestion(question.number)}>Q {question.number}</button>
            </div>
          );
        })}
        <div>
          <h1>Question {this.state.question.number}</h1>
        </div>
        <QuestionPage question={this.state.question} dbRef={this.state.user.uid}></QuestionPage>
        <button onClick={() => this.changeQuestion(this.state.question.number - 1)}>Prev</button>
        <button onClick={() => this.changeQuestion(this.state.question.number + 1)}>Next</button>
      </div>
    );
  }
}

export default Dashboard;
