import React, { Fragment, Component } from "react";
import "../styles/faq.scss";
import Navbar, { Footer } from "./Navbar";
import { Container } from "react-bootstrap";
import Accordion from "./FAQ/Accordion";
import AccordionItem from "./FAQ/AccordionItem";
import "../styles/Accordion.scss";

class Faq extends Component {
  render() {
    const Content = () => <p>Once you get registered you will receive a confirmation email with your response attached</p>;
    const Content2 = () => (
      <div>
        <p>
          {" "}
          The competition will be held <b>under three</b> categories
        </p>
        <p style={{ paddingLeft: "2%" }}>
          {" "}
          &#9824; Senior - Students who are currently enrolled as undergraduates in a university and are still under the age of 28 (<b>as of June 2020</b>)
        </p>
        <p style={{ paddingLeft: "2%" }}>
          {" "}
          &#9824; Intermediate - Students in A/L classes(<b>2020,2021 A/Ls</b>) and students expecting university entrance (<b>2018,2019 A/Ls</b>)
        </p>
        <p style={{ paddingLeft: "2%" }}>
          {" "}
          &#9824; Junior - Students just after O/Ls (<b>2019 O/Ls</b>) and students in O/L classes and under
        </p>
      </div>
    );
    const Content3 = () => <p> You will receive your user credentials via an email.</p>;
    const Content4 = () => (
      <p>
        {" "}
        We will use these groups to send updates about the competition as it is more feasible than emails. During the competition competitors can use these groups to inform their issues related to
        competition and online platform.
      </p>
    );
    const Content5 = () => (
      <p>
        {" "}
        Don't worry we will send emails with updates to everyone who got registered to the competition. You will receive a contact number of one of our organizers to solve issues of the competition.
      </p>
    );
    const Content6 = () => (
      <p>
        {" "}
        We will select the <b> top 10% </b>of the contestants who got higher scores to the next round.
      </p>
    );
    const Content7 = () => (
      <p>
        {" "}
        <b> Yes. </b>You will be able to access our online platform using your user credentials and familiarize with it. And also we will provide sample questions from each category which will be
        helpful to understand the structure of the questions asked.
      </p>
    );
    const Content8 = () => (
      <div>
        <p>
          {" "}
          There will be <b>3 rounds</b> for each category.
        </p>
        <p style={{ paddingLeft: "2%" }}>
          {" "}
          &#9824; For both <b>first round </b> and <b>second round </b>contestants will be given <b>30 Multiple Choice Questions. </b>
        </p>
        <p style={{ paddingLeft: "2%" }}>
          {" "}
          &#9824; <b>Top 10%</b> of the contestants from the <b>first round</b> will be qualified to the <b>second round.</b>
        </p>
        <p style={{ paddingLeft: "2%" }}>
          {" "}
          &#9824; <b>Top 10</b> contestants from the <b>second round</b> will be qualified for the <b>third and final</b> round.{" "}
        </p>
        <p style={{ paddingLeft: "2%" }}>
          {" "}
          &#9824; <b> Third</b> round will contain essay type questions.
        </p>
      </div>
    );
    const Content9 = () => <p> All the contestants who will be qualified to the second round will receive participation certificates.</p>;
    return (
      <Fragment>
        <Navbar></Navbar>
        <Container className="instructions min80">
          <h2>Frequently Asked Questions</h2>
          <Accordion atomic={true}>
            <AccordionItem title="How do I know that I have successfully registered ?">
              <Content />
            </AccordionItem>
            <AccordionItem title="What are the age categories in the competition ?">
              <Content2 />
            </AccordionItem>
            <AccordionItem title="How can I get my user credentials for the online platform ?">
              <Content3 />
            </AccordionItem>
            <AccordionItem title="What is the purpose of the Whatsapp groups which competitors have been added to ?">
              <Content4 />
            </AccordionItem>
            <AccordionItem title="I don't have a Whatsapp account. How can I get updates about the competition and how can I solve the issues of the competition ?">
              <Content5 />
            </AccordionItem>
            <AccordionItem title="How many contestants will get selected to the next round ?">
              <Content6 />
            </AccordionItem>
            <AccordionItem title="Will there be a test round for the competition?">
              <Content7 />
            </AccordionItem>
            <AccordionItem title="How many rounds will there be for uMora 2020 ?">
              <Content8 />
            </AccordionItem>
            <AccordionItem title="Who will get Participation Certificates ?">
              <Content9 />
            </AccordionItem>
          </Accordion>
        </Container>
        <Footer></Footer>
      </Fragment>
    );
  }
}
export default Faq;
