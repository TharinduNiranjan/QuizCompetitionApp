import React, { Component } from "react";
import { Question } from "./questionClasses";
import { db } from "../../firebase/firebase";

class QList extends Component {
  constructor(props) {
    super(props);
    this.col = this.props.collection;
    this.state = {};
    this.renderQuestions = this.renderQuestions.bind(this);
  }
  componentDidMount() {
    db.collection(this.col).onSnapshot((querySnapshot) => {
      let questions = [];
      querySnapshot.forEach((doc) => {
        let question = new Question(doc.data(), doc.id);
        questions.push(question);
      });
      this.setState({ questions: questions });
    });
  }

  renderChoices(choices, correct) {
    // mapping the array caused the answers to render unordered
    return Object.keys(choices)
      .sort()
      .map((key) => (
        <li key={key} className={correct === key ? "green" : "red"}>
          {key} -->{choices[key]} {correct === key ? "Correct Answer" : ""}
        </li>
      ));
  }

  renderQuestions() {
    return this.state.questions.map((question, key) => (
      <div className="col-6" key={key}>
        <p>Difficulty: {question.hardness}</p>
        <p>Text: {question.description}</p>
        <p>Image URL: {question.image}</p>
        <ol>{this.renderChoices(question.choices, question.correct)}</ol>
        {/* sinhala */}
        <p>Text: {question.sinhalaDescription}</p>
        <ol>{this.renderChoices(question.sinhalaChoices, question.correct)}</ol>
        {/* Tamil */}
        <p>Text: {question.tamilDescription}</p>
        <ol>{this.renderChoices(question.tamilChoices, question.correct)}</ol>
        <button onClick={() => this.props.edit(question.id)}>Edit</button>
      </div>
    ));
  }

  render() {
    let questions;
    if (this.state.questions) {
      questions = this.renderQuestions();
    }
    return <div className="row">{questions}</div>;
  }
}
export default QList;
