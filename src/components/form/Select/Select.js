import React from "react";

export default function Select({ semester, onChange, options }) {
  return (
    <div>
      <select value={semester} onChange={onChange}>
        {options.map((index) => {
          return <option value={index.value}>{index.title}</option>;
        })}
      </select>
    </div>
  );
}
