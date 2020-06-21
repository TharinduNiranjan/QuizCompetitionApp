import React, { Component, Fragment } from "react";
import { Navbar, Footer } from "./Navbar";
import { Row, Container, Col } from "react-bootstrap";
import { Email, CodeSharp, Help, Call, Functions } from "@material-ui/icons";
import logo from "../assets/png.png";
import UniLogo from "../assets/mora.png";
import eclub from "../assets/eclub.png";
import entc from "../assets/entc.png";
import "./about.css";
class About extends Component {
  render() {
    return (
      <Fragment>
        <Navbar></Navbar>
        <Container>
          <Row>
            <Col sm="6" className="text-center vertical-align">
              <img className="img-fluid logoImage" src={logo} alt="" />
            </Col>
            <Col sm="6">
              <h2>μMora 2020</h2>
              <p>
                Electronics Club, now affectionately known as the Electronic Club is the official student association of the Department of Electronic and Telecommunication Engineering, University of
                Moratuwa. Established over two decades ago, Electronic Club has grown from strength to strength over the years. Many activities are carried out by the students of the club focusing on
                community service as well as professional development. Electronics Club, now affectionately known as the Electronic Club is the official student association of the Department of
                Electronic and Telecommunication Engineering, University of Moratuwa.
              </p>
            </Col>
            <Col sm="6">
              <h2>Electronic Club</h2>
              <p>
                Electronics Club, now affectionately known as the Electronic Club is the official student association of the Department of Electronic and Telecommunication Engineering, University of
                Moratuwa. Established over two decades ago, Electronic Club has grown from strength to strength over the years. Many activities are carried out by the students of the club focusing on
                community service as well as professional development.
              </p>
            </Col>
            <Col sm="6" className="vertical-align">
              <div id="clublogos">
                <img src={eclub} alt="eclub" className="organizinglogos img-fluid "></img>
                <img src={entc} alt="entc" className="organizinglogos img-fluid "></img>
                <img src={UniLogo} alt="university of Moratuwa" className="organizinglogos img-fluid "></img>
              </div>
            </Col>
          </Row>
          <h2 className="mt-4">Contact Us</h2>
          <Row className="nbparas">
            <Col sm="6" md="4">
              <p className="aboutcontact">
                <Call></Call> About Competition
              </p>
              <p>+94 71 202 6460</p>
              <p> Kavindu Nadeeshana</p>

              <p className="aboutcontact">
                <Functions></Functions> About Questions
              </p>
              <p>+94 70 236 1378</p>
              <p> Mevan Wijewardena</p>
            </Col>
            <Col sm="6" md="4">
              <p className="aboutcontact">
                <Help></Help> Technical Support
              </p>
              <p>+94 72 371 5922</p>
              <p> Pulasthi Ekanayake</p>
              <p className="aboutcontact">
                <CodeSharp></CodeSharp> Platform Support
              </p>
              <p>+94 71 240 0147</p>
              <p> Tharindu Niranjan</p>
            </Col>
            <Col sm="6" md="4">
              <p className="aboutcontact">
                <Email></Email> Email
              </p>
              <p>electronicclubuom@gmail.com</p>
            </Col>
          </Row>
        </Container>
        <Footer></Footer>
      </Fragment>
    );
  }
}

export default About;
