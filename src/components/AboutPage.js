import React, { Component, Fragment } from "react";
import Navbar, { Footer } from "./Navbar";
import { Row, Container, Col } from "react-bootstrap";
import { Email, CodeSharp, Help, Call, Functions } from "@material-ui/icons";
import { db, storage } from "../firebase/firebase";
import logo from "../assets/png.png";
import UniLogo from "../assets/mora.png";
import eclub from "../assets/eclub.png";
import entc from "../assets/entc.png";
class About extends Component {
  // componentDidMount() {
  //   db.collection("downloads")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         let lang = ls.get("language");
  //         let link = linkref.data()[lang];
  //         // console.log(link);
  //         storage
  //           .ref(link)
  //           .getDownloadURL()
  //           .then((url) => {
  //             this.setState({ english: engurl });
  //           });
  //       });
  //     });
  // }
  render() {
    return (
      <Fragment>
        <Navbar></Navbar>
        <Container>
          <Row>
            <Col sm="6" className="text-center vertical-align">
              <img className="img-fluid logoImage" src={logo} alt="" />
            </Col>
            <Col sm="6" className="pt-sm-5">
              <h2 className="text-center">μMora 2020</h2>
              <p className="text-center">Are you ready to wrack your brains?</p>
              <p className="text-justify">
                The Department of Electronics and Telecommunication Engineering of University of Moratuwa proudly presents, <strong>μMora 2020</strong>, the first-ever island wide online mathematics
                competition to be held in Sri Lanka. 6000+ likeminded individuals from all around the island will compete under three categories: Junior, Intermediate and Senior, to become the best
                brainiac among all!
              </p>
              <p className="text-justify">
                The competition features numerous mathematical problems from some of the most fascinating areas in mathematics. Encouraging young mathematics enthusiasts around the globe, The
                Department of Electronics and Telecommunication Engineering will be taking the competition to the international level in the coming years.
              </p>
              <p className="text-justify">
                μMora 2020 will consist of 2 rounds under each category, and the first round will be held online on the 28th of June 2020. You will be using this platform to enter the competition.
                Please go through the rules and regulations thoroughly before participating.{" "}
              </p>
              <p>Wish you all the best for an experience of a lifetime!</p>
              <div className="text-center mb-4">
                <a className="link special" href="https://bit.ly/%CE%BCMoraRound1QnA" target="_blank">
                  μMora Past Papers
                </a>
              </div>
            </Col>
            <Col sm="12"></Col>
            <Col sm="6">
              <h2 className="text-center">Electronic Club</h2>
              <p className="text-justify">
                Electronics Club, now affectionately known as the E- Club is the official student association of the Department of Electronic and Telecommunication Engineering, University of Moratuwa.
                Established over two decades ago, Electronic Club has grown from strength to strength over the years. Many activities are carried out by the students of the club focusing on community
                service as well as professional development.
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
              <p> Kavindu Nadeeshana</p>
              <p>
                <a href="tel:+94712026460">+94 71 202 6460</a>
              </p>

              <p className="aboutcontact">
                <Functions></Functions> About Questions
              </p>
              <p> Mevan Wijewardena</p>
              <p>
                <a href="tel:+94702361378">+94 70 236 1378</a>
              </p>
            </Col>
            <Col sm="6" md="4">
              <p className="aboutcontact">
                <Help></Help> Platform Support
              </p>
              <p> Tharindu Niranjan</p>
              <p>
                <a href="tel:+94712400147">+94 71 240 0147</a>
              </p>

              <p className="aboutcontact">
                <CodeSharp></CodeSharp> Technical Support
              </p>
              <p> Pulasthi Ekanayake</p>
              <p>
                <a href="tel:+94723715922">+94 72 371 5922</a>
              </p>
            </Col>
            <Col sm="6" md="4">
              <p className="aboutcontact">
                <Email></Email> Email
              </p>
              <p>
                <a href="mailto:electronicclubuom@gmail.com">electronicclubuom@gmail.com</a>
              </p>
            </Col>
          </Row>
        </Container>
        <Footer></Footer>
      </Fragment>
    );
  }
}

export default About;
