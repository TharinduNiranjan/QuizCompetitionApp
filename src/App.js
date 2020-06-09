import React from "react";

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import Quiz from './components/Quiz'
function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      <Route exact path='/' component={Home}/>
      <ProtectedRoute
        exact
        path="/quizcompetition/quiz"
        component={Quiz}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path="/quizcompetition/login" component={Login} />
    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}

export default connect(mapStateToProps)(App);
