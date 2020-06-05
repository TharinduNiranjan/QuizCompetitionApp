import React, { Component } from "react";
import { db } from "../firebase/firebase";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { uid: 1 },
      notes: [],
      note: {},
      content: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.createNote = this.createNote.bind(this);
  }
  componentDidMount() {
    db.ref(`all_notes/${this.state.user.uid}`).on("value", (snapshot) => {
      let allNotes = [];
      snapshot.forEach((snap) => {
        allNotes.push(snap.val());
      });
      this.setState({ notes: allNotes });
    });
  }

  handleChange(e) {
    this.setState({
      content: e.target.value,
    });
  }

  createNote() {
    const uid = this.state.user.uid;
    const { content } = this.state;
    const note = this.state.note;
    if (note && note.content) {
      return db
        .ref(`all_notes/${uid}/${note.note_id}`)
        .update({
          content,
        })
        .then((_) => {
          this.setState({ content: "", note: {} });
        });
    }
    const note_id = `note-${Date.now()}`;
    db.ref(`all_notes/${uid}/${note_id}`)
      .set({
        content,
        note_id,
        uid,
      })
      .then((_) => {
        this.setState({ content: "" });
      });
  }

  editNote(note_id) {
    db.ref(`all_notes/${this.state.user.uid}/${note_id}`)
      .once("value")
      .then((snapshot) => {
        this.setState({
          note: snapshot.val(),
          content: snapshot.val().content,
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.notes.map((note) => {
          return (
            <div key={note.note_id}>
              <p>{note.content}</p>
              <button onClick={() => this.editNote(note.note_id)}>Edit</button>
            </div>
          );
        })}
        <div>
          <input onChange={this.handleChange} value={this.state.content} />
          <button onClick={this.createNote}>Create Note</button>
        </div>
        ;
      </div>
    );
  }
}

export default Dashboard;
