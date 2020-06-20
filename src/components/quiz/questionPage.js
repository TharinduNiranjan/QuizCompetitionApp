import React, { Component } from "react";
import { db } from "../../firebase/firebase";
import { Form, Button } from "react-bootstrap";
// let admin = require("firebase-admin");

class QuestionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      question: {
        description: "",
        images: "",
      },
    };
    this.questioncol = "questions";
    this.usercol = "users";
    this.saveAnswer = this.saveAnswer.bind(this);
    this.select = this.select.bind(this);
    this.getQuestion = this.getQuestion.bind(this);
  }
  componentDidUpdate(oldProps) {
    let id = this.props.question;
    if (oldProps.question !== id && id) {
      this.getQuestion(id);
      this.setState({ id: id });
    }
  }
  getQuestion(id) {
    db.collection(this.questioncol)
      .doc(id)
      .get()
      .then((question) => {
        console.log(question.data());
        this.setState({ question: question.data() });
      });
    db.collection(this.usercol)
      .doc(this.props.user)
      .onSnapshot((questions) => {
        let q = questions.data().questions[this.props.number + 1]; //add one for zero indexing
        this.setState({ selected: q.selected, flag: q.flag });
        console.log(this.state);
      });
  }
  saveAnswer(number) {
    this.props.changeQuestion(number);
    // code to save answer to db
    let field = "questions." + (this.props.number + 1) + ".selected"; //add one for zero indexing
    db.collection(this.usercol)
      .doc(this.props.user)
      .update({ [field]: this.state.selected }); // make array if multiple answers
  }
  setFlag(number) {
    let field = "questions." + (this.props.number + 1) + ".flag";
    let flag = this.state.flag;
    db.collection(this.usercol)
      .doc(this.props.user)
      .update({ [field]: !flag });
  }
  select(choice) {
    this.setState({ selected: choice }); //.saveAnswer(choice);
  }

  render() {
    
    let choices;
    if (this.state.question.choices) {
      choices = this.state.question.choices.map((choice, key) => <Form.Check key={key} type="radio" onClick={() => this.select(choice)} label={choice.text} checked={choice.text === this.state.selected.text ? true : false} />);
    }
    return (
      // create the question base
      <div key={this.props.id}>
        <div>
          <h1>Question {this.props.number + 1}</h1>
        </div>
        <p>Q {this.state.question.description}</p>
        <p> {this.state.question.image} </p>
        <Form> {choices}</Form>
        <div className="flex">
          <Button onClick={() => this.saveAnswer(this.props.number - 1)}>Prev</Button>
          <Button className="ml-3 mr-3" onClick={() => this.setFlag(this.props.number)}>
            Flag: {this.state.flag ? "Yes" : "No"}
          </Button>
          <Button onClick={() => this.saveAnswer(this.props.number + 1)}>Next</Button>
        </div>
      </div>
    );
  }
}
export default QuestionPage;
