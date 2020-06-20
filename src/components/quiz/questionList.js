import React, { Component } from "react";
import { Question } from "./questionClasses";
import { db } from "../../firebase/firebase";
import { show_latex } from "./latex";
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
        <li key={key} className={correct === key ? "bGreen" : "red"}>
          {show_latex(choices[key])} {correct === key ? "Correct Answer" : ""}
        </li>
      ));
  }

  renderQuestions() {
    return this.state.questions.map((question, key) => (
      <div className="col-6" key={key}>
        <p>Difficulty: {question.hardness}</p>
        Text: {show_latex(question.description)}
        <p>Image URL: {question.image}</p>
        <ol>{this.renderChoices(question.choices, question.correct)}</ol>
        {/* sinhala */}
        Text: {show_latex(question.sinhalaDescription)}
        <ol>{this.renderChoices(question.sinhalaChoices, question.correct)}</ol>
        {/* Tamil */}
        Text: {show_latex(question.tamilDescription)}
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
