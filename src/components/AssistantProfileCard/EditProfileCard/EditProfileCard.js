import { React, useState } from "react";
import { store } from "../../../firebase.js";
import { doc, updateDoc } from "firebase/firestore";

export default function EditProfileCard({ data, setState }) {
  const [first, setFirst] = useState(data.first);
  const [last, setLast] = useState(data.last);
  const [ta_type, setType] = useState(data.type);
  const [number, setNumber] = useState(data.i_number);

  const handleFirstChange = (e) => {
    setFirst(e.target.value);
  };
  const handleLastChange = (e) => {
    setLast(e.target.value);
  };
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    const docRef = doc(store, "ta", data.id);
    await updateDoc(docRef, {
      first: first,
      last: last,
      type: ta_type,
      i_number: number,
      // TODO: continue this part
    });
    alert("TA has been edited.");
  };

  return (
    <div>
      <div>EditProfileCard</div>
      <button type="button" onClick={setState}>
        Return
      </button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input value={first} type={"text"} onChange={handleFirstChange} />
        </div>
        <div>
          <label>Last Name</label>
          <input value={last} type={"text"} onChange={handleLastChange} />
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="IL"
              checked={ta_type === "IL"}
              onChange={handleTypeChange}
            />
            IL-TA
          </label>
          <label>
            <input
              type="radio"
              value="CM"
              checked={ta_type === "CM"}
              onChange={handleTypeChange}
            />
            CM-TA
          </label>
        </div>
        <div>
          <label>I-Number</label>
          <input value={number} type={"text"} onChange={handleNumberChange} />
        </div>
        {/* TODO: add more fields here */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
