import React, { Component, Fragment } from "react";
import Login from "./Login";
import { Navbar, Footer } from "./Navbar";
import { Row, Container, Col } from "react-bootstrap";

class LoginPage extends Component {
  render() {
    return (
      <Fragment>
        <Navbar></Navbar>
        <Container fluid>
          <Row>
            <Col sm="6" className="vertical-align order-sm-1">
              <Login></Login>
            </Col>
            <Col sm="6" className="lflex-container order-sm-2"></Col>
          </Row>
        </Container>
        <Footer></Footer>
      </Fragment>
    );
  }
}
export default LoginPage;
