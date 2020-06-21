import React, { Fragment, Component } from "react";
import "../styles/faq.scss";
import Accordion from "./FAQ/Accordion";
import AccordionItem from "./FAQ/AccordionItem";
import { Navbar, Footer } from "./Navbar";
import "../styles/Accordion.scss";
import { Container } from "react-bootstrap";

class Faq extends Component {
  render() {
    const DummyContent = () => <p>We haven't got to this part yet</p>;
    const DummyContent2 = () => <p>Sorry you had to see this </p>;
    return (
      <Fragment>
        <Navbar></Navbar>
        <Container className="instructions">
          <Accordion atomic={true}>
            <AccordionItem title="Question 01">
              <DummyContent />
            </AccordionItem>
            <AccordionItem title="Question 02">
              <DummyContent2 />
            </AccordionItem>
            <AccordionItem title="Question 03">
              <DummyContent />
            </AccordionItem>
          </Accordion>
        </Container>
        <Footer></Footer>
      </Fragment>
    );
  }
}
export default Faq;
