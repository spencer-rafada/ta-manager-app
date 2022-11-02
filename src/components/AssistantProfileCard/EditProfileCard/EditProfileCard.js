import { React, useState } from "react";
import { store } from "../../../firebase.js";
import { doc, updateDoc } from "firebase/firestore";

export default function EditProfileCard({ data, setState }) {
  const [first, setFirst] = useState(data.first);
  const [last, setLast] = useState(data.last);
  const [ta_type, setType] = useState(data.type);
  const [number, setNumber] = useState(data.i_number);
  const [enrolled, setEnrolled] = useState(data.enrolled);
  const [trained, setTrained] = useState(data.trained);
  const [certificate, setCertificate] = useState(data.certificate);

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

  const handleEnrolledChange = () => {
    setEnrolled(!enrolled);
  };

  const handleTrainingChange = () => {
    setTrained(!trained);
  };

  const handleCertificateChange = () => {
    setCertificate(!certificate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(store, "ta", data.id);
    await updateDoc(docRef, {
      first: first,
      last: last,
      type: ta_type,
      i_number: number,
      enrolled: enrolled,
      certificate: certificate,
      trained: trained,
      // TODO: continue this part -> add sections
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
        <div>
          <label>Enrolled in Training Course</label>
          <input
            type="checkbox"
            checked={enrolled}
            onChange={handleEnrolledChange}
          />
        </div>
        <div>
          <label>Completed Training</label>
          <input
            type="checkbox"
            checked={trained}
            onChange={handleTrainingChange}
          />
        </div>
        <div>
          <label>Received Certificate</label>
          <input
            type="checkbox"
            checked={certificate}
            onChange={handleCertificateChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
