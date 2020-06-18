import React, { Component } from "react";
class SubmitPage extends Component {
  constructor(props) {
    super(props);
    this.state = { questions: this.props.questions };
  }
  componentDidUpdate(oldProps) {
    if (oldProps.questions !== this.props.questions) {
      console.log(this.state);
      this.state.questions.map((question) => {
        if (question.flag) {
          this.setState({ flag: true });
          return;
        }
      });
      this.state.questions.map((question) => {
        if (!question.selected) {
          this.setState({ unanswered: true });
          return;
        }
      });
    }
  }

  render() {
    return (
      <div>
        <p>{this.state.flag ? "There are flagged questions" : "All good"}</p>
        <p>{this.state.unanswered ? "There are unanswered questions" : "All good"}</p>
      </div>
    );
  }
}
export default SubmitPage;
