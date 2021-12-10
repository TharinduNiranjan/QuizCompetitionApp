import React, { Component, Fragment } from "react";
import { storage } from "../../firebase/firebase";

// import "./competition.css";
class QuestionPaper extends Component {
  constructor(props) {
    super(props);
    this.state = { downloadLink: "" };
    this.getlink = this.getlink.bind(this);
    this.mounted = true;
    this.getlink(this.props.url, "downloadLink");
  }
  componentDidUpdate(prevProps) {
    if (prevProps.url != this.props.url) {
      this.mounted = true;
      this.getlink(this.props.url, "downloadLink");
    }
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  async getlink(link, stateparam) {
    let downloadLink = "#";
    await storage
      .ref(link)
      .getDownloadURL()
      .then((url) => {
        if (this.mounted) {
          this.setState({ [stateparam]: url });
          downloadLink = url;
        } else {
          return;
        }
      })
      .catch((err) => {
        downloadLink = "#";
        // console.log(err);
      });
  }

  render() {
    // this.getlink(this.props.url, "downloadLink");
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
