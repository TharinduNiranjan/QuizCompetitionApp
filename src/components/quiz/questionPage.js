import React, { Component } from "react";
import { db, storage } from "../../firebase/firebase";
import { Form, Row, Col, Container } from "react-bootstrap";
import { show_latex } from "./latex";

class QuestionPage extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      question: {
        description: "",
        image: "",
        hardness: "",
      },
    };
    this.questioncol = "questions";
    this.usercol = "users";
    this.disconnectUser = function () {}; // realtime connection to firebase
    this.getQuestion = this.getQuestion.bind(this); // get question from questions collection and create observable from user collection
    this.saveAnswer = this.saveAnswer.bind(this); // save answer on click
    this.changeQuestion = this.changeQuestion.bind(this); // next and previous buttons
    this.unselect = this.unselect.bind(this); // clear choices as some questions need not be answered
    this.setFlag = this.setFlag.bind(this); // flag question
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentDidUpdate(oldProps) {
    // this function updates the question page when dashboard buttons changes prop.question

    let id = this.props.question;
    if (oldProps.question !== id && id) {
      // this._isMounted = false;
      // this._isMounted = true;
      this.getQuestion(id);
      this.setState({ id: id, number: this.props.number });
    }
  }
  getQuestion(id) {
    db.collection(this.questioncol)
      .doc(id)
      .get()
      .then((question) => {
        if (!this._isMounted) {
          return;
        }
        if (question.data().image) {
          storage
            .ref(question.data().image)
            .getDownloadURL()
            .then((url) => {
              if (!this._isMounted) {
                return;
              }
              let data = question.data();
              let q = {
                description: data[this.props.lang].description,
                choices: data[this.props.lang].choices,
                hardness: data.hardness,
                image: url,
              };
              this.setState({ question: q });
            });
        } else {
          let data = question.data();
          let q = {
            description: data[this.props.lang].description,
            choices: data[this.props.lang].choices,
            hardness: data.hardness,
            image: "",
          };
          this.setState({ question: q });
        }
      });
    // create an observer so that answers are saved in realtime
    this.disconnectUser = db
      .collection(this.usercol)
      .doc(this.props.user)
      .onSnapshot((questions) => {
        let q = questions.data().questions[this.props.number + 1]; //add one for zero indexing
        this.setState({ selected: q.selected, flag: q.flag });
      });
  }
  componentWillUnmount() {
    this.disconnectUser();
    this._isMounted = false;
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
    if (number > this.props.length - 1) {
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
        <Form.Check
          key={key}
          type="radio"
          label={show_latex(this.state.question.choices[key])}
          onClick={() => this.saveAnswer(key)}
          value={key}
          onChange={this.handleChange}
          checked={key === this.state.selected ? true : false}
        />
      ));
    }
    return (
      // create the question base
      <div>
        <div className="Qcontent" key={this.props.id}>
          <Row className="xnumcategory">
            <div className="xqNum">
              Question {this.props.number + 1} of {this.props.length}
            </div>
            <div className="xqCategory">Category : {this.state.question.hardness}</div>
          </Row>
          <Row>
            {/* <Col sm="2">
            <p>Question {this.props.number + 1}</p>
            <p>Difficulty {this.state.question.hardness}</p>
          </Col> */}
            <Col className="questionContent">
              <div>{show_latex(this.state.question.description)}</div>
              {this.state.question.image ? <img alt="question" className="img-fluid Qimage" src={this.state.question.image}></img> : ""}
              <div className="choices">
                {choices}
                <button className="reset" onClick={() => this.unselect()}>
                  Remove Answer
                </button>
              </div>
            </Col>
          </Row>
        </div>
        <Container className="dashboard-footer">
          <Row>
            <Col>
              <button onClick={() => this.changeQuestion(this.props.number - 1)}> {"<Prev"}</button>
            </Col>
            <Col>
              <button className={this.state.flag ? "flagbutton" : ""} onClick={() => this.setFlag(this.props.number)}>
                {this.state.flag ? "Flagged" : "Flag Question"}
              </button>
            </Col>
            <Col>
              <button onClick={() => this.changeQuestion(this.props.number + 1)}>{this.props.number >= this.props.length - 1 ? "Submit" : "Next>"}</button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default QuestionPage;
