import React from "react";
import "./Input.style.css";

export default function Input({ label, type, value, onChange }) {
  return (
    <div className="input">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={`Your ${label}...`}
        required
        onChange={onChange}
      />
      <br></br>
    </div>
  );
}
