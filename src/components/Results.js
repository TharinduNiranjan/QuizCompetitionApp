import React, { Component, Fragment } from "react";
import Navbar, { MiniFooter } from "./Navbar";
import { Row, Container, Col } from "react-bootstrap";
import { db, storage } from "../firebase/firebase";
import ls from "local-storage";

class Home extends Component {
  constructor(props) {
    super(props);
    this.getlink = this.getlink.bind(this);
    this.state = {
      email: "username",
      marks: "00",
      selected: false,
      url: "",
    };
  }
  componentDidMount() {
    let uid = ls.get("UserId");
    // console.log(uid);
    db.collection("results")
      .doc(uid)
      .get()
      .then(
        (item) => {
          let email = item.data().email;
          let marks = item.data().marks;
          let selected = item.data().selected;
          this.setState({
            email: email,
            marks: marks,
            selected: selected,
          });
          this.getlink(uid);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  getlink() {
    let email = this.state.email;
    let doc = "junior";
    if (email.includes("sr")) {
      doc = "senior";
    } else {
      doc = "junior";
    }
    db.collection("downloads")
      .doc(doc)
      .get()
      .then((linkref) => {
        let lang = ls.get("language");
        let link = linkref.data()[lang];
        // console.log(link);
        storage
          .ref(link)
          .getDownloadURL()
          .then((url) => {
            this.setState({ url: url });
          });
      });
  }
  render() {
    return (
      <Fragment>
        <Navbar></Navbar>
        <Container fluid>
          <Row>
            <Col sm="9" className="vertical-align">
              <div className="resultcolumn">
                <div id="resultbox">
                  <p id="thankyou">THANK YOU</p>
                  <p>
                    For participating in the 1<sup>st</sup> round of μMora Mathematics Competition 2020
                  </p>
                  <Row className="table py-2">
                    <Col xs="6">Username</Col>
                    <Col xs="6">Marks</Col>
                    <Col xs="6">{this.state.email}</Col>
                    <Col xs="6">{this.state.marks}</Col>
                  </Row>
                  {this.state.marks === "*" ? (
                    <p id="captionResult my-4"> You have not attempted the paper</p>
                  ) : this.state.selected ? (
                    <div>
                      {" "}
                      <p id="captionResult">
                        You have been <b>selected</b> to participate to the next round of the competiiton
                      </p>
                      <div id="congratulations">Congratulations !</div>
                    </div>
                  ) : (
                    <div>
                      <p id="captionResult">You have not been selected</p> <div id="congratulations">Better Luck Next Time</div>
                    </div>
                  )}
                  {this.state.url ? (
                    <a href={this.state.url} className="link" target="_blank">
                      {" "}
                      Answers of Round 1
                    </a>
                  ) : (
                    ""
                  )}
                </div>
                <MiniFooter></MiniFooter>
              </div>
            </Col>
            <Col sm="3" className="tflex-container color-change-5x order-sm-2"></Col>
          </Row>{" "}
        </Container>
        {/* <Footer></Footer> */}
      </Fragment>
    );
  }
}
export default Home;
