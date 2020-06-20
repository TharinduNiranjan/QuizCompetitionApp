import React, { Component } from "react";
import QAdmin from "./questionAdmin";

class JuniorAdmin extends Component {
  render() {
    return (
      <div>
        <QAdmin collection="juniorQuestions"></QAdmin>
      </div>
    );
  }
}
export default JuniorAdmin;
