import React, { Component } from "react";
import { db, storage } from "../../firebase/firebase";
import { Form, Button } from "react-bootstrap";
// let admin = require("firebase-admin");

class QuestionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      question: {
        description: "",
        image: "",
      },
    };
    this.questioncol = "questions";
    this.usercol = "users";
    this.getQuestion = this.getQuestion.bind(this); // get question from questions collection and create observable from user collection
    this.saveAnswer = this.saveAnswer.bind(this); // save answer on click
    this.changeQuestion = this.changeQuestion.bind(this); // next and previous buttons
    this.unselect = this.unselect.bind(this); // clear choices as some questions need not be answered
    this.setFlag = this.setFlag.bind(this); // flag question
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidUpdate(oldProps) {
    // this function updates the question page when dashboard buttons changes prop.question
    let id = this.props.question;
    if (oldProps.question !== id && id) {
      this.getQuestion(id);
      this.setState({ id: id, number: this.props.number });
      console.log(this.state);
    }
  }
  getQuestion(id) {
    db.collection(this.questioncol)
      .doc(id)
      .get()
      .then((question) => {
        if (question.data().image) {
          storage
            .ref(question.data().image)
            .getDownloadURL()
            .then((url) => {
              let data = question.data()[this.props.lang];
              let q = {
                description: data.description,
                choices: data.choices,
                image: url,
              };
              this.setState({ question: q });
            });
        } else {
          let data = question.data()[this.props.lang];
          let q = {
            description: data.description,
            choices: data.choices,
            image: "",
          };
          this.setState({ question: q });
        }
      });
    // create an observer so that answers are saved in realtime
    db.collection(this.usercol)
      .doc(this.props.user)
      .onSnapshot((questions) => {
        let q = questions.data().questions[this.props.number + 1]; //add one for zero indexing
        this.setState({ selected: q.selected, flag: q.flag });
      });
  }
  resetState() {
    this.setState({
      selected: "",
      question: {
        description: "",
        image: "",
        choices: [],
      },
    });
  }

  changeQuestion(number) {
    // code to save answer to db
    if (number < 0) {
      return;
    }
    this.resetState();
    this.props.changeQuestion(number);
    if (number > 1) {
      this.props.submitAll();
    }
    // make array if multiple answers
  }
  setFlag() {
    let field = "questions." + (this.props.number + 1) + ".flag";
    let flag = this.state.flag;
    db.collection(this.usercol)
      .doc(this.props.user)
      .update({ [field]: !flag });
  }
  saveAnswer(choice) {
    console.log("saved");
    let field = "questions." + (this.state.number + 1) + ".selected"; //add one for zero indexing
    db.collection(this.usercol)
      .doc(this.props.user)
      .update({ [field]: choice });
  }
  unselect() {
    console.log("unsaved");
    let field = "questions." + (this.state.number + 1) + ".selected"; //add one for zero indexing
    db.collection(this.usercol)
      .doc(this.props.user)
      .update({ [field]: "" });
  }
  handleChange(e) {
    this.setState({ selected: e.target.value });
  }

  render() {
    let choices;
    if (this.state.question.choices) {
      choices = Object.keys(this.state.question.choices).map((key) => (
        // onClick={() => this.select(key)}
        <Form.Check
          key={key}
          type="radio"
          label={this.state.question.choices[key]}
          onClick={() => this.saveAnswer(key)}
          value={key}
          onChange={this.handleChange}
          checked={key === this.state.selected ? true : false}
        />
      ));
    }
    return (
      // create the question base
      <div key={this.props.id}>
        <div>
          <h1>Question {this.props.number + 1}</h1>
        </div>
        <p>Q {this.state.question.description}</p>
        {this.state.question.image ? <img alt="question" className="img-fluid" src={this.state.question.image}></img> : ""}
        <Form> {choices}</Form>
        <button onClick={() => this.unselect()}>Reset Choices</button>
        <div className="flex">
          <Button onClick={() => this.changeQuestion(this.props.number - 1)}>Prev</Button>
          <Button className="ml-3 mr-3" onClick={() => this.setFlag(this.props.number)}>
            Flag: {this.state.flag ? "Yes" : "No"}
          </Button>
          <Button onClick={() => this.changeQuestion(this.props.number + 1)}>{this.props.number >= 1 ? "Submit" : "Next"}</Button>
        </div>
      </div>
    );
  }
}
export default QuestionPage;
