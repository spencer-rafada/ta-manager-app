import React from "react";

export default function Select({ status, onChange, options }) {
  return (
    <div className="input__select">
      <select value={status} onChange={onChange}>
        {options.map((index) => {
          return <option value={index.value}>{index.title}</option>;
        })}
      </select>
    </div>
  );
}
