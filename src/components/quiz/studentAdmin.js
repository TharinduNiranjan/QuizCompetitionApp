import React, { Component } from "react";
import QAdmin from "./questionAdmin";

class StudentAdmin extends Component {
  render() {
    return (
      <div>
        <QAdmin collection="questions"></QAdmin>
      </div>
    );
  }
}
export default StudentAdmin;
