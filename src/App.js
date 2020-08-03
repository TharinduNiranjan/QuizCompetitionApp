import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import Quiz from "./components/quiz/quiz";
import Results from "./components/Results";
import Certificate from "./components/Certificate";
import StudentAdmin from "./components/quiz/studentAdmin";
import UniversityAdmin from "./components/quiz/universityAdmin";
import JuniorAdmin from "./components/quiz/juniorAdmin";
import About from "./components/AboutPage";
import Faq from "./components/faq";
import Instruction from "./components/instructions";
import MultiFileUpload from "./components/FinalRound/multipleFileUpload";
function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <ProtectedRoute path="/quiz" component={Quiz} isAuthenticated={isAuthenticated} isVerifying={isVerifying} />
      <Route path="/finals" component={MultiFileUpload} />
      <Route path="/results" component={Results} />
      <Route path="/login" component={LoginPage} />
      <Route path="/certificate/:id" component={Certificate} />
      <Route path="/about" component={About} />
      <Route path="/admin/students" component={StudentAdmin} />
      <Route path="/admin/university" component={UniversityAdmin} />
      <Route path="/admin/test" component={JuniorAdmin} />
      <Route path="/instructions" component={Instruction} />
      <Route path="/faq" component={Faq} />
      <Redirect from="*" to="" />
      {/* <Route component={() => (<div>404 Not found</div>)} /> */}
    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
  };
}

export default connect(mapStateToProps)(App);
