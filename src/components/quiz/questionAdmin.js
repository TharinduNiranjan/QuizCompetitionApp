import React, { Component } from "react";
// import CRUD from "./questionCRUD";
import { db, storage } from "../firebase/firebase";

class QAdmin extends Component {
  col = "questions";
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      image: "",
      choices: [],
      questionID: "",
    };
    // let db = new CRUD();
    this.handleChange = this.handleChange.bind(this);
    this.handleArrayChange = this.handleArrayChange.bind(this);
    // this.getQuestions = db.getQuestions.bind(this);
    // this.createQuestion = db.createQuestion.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.editQuestion = this.editQuestion.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }
  componentDidMount() {
    db.collection(this.col).onSnapshot((querySnapshot) => {
      let questions = [];
      querySnapshot.forEach((doc) => {
        questions.push({ id: doc.id, content: doc.data() });
        console.log(doc.id, doc.data());
      });
      this.setState({ questions: questions });
    });
  }
  // update state on form value changes
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleArrayChange(e) {
    let r = this.state.choices;
    r.find((o, i) => {
      if (o.text === e.target.name) {
        if (e.target.value === "on") {
          r[i] = { text: this.state.choices[i].text, correct: !this.state.choices[i].correct };
        } else {
          r[i] = { text: e.target.value, correct: this.state.choices[i].correct };
        }
        return true; // stop searching
      }
    });
    this.setState({
      choices: r,
    });
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
        let question = snapshot.data();
        this.showImage(question.image);
        this.setState({
          description: question.description,
          image: question.image,
          choices: question.choices,
          questionID: snapshot.id,
        });
      });
  }

  addQuestion() {
    console.log(this.state.questionID);
    if (this.state.questionID !== "") {
      db.collection(this.col)
        .doc(this.state.questionID)
        .set(
          //change schema here
          { description: this.state.description, image: this.state.image, choices: this.state.choices }
        )
        .then(
          this.setState({
            // change schema here
            description: "",
            image: "",
            choices: [],
            questionID: "",
            img: "",
          })
        );
    } else {
      db.collection(this.col)
        .add(
          //change schema here
          { description: this.state.description, image: this.state.image, choices: this.state.choices }
        )
        .then(
          this.setState({
            // change schema here
            description: "",
            image: "",
            choices: [],
            questionID: "",
          })
        );
    }
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

  renderQuestions() {
    return this.state.questions.map((question, key) => (
      <div key={key}>
        <p>Text: {question.content.description}</p>
        <p>Image URL: {question.content.image}</p>
        <ul>
          {question.content.choices.map((choice, key) => (
            <li key={key} className={choice.correct ? "green" : "red"}>
              {choice.text} {choice.correct ? "Correct Answer" : ""}
            </li>
          ))}
        </ul>
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
      <div>
        <h2>{this.state.questionID ? "Edit Question" : "Add New Question"} </h2>
        {/* Populate other fields like this */}
        <input value={this.state.description} onChange={this.handleChange} name="description" placeholder="Description"></input>
        <input onChange={this.fileUpload} type="file" name="image" placeholder="Image"></input>
        <p>{this.state.uploading ? "Uploading" : ""}</p>
        <img className="img-fluid" src={this.state.img}></img>
        {this.state.choices.map((choice, key) => (
          <div key={key}>
            <input value={choice.text} onChange={this.handleArrayChange} name={choice.text} placeholder="Choice"></input>
            <input type="checkbox" checked={choice.correct} onChange={this.handleArrayChange} name={choice.text} placeholder="Choice"></input>
            <button onClick={() => this.removeOption(key)}>Remove</button>
          </div>
        ))}
        <button onClick={() => this.addOption()}>Add Choices</button>
        <button onClick={() => this.addQuestion()}>{this.state.questionID ? "Save Changes" : "Add"}</button>
        {/* </form> */}
        <h2>Exisitng Questions</h2>
        {questions}
      </div>
    );
  }
}

export default QAdmin;
