import React from "react";
import Trash from "../../../img/red-trash.svg";

// Still buggy
export default function Delete({ index, onClick }) {
  return (
    <button
      className="form__button form__button-remove"
      type="button"
      onClick={onClick(index)}>
      <img src={Trash} alt="trash"></img>
    </button>
  );
}
