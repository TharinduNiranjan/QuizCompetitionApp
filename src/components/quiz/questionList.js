import React, { Component } from "react";
import { Question } from "./questionClasses";
import { db } from "../../firebase/firebase";
import { show_latex } from "./latex";
import { Col, Row } from "react-bootstrap";
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
        <Row key={key} className={correct === key ? "bGreen" : ""}>
          <Col xs="1">{key}</Col>
          <Col xs="11">{show_latex(choices[key])}</Col>
        </Row>
      ));
  }

  renderQuestions() {
    return this.state.questions.map((question, key) => (
      <div className="container question" key={key}>
        <Row>
          <Col sm="10">
            <h2>Question {question.id} </h2>
          </Col>
          <Col sm="2">
            <button onClick={() => this.props.edit(question.id)}>Edit</button>
          </Col>
        </Row>
        <Row>
          <Col>Difficulty: {question.hardness}</Col>
          <Col>Image URL: {question.image}</Col>
        </Row>
        <h4>English</h4>
        {show_latex(question.description)}
        <div>{this.renderChoices(question.choices, question.correct)}</div>
        {/* sinhala */}
        <h4>Sinhala</h4> {show_latex(question.sinhalaDescription)}
        <div>{this.renderChoices(question.sinhalaChoices, question.correct)}</div>
        {/* Tamil */}
        <h4>Tamil</h4> {show_latex(question.tamilDescription)}
        <div>{this.renderChoices(question.tamilChoices, question.correct)}</div>
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
