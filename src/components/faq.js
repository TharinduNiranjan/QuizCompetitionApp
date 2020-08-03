import React, { Fragment, Component } from "react";
import "../styles/faq.scss";
import Navbar, { Footer } from "./Navbar";
import { Container } from "react-bootstrap";
import Accordion from "./FAQ/Accordion";
import AccordionItem from "./FAQ/AccordionItem";
import "../styles/Accordion.scss";
import QuestionColors from "../assets/Ins_questionclrs.png";
import Submitwindow from "../assets/Ins_submit.png";
import PrevNextFlag from "../assets/Ins_prevNextFlag.png";
import TimeUp from "../assets/Ins_timeup.png";

class Faq extends Component {
  render() {
    const ContentA = () => (
      <div>
        <br></br>
        <h4>Common Guidelines</h4>
        <br></br>
        <p>1. You can use any single device including personal computers, laptops, tablets or smartphones to login to the online platform multiple times. Multiple devices are not allowed.</p>
        <p>2. A stable internet connection is recommended throughout the competition since the organizing committee is not responsible for any connectivity issues.</p>
        <p>3. Only one submission is accepted. Answer all the questions you desire before submitting.</p>
        <p>4. The decision of the judge panel would be the final.</p>
        <br></br>
        <h4>Platform Guidelines</h4>
        <br></br>
        <p>
          1. Click on the{" "}
          <em>
            <strong>Test Round</strong>
          </em>{" "}
          button below the countdown timer. You will be redirected to a login page.<br></br>
          <strong> On the day of the competition the home page will be the login page</strong>
        </p>
        <p>
          2. Enter the given username <em>(eg: jr0001@umora.lk)</em> with the relevant password and select your medium for the competition as English, Sinhala or Tamil from the dropdown menu. This option is not available for the Senior Category. Then click login to enter the competition.
        </p>
        <p>3. If you have logged early, you will be redirected to a page that tells you to wait until the competition begins. Otherwise, you will be directly sent to the Questions dashboard. Your timer will start from the quiz time informed to you.</p>
        <p>
          4. On the bottom, there are{" "}
          <em>
            <strong>Prev</strong>
          </em>{" "}
          and{" "}
          <em>
            <strong>Next</strong>
          </em>{" "}
          buttons to switch between concurrent questions. The{" "}
          <em>
            <strong>Flag</strong>
          </em>{" "}
          button can be used to flag any important question the user may intend to refer later.
        </p>
        <img alt="Prev Next Flag Buttons" className="insbottom" src={PrevNextFlag}></img>
        <br></br>
        <br></br>
        <p>5. On top of the page, a question dashboard will be there to switch between any question as preferred. The colors of the buttons are indicated as follows.</p>
        <img alt="Dashboard Colors" className="insDashClrs" src={QuestionColors}></img>
        <br></br>
        <br></br>
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

        <p>6. The category label will be displayed next to the question number and its color will differ according to the complexity of the question (easy, medium, hard).</p>
        <p>7. You can choose one out of the 5 answers for each question by clicking next to the answers and progress to the other questions as intended. Answers can be changed anytime before submission. ‘Remove Answer’ button will make the question unanswered.</p>
        <p>
          8. The <em>Next</em> button of the last question is the{" "}
          <em>
            <strong>Submit</strong>
          </em>{" "}
          button. When you click the <em>Submit</em> button you will be asked to confirm the submission. You may{" "}
          <em>
            <strong>Submit and Leave </strong>
          </em>
          if you are confident with your answers. Otherwise click on{" "}
          <em>
            <strong>Go Back</strong>
          </em>{" "}
          button and re-check before submission. You will not be given any chance to log back in once you click{" "}
          <em>
            <strong>Submit and Leave </strong>
          </em>{" "}
          button.
        </p>
        <img alt="Dashboard Colors" className="instructImages" src={Submitwindow}></img>
        <br></br>
        <br></br>
        <p>9. If you were unable to submit the answers when the timer ends, the answers that you have recorded will be automatically submitted and you will be asked to logout.</p>
        <img alt="Time Up Notification" className="insTimeup" src={TimeUp}></img>
      </div>
    );
    const ContentB = () => (
      <div>
        <br></br>
        <h4>Competition Rules</h4>
        <p></p>
        <h6>Note: All the times stated below are in +5.30 GMT</h6>
        <br></br>
        <h5>Junior / Intermediate Categories</h5>
        <p>&#9679; The first round will be held on 28th of June from 1900h to 2030h.</p>
        <p>&#9679; You can login to the online platform between 1830h to 1900h.</p>
        <p>&#9679; You will be given 90 minutes to complete the round.</p>
        <p>&#9679; Any participant who joins in the middle of the competition will only receive the time remaining until 2030h.</p>
        <p>&#9679; You can select the preferred medium as Sinhala, Tamil or English.</p>
        <p>&#9679; There will be 30 multiple choice questions with 5 choices per each question.</p>
        <p>&#9679; The problems in junior and intermediate categories will be mostly based on,</p>
        <p style={{ paddingLeft: "4%" }}>
          {" "}
          &#9676; <b>Basic algebra (algebraic expressions, inequalities etc.)</b>
        </p>
        <p style={{ paddingLeft: "4%" }}>
          {" "}
          &#9676; <b>Simple number theory (problems on remainders and divisibility)</b>
        </p>
        <p style={{ paddingLeft: "4%" }}>
          {" "}
          &#9676; <b>Geometry</b>
        </p>
        <p style={{ paddingLeft: "4%" }}>
          {" "}
          &#9676; <b>Counting problems</b>
        </p>
        <p style={{ paddingLeft: "4%" }}>
          {" "}
          &#9676; <b>Logic problems</b>
        </p>
        <p>&#9679; The scoring system for the first round will be as follows.</p>
        <table className="instructTable">
          <thead>
            <tr>
              <th>Category</th>
              <th>Correct Answer</th>
              <th>No Answer</th>
              <th>Wrong Answer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Easy</th>
              <td>2</td>
              <td>0</td>
              <td>-1</td>
            </tr>
            <tr>
              <th>Medium</th>
              <td>3</td>
              <td>0</td>
              <td>-1</td>
            </tr>
            <tr>
              <th>Hard</th>
              <td>5</td>
              <td>0</td>
              <td>-2</td>
            </tr>
          </tbody>
        </table>
        <br></br>
        <p>
          &#9679; 10 percent of the total number of participants selected based on a cutoff mark will advance to the second round. The list of selected participants will be displayed exclusively on the <a href="https://www.facebook.com/uom.eclub">official Facebook page</a> of Electronic Club of the Department of Electronic and Telecommunication Engineering of University of Moratuwa.
        </p>
        <p>&#9679; Finalists will receive certificates, medals and valuable prizes.</p>
        <p>&#9679; A practice round will be held to help you to get familiarized with the system and the question types.</p>
        <p>&#9679; The platform will be open for the practice round on 25th of June from 1400h to 2200h for all the participants. The time for one login will run with a timer of 60 minutes. You will be logged out from the session once the 60 minutes is over. You can login again for another session and repeat the procedures until 2200h.</p>
        <br></br>
        <br></br>
        <h5>Senior Category</h5>
        <p>&#9679; The first round will be held on 28th of June from 1330h to 1500h.</p>
        <p>&#9679; You can login to the online platform between 1300h to 1330h.</p>
        <p>&#9679; You will be given 90 minutes to complete the round.</p>
        <p>&#9679; Any participant who joins in the middle of the competition will only receive the time remaining until 1500h.</p>
        <p>&#9679; Competition will be held in English.</p>
        <p>&#9679; There will be 30 multiple choice questions with 5 choices per each question.</p>
        <p>&#9679; The problems in junior and intermediate categories will be mostly based on,</p>
        <p style={{ paddingLeft: "4%" }}>
          {" "}
          &#9676; <b>Algebra (inequalities, polynomials, sequences)</b>
        </p>
        <p style={{ paddingLeft: "4%" }}>
          {" "}
          &#9676; <b> Simple number theory (problems on divisibility, remainders)</b>
        </p>
        <p style={{ paddingLeft: "4%" }}>
          {" "}
          &#9676; <b>Counting problems</b>
        </p>
        <p style={{ paddingLeft: "4%" }}>
          {" "}
          &#9676; <b>Permutations and combinations</b>
        </p>
        <p style={{ paddingLeft: "4%" }}>
          {" "}
          &#9676; <b>Problems on simple games</b>
        </p>
        <p style={{ paddingLeft: "4%" }}>
          {" "}
          &#9676; <b>Geometry</b>
        </p>
        <p style={{ paddingLeft: "4%" }}>
          {" "}
          &#9676; <b>Logic problems</b>
        </p>
        <p>&#9679; The scoring system for the first round will be as follows.</p>
        <table className="instructTable">
          <thead>
            <tr>
              <th>Category</th>
              <th>Correct Answer</th>
              <th>No Answer</th>
              <th>Wrong Answer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Easy</th>
              <td>2</td>
              <td>0</td>
              <td>-1</td>
            </tr>
            <tr>
              <th>Medium</th>
              <td>3</td>
              <td>0</td>
              <td>-1</td>
            </tr>
            <tr>
              <th>Hard</th>
              <td>5</td>
              <td>0</td>
              <td>-2</td>
            </tr>
          </tbody>
        </table>
        <br></br>
        <p>
          &#9679; 10 percent of the total number of participants selected based on a cutoff mark will advance to the second round. The list of selected participants will be displayed exclusively on the <a href="https://www.facebook.com/uom.eclub">official Facebook page</a> of Electronic Club of the Department of Electronic and Telecommunication Engineering of University of Moratuwa.
        </p>
        <p>&#9679; Finalists will receive certificates, medals and valuable prizes.</p>
        <p>&#9679; A practice round will be held to help you to get familiarized with the system and the question types.</p>
        <p>&#9679; The platform will be open for the practice round on 25th of June from 1400h to 2200h for all the participants. The time for one login will run with a timer of 60 minutes. You will be logged out from the session once the 60 minutes is over. You can login again for another session and repeat the procedures until 2200h.</p>
      </div>
    );
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
    const Content4 = () => <p> We will use these groups to send updates about the competition as it is more feasible than emails. During the competition competitors can use these groups to inform their issues related to competition and online platform.</p>;
    const Content5 = () => <p> Don't worry we will send emails with updates to everyone who got registered to the competition. You will receive a contact number of one of our organizers to solve issues of the competition.</p>;
    const Content6 = () => (
      <p>
        {" "}
        We will select the <b> top 10% </b>of the contestants who got higher scores to the next round.
      </p>
    );
    const Content7 = () => (
      <p>
        {" "}
        <b> Yes. </b>You will be able to access our online platform using your user credentials and familiarize with it. And also we will provide sample questions from each category which will be helpful to understand the structure of the questions asked.
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
          <br></br>
          <Accordion atomic={true}>
            <AccordionItem title="IMPORTANT! How to use the uMora Platform?" className="red-text">
              <ContentA />
            </AccordionItem>
            <AccordionItem title="IMPORTANT! Competition Rules" className="red-text">
              <ContentB />
            </AccordionItem>
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
