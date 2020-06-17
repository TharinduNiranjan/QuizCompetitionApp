import { db } from "../firebase/firebase";
// class question{

// }

class CRUD {
  getQuestions() {
    return db.collection("questions").get();
  }

  createQuestion() {
    // const user_id = this.state.user.uid;
    const schema = {
      choices: ["A", "B", "C"],
      description: "Question 1 text",
      image: "url to image",
      multiple: true,
      correct: ["A"],
    };
    // const question = this.state.question;
    //   if (question && question.content) {
    return db.collection("questions").add(schema);
    //       .then((_) => {
    //         this.setState({ content: "", question: {} });
    //       });
    //   }

    //   db.doc(`questions/${uid}`)
    //     .set( question )
    //     .then((_) => {
    //       this.setState({ content: "" });
    //     });
  }

  editQuestion(number) {
    db.doc(`questions/${this.state.user.uid}`)
      .get()
      .then((snapshot) => {
        let qref = snapshot.data().questions.find((q) => q.number === number);
        if (snapshot.exists === false) {
          console.log("Doesn't exist");
          return;
        }
        console.log(qref);
        this.setState({
          question: qref.description,
          content: qref.number,
        });
      });
  }
}
export default CRUD;
