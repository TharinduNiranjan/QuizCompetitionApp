import React, { Component, Fragment } from "react";
import Navbar from "./Navbar";
import { Footer } from "./Navbar";
import { storage } from "../firebase/firebase";
import { Row, Container, Col } from "react-bootstrap";
import err_certificate from "../assets/placeholder.gif";
import placeholder from "../assets/placehold.gif";
import logo from "../assets/png.png";
import UniLogo from "../assets/mora.png";
import eclub from "../assets/eclub.png";
import entc from "../assets/entc.png";

class Certificate extends Component {
  constructor(props) {
    super(props);
    this.state = { cert_image: placeholder, error: false, message: "", cert_id: "#", value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    // gs://umoraquiz.appspot.com/certificates/MathsCards.gif
    let urlparam = this.props.match.params.id.split(".")[0].toUpperCase();
    let id = "certificates/" + urlparam + ".png";
    storage
      .ref(id)
      .getDownloadURL()
      .then((url) => {
        this.setState({ cert_image: url, cert_id: urlparam });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: true, message: error.message_ });
        return;
      });
    this.setState({ id: id });
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    let urlparam = this.state.value.split(".")[0].toUpperCase();
    this.props.history.push(`/certificate/${urlparam}`);
    let id = "certificates/" + urlparam + ".png";
    // console.log("submit acecesed");
    storage
      .ref(id)
      .getDownloadURL()
      .then((url) => {
        // console.log("storage acecesed");
        this.setState({ cert_image: url, cert_id: urlparam, error: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: true, message: error.message_ });
        return;
      });
    event.preventDefault();
  }
  render() {
    if (this.state.error) {
      return (
        <Fragment>
          <Navbar></Navbar>
          <Container fluid>
            <div className="row">
              <div className="col-md-6 CertificateERColumn">
                <img className="img-fluid err" src={err_certificate} alt="certificate"></img>
              </div>
              <div className="col-md-6 certERDescriptionColumn">
                <div id="CEresultsbox ">
                  <p id="CE-congrats">ERROR !</p>
                  <p id="CE-desc-err" className="text-center">
                    Please enter a valid Certificate ID
                  </p>
                  <form className="row mb-4 p-2" onSubmit={this.handleSubmit}>
                    <input className="col-9" type="text" value={this.state.value} onChange={this.handleChange} />
                    <input className="button col-3 px-0" type="submit" value="Check" />
                  </form>

                  <div id="C_clublogos">
                    <img src={logo} alt="uMora" className="C_organizinglogos"></img>
                    <img src={eclub} alt="eclub" className="C_organizinglogos"></img>
                    <img src={entc} alt="entc" className="C_organizinglogos"></img>
                    <img src={UniLogo} alt="University of Moratuwa" className="C_organizinglogos"></img>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <Footer></Footer>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Navbar></Navbar>
          <Container fluid>
            <div className="row">
              <div className="col-md-6 order-sm-1 CertificateColumn">
                <img alt="Certificate" className="img-fluid certificate" src={this.state.cert_image}></img>
              </div>
              <div className="col-md-6 order-sm-2 certDescriptionColumn">
                <div id="resultsbox">
                  <div id="C_clublogos">
                    <img src={logo} alt="uMora" className="C_organizinglogos"></img>
                    <img src={eclub} alt="eclub" className="C_organizinglogos"></img>
                    <img src={entc} alt="entc" className="C_organizinglogos"></img>
                    <img src={UniLogo} alt="University of Moratuwa" className="C_organizinglogos"></img>
                  </div>
                  <p id="C-congrats">WELCOME</p>
                  <p id="C-desc">uMora Certificate Validation </p>
                  <div id="awards">
                    <p className="text-left">
                      Merit Awards - Students qualified for the second round<br></br>
                      Finalists - Students qualified for the final round<br></br>
                      Medalists - Students obtained Medals from final round{" "}
                    </p>
                  </div>

                  <div id="cert-id">
                    Certificate ID : <span>{this.state.cert_id}</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <Footer></Footer>
        </Fragment>
      );
    }
  }
}
export default Certificate;
