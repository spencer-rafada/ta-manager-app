import { React, useState } from "react";
import { store } from "../../../firebase.js";
import { doc, updateDoc } from "firebase/firestore";
import Input from "../../form/Input/Input.js";
import InputCheckbox from "../../form/InputCheckBox/InputCheckbox.js";

export default function EditProfileCard({ data, setState, semester }) {
  const [first, setFirst] = useState(data.first);
  const [last, setLast] = useState(data.last);
  const [ta_type, setType] = useState(data.type);
  const [number, setNumber] = useState(data.i_number);
  const [enrolled, setEnrolled] = useState(data.enrolled);
  const [trained, setTrained] = useState(data.trained);
  const [certificate, setCertificate] = useState(data.certificate);
  const [courses, setCourses] = useState(data.courses);

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

  // Handling Section
  const handleFormChange = (index, e) => {
    let data = [...courses];
    data[index] = e.target.value;
    setCourses(data);
    // console.log(`Input Change ${courses}`);
  };

  const addSection = () => {
    let data = [...courses, ""];
    setCourses(data);
    // console.log(`Adding Section ${courses}`);
  };

  const removeSection = (index) => {
    let new_courses = [...courses];
    new_courses.splice(index, 1);
    setCourses(new_courses);
    // console.log(`Removing Section ${courses}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(store, semester, data.id);
    await updateDoc(docRef, {
      first: first,
      last: last,
      type: ta_type,
      i_number: number,
      enrolled: enrolled,
      certificate: certificate,
      trained: trained,
      courses: courses,
    });
    alert("TA has been edited.");
  };

  return (
    <div className="profile-card__form-edit">
      <button
        className="form-edit__button form-edit__button-edit"
        type="button"
        onClick={setState}>
        Return
      </button>
      <form onSubmit={handleSubmit}>
        <Input
          label={"First Name"}
          value={first}
          type={"text"}
          placeholder={""}
          onChange={handleFirstChange}
        />
        <Input
          label={"Last Name"}
          value={last}
          type={"text"}
          placeholder={""}
          onChange={handleLastChange}
        />
        <div className="form-edit__input form-edit__input-radio">
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
          value={number}
          type={"text"}
          placeholder={""}
          onChange={handleNumberChange}
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
        <div className="form-edit__input form-edit__input-courses">
          {courses.map((input, index) => {
            return (
              <div key={index}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => handleFormChange(index, e)}
                />
                <button
                  className="form-edit__button form-edit__button-remove"
                  type="button"
                  onClick={() => removeSection(index)}>
                  Remove
                </button>
              </div>
            );
          })}
        </div>
        <button
          className="form-edit__button form-edit__button-add"
          type="button"
          onClick={addSection}>
          Add more section...
        </button>
        <button
          className="form-edit__button form-edit__button-submit"
          type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
