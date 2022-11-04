import React from "react";

export default function InputCheckbox({ label, type, value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <input type={type} checked={value} onChange={onChange} />
      <br></br>
    </div>
  );
}
