import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import Quiz from "./components/quiz/quiz";
// // import Dashboard from "./components/quiz/dashboard";
// import StudentAdmin from "./components/quiz/studentAdmin";
// import UniversityAdmin from "./components/quiz/universityAdmin";
// import JuniorAdmin from "./components/quiz/juniorAdmin";
import About from "./components/AboutPage";
import Faq from "./components/faq";
import Instruction from "./components/instructions";

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  let started = false;
  let stDate = new Date("june 28, 2020 12:00:00").getTime();
  let now = new Date().getTime();
  if (now > stDate) {
    started = true;
  }
  return (
    <Switch>
      <Route exact path="/" component={started ? LoginPage : Home} />
      <ProtectedRoute path="/quiz" component={Quiz} isAuthenticated={isAuthenticated} isVerifying={isVerifying} />
      <Route path="/login" component={LoginPage} />
      {/* <Route path="/dash" component={Dashboard} /> */}
      <Route path="/about" component={About} />
      {/* <Route path="/admin/students" component={StudentAdmin} />
      <Route path="/admin/university" component={UniversityAdmin} />
      <Route path="/admin/junior" component={JuniorAdmin} /> */}
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
