import React from "react";
import "./InputCheckbox.css";

export default function InputCheckbox({ label, type, value, onChange }) {
  return (
    <div className="input__checkbox">
      <input type={type} checked={value} onChange={onChange} />
      <label>{label}</label>
      <br></br>
    </div>
  );
}
