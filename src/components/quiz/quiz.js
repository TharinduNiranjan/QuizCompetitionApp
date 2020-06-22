import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/";
import Dashboard from "../quiz/dashboard";
import Navbar from "../Navbar";
class Quiz extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };
  render() {
    const { isLoggingOut, logoutError, isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return (
        <Fragment>
          <div className="desktop-only">
            <Navbar></Navbar>
          </div>
          {/* <button onClick={this.handleLogout}>Logout</button> */}
          {isLoggingOut && <p>Logging Out....</p>}
          {logoutError && <p>Error logging out</p>}
          <Dashboard></Dashboard>
          {/* <Footer></Footer> */}
        </Fragment>
      );
    }
  }
}
function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
    isAuthenticated: state.auth.isAuthenticated,
  };
}
export default connect(mapStateToProps)(Quiz);
