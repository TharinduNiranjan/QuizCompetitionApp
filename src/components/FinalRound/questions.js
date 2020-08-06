import React, { Component, Fragment } from "react";
import { storage } from "../../firebase/firebase";

// import "./competition.css";
class QuestionPaper extends Component {
  constructor(props) {
    super(props);
    this.state = { downloadLink: "" };
    this.getlink = this.getlink.bind(this);
    this.mounted = true;
  }
  componentDidUpdate() {
    this.getlink(this.props.url, "downloadLink");
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  getlink(link, stateparam) {
    storage
      .ref(link)
      .getDownloadURL()
      .then((url) => {
        if (this.mounted) {
          this.setState({ [stateparam]: url });
        } else {
          return;
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  render() {
    return (
      <Fragment>
        {/* <h2>Final Round Question Paper</h2> */}
        <p>
          <a className="link" href={this.state.downloadLink}>
            Download Question Paper
          </a>
        </p>
      </Fragment>
    );
  }
}
export default QuestionPaper;
