import React from "react";
import "./InputOption.css";

function InputOption({ Icon, title, color, action }) {
  return (
    <div className="inputOption" onClick={action}>
      <Icon style={{ color: color }} />
      <h4>{title}</h4>
    </div>
  );
}

export default InputOption;