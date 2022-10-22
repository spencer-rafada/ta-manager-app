import React from "react";

export default function Input({ label, type, value, onChange }) {
  return (
    <div>
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
