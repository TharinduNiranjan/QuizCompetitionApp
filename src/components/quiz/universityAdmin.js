import React, { Component } from "react";
import QAdmin from "./questionAdmin";

class UniversityAdmin extends Component {
  render() {
    return (
      <div>
        <QAdmin collection="seniorQuestions"></QAdmin>
      </div>
    );
  }
}
export default UniversityAdmin;
