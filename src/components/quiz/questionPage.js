import React, { Component } from "react";
import { db } from "../firebase/firebase";
// let admin = require("firebase-admin");

class QuestionPage extends Component {
  constructor(props) {
    super(props);
    this.saveAnswer = this.saveAnswer.bind(this);
  }
  saveAnswer(choice) {
    // code to save answer to db
    let propStr = "questions." + 0 + ".selected";
    console.log(propStr, this.props.dbRef);
    // db.doc(`questions/${this.props.dbRef}`).update({ [propStr]: choice });
  }
  render() {
    return (
      // create the question base
      <div key={this.props.question.number}>
        <p>Q {this.props.question.description}</p>
        <p> {this.props.question.image} </p>
        <p>Flagged :{this.props.question.flag ? "Yes" : "No"}</p>
        <button onClick={() => this.saveAnswer("A")}>A</button>
        {/* <ul>
          {this.state.choices.map((choice) => {
            return <li><button onClick={() => this.saveAnswer(choice)}>{choice}</button></li>;
          })}
        </ul> */}
        {/* <button onClick={() => this.saveAnswer(choice)}>{choice}</button> */}
      </div>
    );
  }
}
export default QuestionPage;
