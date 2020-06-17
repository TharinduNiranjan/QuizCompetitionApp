import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./components/login/auth/protectedRoute";
import Home from "./components/home/Home";
import Login from "./components/login/loginpage";
import Quiz from "./components/quiz/quiz";
import Dashboard from "./components/quiz/dashboard";
import QAdmin from "./components/quiz/questionAdmin";
function App(props) {
  const { isAuthenticated, isVerifying } = props;
  console.log(props);
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <ProtectedRoute path="/quizcompetition/quiz" component={Quiz} isAuthenticated={isAuthenticated} isVerifying={isVerifying} />
      <Route path="/quizcompetition/login" component={Login} />
      <Route path="/quizcompetition/dash" component={Dashboard} />
      <Route path="/quizcompetition/admin" component={QAdmin} />
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
