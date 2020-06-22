import React, { Fragment, Component } from "react";
import "../styles/instruction.scss";
import Navbar, { Footer } from "./Navbar";
import { Row, Container, Col } from "react-bootstrap";

class Instruction extends Component {
  state = {
    content: "",
  };
  componentDidMount() {
    this.platlevel();
  }

  platlevel = () => {
    this.setState({
      content: (
        <div>
          <h4>Platform Guidelines</h4>
          <p>1. Navigate to the login from the navigation bar</p>
          <p>2. Enter the given @umora mail address with the relevant password to enter the competition.</p>
          <p>
            3. On the bottom, there are prev and next buttons to switch between concurrent questions. The flag button can be used to flag any important question the user may intend to refer later.
          </p>
          <p>4. On top of the page, a question dashboard will be there to switch between any question as preferred. The colors of the buttons are indicated as follows.</p>
          <p style={{ paddingLeft: "4%" }}>
            {" "}
            &#9679; <b>Flagged questions - Red</b>
          </p>
          <p style={{ paddingLeft: "4%" }}>
            {" "}
            &#9679; <b>Unanswered questions - White</b>
          </p>
          <p style={{ paddingLeft: "4%" }}>
            {" "}
            &#9679; <b>Answered questions - Blue</b>
          </p>
          <p>5. The category button color may differ according to the complexity of the question.</p>
          <p>6. Choose the answer button and progress as intended. Answers can be changed anytime before submission. ‘Remove answer’ button will make the question unanswered.</p>
        </div>
      ),
    });
  };
  instruct = () => {
    this.setState({
      content: (
        <div>
          <h4>Competition Rules</h4>
        </div>
      ),
    });
  };
  render() {
    return (
      <Fragment>
        <Navbar></Navbar>
        <br />
        <Container>
          <div className="instructions">
            <section>
              <Row>
                <Col>
                  <button className="button" onClick={this.platlevel}>
                    {" "}
                    Platform Guidelines
                  </button>
                </Col>
                <Col>
                  <button className="button" onClick={this.instruct}>
                    {" "}
                    Competition Rules
                  </button>
                </Col>
              </Row>
              <br />
              {this.state.content}
            </section>
          </div>
        </Container>
        <Footer></Footer>
      </Fragment>
    );
  }
}

export default Instruction;
