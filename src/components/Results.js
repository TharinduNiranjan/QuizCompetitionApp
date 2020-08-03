import React, { Component, Fragment } from "react";
import Navbar, { Footer } from "./Navbar";
import { Row, Col, Container, Form, FormControl } from "react-bootstrap";
import { db, storage } from "../firebase/firebase";

class Home extends Component {
  constructor(props) {
    super(props);
    this.getlink = this.getlink.bind(this);
    this.state = {
      j1url: "gs://umoraquiz.appspot.com/R1_Junior.pdf",
      j2url: "gs://umoraquiz.appspot.com/R2_Junior.pdf",
      m1url: "gs://umoraquiz.appspot.com/R1_Intermediate.pdf",
      m2url: "gs://umoraquiz.appspot.com/R2_Intermediate.pdf",
      s1url: "gs://umoraquiz.appspot.com/R1_Senior.pdf",
      a1url: "https://bit.ly/%CE%BCMoraRound1QnA",
      a2url: "https://drive.google.com/drive/folders/1NyOQjmjHelc0DeVEQiYSjgkdXYOTsuQp?usp=sharing",
      value: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    db.collection("downloads")
      .doc("results")
      .get()
      .then(
        (item) => {
          let data = item.data();
          this.getlink(data.j1, "j1url");
          this.getlink(data.m1, "m1url");
          this.getlink(data.s1, "s1url");
          this.getlink(data.j2, "j2url");
          this.getlink(data.m2, "m2url");
          // this.getlink(data.a1, "a1url");
          // this.getlink(data.a2, "a2url");
        },
        (err) => {
          console.log(err);
        }
      );
  }
  getlink(link, stateparam) {
    storage
      .ref(link)
      .getDownloadURL()
      .then((url) => {
        this.setState({ [stateparam]: url });
      });
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.props.history.push(`/certificate/${this.state.value}`);
    event.preventDefault();
  }
  render() {
    return (
      <Fragment>
        <Navbar></Navbar>
        <Container fluid>
          <Row>
            <Col lg="4" sm="12" className=" order-lg-2 tflex-container result_bg desktop-only"></Col>
            <Col lg="8" sm="12" className="p-0 m-0 order-lg-1">
              <div className="container rflex-container" id="results">
                <div className="row mb-4 mt-4">
                  <div className="text-center">
                    {" "}
                    <h2>
                      μMora Mathematics Competition <br></br>Results - 2020
                    </h2>
                  </div>
                </div>
                <form className="row mb-4 text-center col-12" onSubmit={this.handleSubmit}>
                  <div className="col-sm-3">
                    <label>Validate Certificate</label>
                  </div>
                  <div className="col-sm-9 ">
                    <input className="col-9" type="text" value={this.state.value} onChange={this.handleChange} />
                    <input className="button col-3 px-0" type="submit" value="Check" />
                  </div>
                </form>
                <div className="row text-center mb-4" id="Round_1">
                  <div className="col-sm-3 " id="menu-tile">
                    <div className="text-center">Round 1</div>
                  </div>
                  <div className="col-sm-9">
                    <div className="row">
                      <div className="col-sm-4 ">
                        <a className="link2" href={this.state.j1url} target="_blank" rel="noopener noreferrer">
                          Junior
                        </a>
                      </div>
                      <div className="col-sm-4 ">
                        <a className="link2" href={this.state.m1url} target="_blank" rel="noopener noreferrer">
                          Intermediate
                        </a>
                      </div>
                      <div className="col-sm-4 ">
                        <a className="link2" href={this.state.s1url} target="_blank" rel="noopener noreferrer">
                          Senior
                        </a>
                      </div>
                    </div>
                    <hr className="desktop-only"></hr>
                    <div className="row">
                      <div className="col-lg-12 ">
                        <a href={this.state.a1url} className="link2 dark" target="_blank" rel="noopener noreferrer">
                          Round 1 Past Papers and Answers
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row text-center hr mb-4 pt-4 pt-sm-0" id="Round_2">
                  <div className=" col-sm-3 " id="menu-tile">
                    <div className="text-center ">Round 2</div>
                  </div>
                  <div className="col-sm-9">
                    <div className="row">
                      <div className="col-sm-6">
                        <a href={this.state.j2url} className="link2" target="_blank" rel="noopener noreferrer">
                          Junior
                        </a>
                      </div>
                      <div className="col-sm-6">
                        <a href={this.state.m2url} className="link2" target="_blank" rel="noopener noreferrer">
                          Intermediate
                        </a>
                      </div>
                    </div>
                    <hr className="desktop-only"></hr>
                    <div className="row">
                      <div className="col-12">
                        <a href={this.state.a2url} className="link2 dark" target="_blank" rel="noopener noreferrer">
                          Round 2 Past Papers and Answers
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Footer></Footer>
      </Fragment>
    );
  }
}
export default Home;
