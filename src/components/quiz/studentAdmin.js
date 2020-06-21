import React, { Component } from "react";
import QAdmin from "./questionAdmin";

class StudentAdmin extends Component {
  render() {
    return (
      <div>
        <QAdmin collection={process.env.REACT_APP_SENIOR_DB}></QAdmin>
      </div>
    );
  }
}
export default StudentAdmin;
