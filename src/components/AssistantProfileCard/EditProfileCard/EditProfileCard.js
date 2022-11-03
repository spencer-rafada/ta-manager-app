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
    const docRef = doc(store, "ta", data.id);
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
    <div className="form-edit">
      <div className="form-edit__title">
        <h1>EditProfileCard</h1>
      </div>
      <button
        className="form-edit__input form-edit__button"
        type="button"
        onClick={setState}>
        Return
      </button>
      <form onSubmit={handleSubmit}>
        <div className="form-edit__input form-edit__input-text">
          <label>First Name</label>
          <input value={first} type={"text"} onChange={handleFirstChange} />
        </div>
        <div className="form-edit__input form-edit__input-text">
          <label>Last Name</label>
          <input value={last} type={"text"} onChange={handleLastChange} />
        </div>
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
        <div className="form-edit__input form-edit__input-text">
          <label>I-Number</label>
          <input value={number} type={"text"} onChange={handleNumberChange} />
        </div>
        <div className="form-edit__input form-edit__input-checkbox">
          <label>Enrolled in Training Course</label>
          <input
            type="checkbox"
            checked={enrolled}
            onChange={handleEnrolledChange}
          />
        </div>
        <div className="form-edit__input form-edit__input-checkbox">
          <label>Completed Training</label>
          <input
            type="checkbox"
            checked={trained}
            onChange={handleTrainingChange}
          />
        </div>
        <div className="form-edit__input form-edit__input-checkbox">
          <label>Received Certificate</label>
          <input
            type="checkbox"
            checked={certificate}
            onChange={handleCertificateChange}
          />
        </div>
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
