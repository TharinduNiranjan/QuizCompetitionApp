import React, { Fragment, Component } from "react";
import "../styles/instruction.scss";
import Navbar, { Footer } from "./Navbar";
import { Row, Container, Col } from "react-bootstrap";
import QuestionColors from "../assets/Ins_questionclrs.png";
import Submitwindow from "../assets/Ins_submit.png";
import PrevNextFlag from "../assets/Ins_prevNextFlag.png";
import TimeUp from "../assets/Ins_timeup.png";
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
            button below the countdown timer. You will be redirected to a login page.
          </p>
          <p>
            2. Enter the given username <em>(eg: jr0001@umora.lk)</em> with the relevant password to enter the competition.
          </p>
          <p>
            3. if you have logged early, you will be redirected to a page that says you to wait until the competition begins. Otherwise, you will be directly sent to the Questions dashboard. Your
            timer will start from the quiz time informed to you.
          </p>
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
          <p>
            7. You can choose one out of the 5 answers for each question by clicking next to the answers and progress to the other questions as intended. Answers can be changed anytime before
            submission. ‘Remove Answer’ button will make the question unanswered.
          </p>
          <p>
            8. The <em>Next</em> button of the last question is the{" "}
            <em>
              <strong>Submit</strong>
            </em>{" "}
            button. When you click the <em>Submit</em> button you will be asked to confirm the submission. You may{" "}
            <em>
              <strong>Submit and Leave</strong>
            </em>
            if you are confident with your answers. Otherwise click on{" "}
            <em>
              <strong>Go Back</strong>
            </em>{" "}
            button and re-check before submission. You will not be given any change to log back in once you click{" "}
            <em>
              <strong>Submit and Leave</strong>
            </em>{" "}
            button.
          </p>
          <img alt="Dashboard Colors" className="instructImages" src={Submitwindow}></img>
          <br></br>
          <br></br>
          <p>9. If you were unable to submit the answers when the timer ends, the answers that you have recorded will be automatically submitted and you will be asked to logout.</p>
          <img alt="Time Up Notification" className="insTimeup" src={TimeUp}></img>
        </div>
      ),
    });
  };
  instruct = () => {
    this.setState({
      content: (
        <div>
          <br></br>
          <h4>Competition Rules</h4>
          <br></br>
          <h5>Junior / Intermediate Categories</h5>
          <p>&#9679; The first round will be held on 28th of June from 1900h to 2030h.</p>
          <p>&#9679; You can login to the online platform between 1830h to 1900h</p>
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
          <p>&#9679; The scoring system for the first round will be as follows</p>
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
            &#9679; 10 percent of the total number of participants selected based on a cutoff mark will advance to the second round. The list of selected participants will be displayed exclusively on
            the official Facebook page of Electronic Club of the Department of Electronic and Telecommunication Engineering of University of Moratuwa<a href="https://www.facebook.com/uom.eclub"></a>
          </p>
          <p>&#9679; Finalists will receive certificates, medals and valuable prizes.</p>
          <p>&#9679; A practice round will be held to help you to get familiarized with the system and the question types.</p>
          <p>
            &#9679; The platform will be open for the practice round on 25th of June from 1400h to 2200h for all the participants. The time for one login will run with a timer of 60 minutes. You will
            be logged out from the session once the 60 minutes is over. You can login again for another session and repeat the procedures until 2200h.
          </p>
          <br></br>
          <br></br>
          <h5>Senior Category</h5>
          <p>&#9679; The first round will be held on 28th of June from 1330h to 1500h.</p>
          <p>&#9679; You can login to the online platform between 1300h to 1330h</p>
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
          <p>&#9679; The scoring system for the first round will be as follows</p>
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
            &#9679; 10 percent of the total number of participants selected based on a cutoff mark will advance to the second round. The list of selected participants will be displayed exclusively on
            the official Facebook page of Electronic Club of the Department of Electronic and Telecommunication Engineering of University of Moratuwa<a href="https://www.facebook.com/uom.eclub"></a>
          </p>
          <p>&#9679; Finalists will receive certificates, medals and valuable prizes.</p>
          <p>&#9679; A practice round will be held to help you to get familiarized with the system and the question types.</p>
          <p>
            &#9679; The platform will be open for the practice round on 25th of June from 1400h to 2200h for all the participants. The time for one login will run with a timer of 60 minutes. You will
            be logged out from the session once the 60 minutes is over. You can login again for another session and repeat the procedures until 2200h.
          </p>
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
