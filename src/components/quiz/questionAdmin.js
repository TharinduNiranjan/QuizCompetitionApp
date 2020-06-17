import React, { Component } from "react";
import { Question, DBQuestion } from "./questionClasses";
import { db, storage } from "../../firebase/firebase";
import { Form } from "react-bootstrap";

class QAdmin extends Component {
  col = "questions";
  constructor(props) {
    super(props);
    this.state = new Question();
    // let db = new CRUD();
    this.handleChange = this.handleChange.bind(this);
    this.handleArrayChange = this.handleArrayChange.bind(this);
    this.handleSinhalaChange = this.handleSinhalaChange.bind(this);
    this.handleTamilChange = this.handleTamilChange.bind(this);
    this.resetState = this.resetState.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.editQuestion = this.editQuestion.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
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
  // update state on form value changes
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleArrayChange(e) {
    let choices = this.state.choices;
    choices[e.target.name] = e.target.value;
    this.setState({ choices: choices });
  }
  handleSinhalaChange(e) {
    let choices = this.state.sinhalaChoices;
    choices[e.target.name] = e.target.value;
    this.setState({ choices: choices });
  }
  handleTamilChange(e) {
    let choices = this.state.tamilChoices;
    choices[e.target.name] = e.target.value;
    this.setState({ choices: choices });
  }

  fileUpload(e) {
    let file = e.target.files[0];
    let now = new Date();
    let time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    let filename = file.name + time;
    this.setState({ uploading: true });
    let storageRef = storage.ref();
    if (file && this.state.image) {
      storageRef.child(this.state.image).delete(); // delete previous file
    }

    let upload = storageRef.child(filename).put(file);
    upload.on(
      "state_changed",
      function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      function (error) {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        console.log(upload.snapshot);
        this.setState({ image: upload.snapshot.ref.fullPath });
        this.showImage(upload.snapshot.ref.fullPath);
        this.setState({ uploading: false });
      }
    );
  }
  showImage(image) {
    storage
      .ref(image)
      .getDownloadURL()
      .then((url) => {
        this.setState({ img: url });
      });
  }

  editQuestion(id) {
    db.collection(this.col)
      .doc(id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists === false) {
          console.log("Doesn't exist");
          return;
        }
        let question = new Question(snapshot.data(), snapshot.id);
        this.showImage(question.image);
        this.setState(question);
      });
  }

  addQuestion() {
    let question = DBQuestion(this.state);
    console.log(question);
    if (this.state.id) {
      db.collection(this.col).doc(this.state.id).set(question).then(this.resetState());
    } else {
      db.collection(this.col).add(question).then(this.resetState());
    }
  }
  resetState() {
    this.setState(new Question());
  }
  addOption() {
    let choices = this.state.choices;
    choices.push({ text: "", correct: false });
    this.setState({
      choices: choices,
    });
  }
  removeOption(index) {
    let choices = this.state.choices;
    choices.splice(index, 1);
    this.setState({
      choices: choices,
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
      <div key={key}>
        <p>Text: {question.description}</p>
        <p>Image URL: {question.image}</p>
        <ol>{this.renderChoices(question.choices, question.correct)}</ol>
        {/* sinhala */}
        <p>Text: {question.sinhalaDescription}</p>
        <ol>{this.renderChoices(question.sinhalaChoices, question.correct)}</ol>
        {/* Tamil */}
        <p>Text: {question.tamilDescription}</p>
        <ol>{this.renderChoices(question.tamilChoices, question.correct)}</ol>
        <button onClick={() => this.editQuestion(question.id)}>Edit</button>
      </div>
    ));
  }
  render() {
    let questions;
    if (this.state.questions) {
      questions = this.renderQuestions();
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <Form className="col-6">
            <h2>{this.state.id ? "Edit Question" : "Add New Question"} </h2>
            {/* Populate other fields like this */}
            <input value={this.state.description} onChange={this.handleChange} name="description" placeholder="English"></input>
            {Object.keys(this.state.choices)
              .sort()
              .map((key) => (
                <div key={key}>
                  <label>{key}</label>
                  <input value={this.state.choices[key]} onChange={this.handleArrayChange} name={key} placeholder={"Answer " + key}></input>
                </div>
              ))}

            {/* Sinhala Input */}
            <input value={this.state.sinhalaDescription} onChange={this.handleChange} name="sinhalaDescription" placeholder="සිංහල​"></input>
            {Object.keys(this.state.sinhalaChoices)
              .sort()
              .map((key) => (
                <div key={key}>
                  <label>{key}</label>
                  <input value={this.state.sinhalaChoices[key]} onChange={this.handleSinhalaChange} name={key} placeholder={key + " උත්තරය​"}></input>
                </div>
              ))}
            {/* Tamil Input */}
            <input value={this.state.tamilDescription} onChange={this.handleChange} name="tamilDescription" placeholder="தமிழ்"></input>
            {Object.keys(this.state.tamilChoices)
              .sort()
              .map((key) => (
                <div key={key}>
                  <label>{key}</label>
                  <input value={this.state.tamilChoices[key]} onChange={this.handleTamilChange} name={key} placeholder={"பதில் " + key}></input>
                </div>
              ))}
            {/* Image */}
            <Form.File onChange={this.fileUpload} type="file" name="image" label="Question Image" />
            <p>{this.state.uploading ? "Uploading" : ""}</p>
            <img className="img-fluid" src={this.state.img}></img>
            <Form.Label>Correct Answer</Form.Label>
            <Form.Control as="select" name="correct" onChange={this.handleChange}>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
              <option>E</option>
            </Form.Control>
            {/* <button onClick={() => this.addOption()}>Add Choices</button> */}
            <button onClick={() => this.addQuestion()}>{this.state.id ? "Save Changes" : "Add"}</button>
          </Form>
          <div className="col-6">
            <h2>Exisiting Questions</h2>
            {questions}
          </div>
        </div>
      </div>
    );
  }
}

export default QAdmin;
