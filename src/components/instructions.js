import React, { Fragment, Component } from "react";
import "../styles/instruction.scss";
import { Navbar, Footer } from "./Navbar";
import { Row, Container, Col } from "react-bootstrap";

class Instruction extends Component {
  state = {
    content: "",
    content2: "",
  };

  Unilevel = () => {
    this.setState({ content: "University Level instructions" });
    this.setState({ content2: " mini-header" });
    this.setState({ content3: "All the content under mini header" });
    this.setState({ content4: "This is the second part" });
  };

  Scllevel = () => {
    this.setState({ content: "here are the school level instruction" });
    this.setState({ content2: " " });
    this.setState({ content3: " " });
    this.setState({ content4: " " });
  };
  componentDidMount() {
    this.Scllevel();
  }
  render() {
    return (
      <Fragment>
        <Navbar></Navbar>
        <Container fluid className="instructions">
          <Row>
            <Col className="all-center">
              <button onClick={this.Scllevel}>Instructions for School</button>
            </Col>
            <Col className="all-center">
              <button onClick={this.Unilevel}>Instructions for University</button>
            </Col>
          </Row>
          <div id="left">
            <h3> {this.state.content}</h3>
            <h2>{this.state.content2}</h2>
            <h3>{this.state.content3}</h3>
            <h2>{this.state.content4}</h2>
          </div>
        </Container>

        <Footer></Footer>
      </Fragment>
    );
  }
}

export default Instruction;
