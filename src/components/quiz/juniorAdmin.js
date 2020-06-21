import React, { Component } from "react";
import QAdmin from "./questionAdmin";

class JuniorAdmin extends Component {
  render() {
    return (
      <div>
        <QAdmin collection={process.env.REACT_APP_JUNIOR_DB}></QAdmin>
      </div>
    );
  }
}
export default JuniorAdmin;
