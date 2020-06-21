import React, { Component } from "react";
import QAdmin from "./questionAdmin";

class UniversityAdmin extends Component {
  render() {
    return (
      <div>
        <QAdmin collection={process.env.REACT_APP_SUPERSENIOR_DB}></QAdmin>
      </div>
    );
  }
}
export default UniversityAdmin;
