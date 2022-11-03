import { React, useState } from "react";
import { store } from "../../firebase.js";
import { collection, addDoc } from "firebase/firestore";
import "./AddTA.style.css";
import Input from "../Input.js";
import InputCheckbox from "../InputCheckbox.js";

export default function AddTA() {
  const [f_name, setFName] = useState("");
  const [l_name, setLName] = useState("");
  const [ta_type, setType] = useState("");
  const [number, setNumber] = useState("");
  const [section, setSection] = useState([{ section: "" }]);
  const [email, setEmail] = useState("");
  const [enrolled, setEnrolled] = useState(false);
  const [trained, setTrained] = useState(false);
  const [certificate, setCertificate] = useState(false);

  const handleFNameChange = (e) => {
    setFName(e.target.value);
  };

  const handleLNameChange = (e) => {
    setLName(e.target.value);
  };

  const handleINumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  // handle additional sections
  const handleFormChange = (index, event) => {
    let data = [...section];
    data[index] = event.target.value;
    setSection(data);
  };

  // dynamically add section field
  const addSection = () => {
    let newfield = { section: "" };
    setSection([...section, newfield]);
  };

  // fFunction to dynamically remove section field
  const removeSection = (index) => {
    let data = [...section];
    data.splice(index, 1);
    setSection(data);
  };

  const addData = async (data) => {
    try {
      const docRef = await addDoc(collection(store, "ta"), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  };

  // handle submit form. put all values to JSON and send to DB
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("TA has been added to DB");
    const data = {
      first: f_name,
      last: l_name,
      type: ta_type,
      i_number: number,
      courses: section,
      email: email,
      enrolled: enrolled,
      trained: trained,
      certificate: certificate,
    };
    addData(data);
  };

  return (
    <div className="form">
      <div className="form form__title">
        <h1>Add a TA</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          label={"First Name"}
          type={"text"}
          value={f_name}
          onChange={handleFNameChange}
        />
        <Input
          label={"Last Name"}
          type={"text"}
          value={l_name}
          onChange={handleLNameChange}
        />
        <div className="form__input form__input-radio">
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
        <Input
          label={"I-Number"}
          type={"text"}
          value={number}
          onChange={handleINumberChange}
        />
        <Input
          label={"Email"}
          type={"email"}
          value={email}
          onChange={handleEmailChange}
        />
        <InputCheckbox
          label={"Enrolled in Training Course"}
          type={"checkbox"}
          value={enrolled}
          onChange={handleEnrolledChange}
        />
        <InputCheckbox
          label={"Completed Training"}
          type={"checkbox"}
          value={trained}
          onChange={handleTrainingChange}
        />
        <InputCheckbox
          label={"Received Certificate"}
          type={"checkbox"}
          value={certificate}
          onChange={handleCertificateChange}
        />
        <div className="form__input form__input-courses">
          <p>Courses</p>
          {section.map((input, index) => {
            return (
              <div key={index}>
                <input
                  name="section"
                  type="text"
                  placeholder="Section"
                  value={section.section}
                  onChange={(event) => handleFormChange(index, event)}
                />
                <button
                  className="form__button form__button-remove"
                  type="button"
                  onClick={() => removeSection(index)}>
                  Remove
                </button>
              </div>
            );
          })}
        </div>

        <button
          className="form__button form__button-add"
          type="button"
          onClick={addSection}>
          Add more section...
        </button>
        <button
          className="form__button form__button-submit"
          type="submit"
          onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
