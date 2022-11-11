import { React, useState } from "react";
import { store } from "../../firebase.js";
import { collection, addDoc } from "firebase/firestore";
import "./AddTA.style.css";
import Input from "../form/Input/Input.js";
import InputCheckbox from "../form/InputCheckBox/InputCheckbox.js";
import Select from "../form/Select/Select.js";
import { Semester, Status } from "../../data/DataSelection.js";
import Add from "../../img/add-new.png";
import Trash from "../../img/red-trash.svg";
import Error from "../../img/error_icon.svg";

export default function AddTA() {
  const [f_name, setFName] = useState("");
  const [l_name, setLName] = useState("");
  const [ta_type, setType] = useState("");
  const [status, setStatus] = useState(Status[0].value);
  const [number, setNumber] = useState("");
  const [section, setSection] = useState([{ section: "" }]);
  const [email, setEmail] = useState("");
  const [enrolled, setEnrolled] = useState(false);
  const [trained, setTrained] = useState(false);
  const [certificate, setCertificate] = useState(false);
  const [semester, setSemester] = useState(Semester[0].value);

  // Validation
  const [isFilled, setIsFilled] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);

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

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const addData = async (data) => {
    try {
      const docRef = await addDoc(collection(store, semester), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  };

  const validateFields = () => {
    // validate fields: Required data is First Name, Last Name, Type, I-Number, Email, Courses
    let errorMessage = "";
    if (f_name.length === 0) {
      errorMessage = "First Name";
    }
    if (l_name.length === 0) {
      if (errorMessage.length !== 0) {
        errorMessage = errorMessage + ", ";
      }
      errorMessage = errorMessage + "Last Name";
    }
    if (ta_type.length === 0) {
      if (errorMessage.length !== 0) {
        errorMessage = errorMessage + ", ";
      }
      errorMessage = errorMessage + "Type";
    }
    if (number.length === 0) {
      if (errorMessage.length !== 0) {
        errorMessage = errorMessage + ", ";
      }
      errorMessage = errorMessage + "I-Number";
    }
    if (email.length === 0) {
      if (errorMessage.length !== 0) {
        errorMessage = errorMessage + ", ";
      }
      errorMessage = errorMessage + "Email";
    }
    if (section.length === 0) {
      if (errorMessage.length !== 0) {
        errorMessage = errorMessage + ", ";
      }
      errorMessage = errorMessage + "Courses";
    }

    console.log(errorMessage);
    if (errorMessage.length === 0) {
      setIsFilled(true);
    } else {
      setErrorMsg(errorMessage);
      setIsFilled(false);
      errorMessage = "";
    }
  };

  // handle submit form. put all values to JSON and send to DB
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowError(false);
    setIsFilled(true);
    // Validate
    validateFields();
    if (!isFilled) {
      setShowError(true);
      return;
    }
    alert(`${f_name} ${l_name} has been added to ${semester}`);
    const data = {
      first: f_name,
      last: l_name,
      type: ta_type,
      status: status,
      i_number: number,
      courses: section,
      email: email,
      enrolled: enrolled,
      trained: trained,
      certificate: certificate,
      hired: semester,
    };
    addData(data);
    setShowError(false);
  };

  return (
    <div className="form">
      <div className="form__title">
        <h1>Add</h1>
      </div>
      {showError && (
        <div className="form__error">
          <img src={Error} alt="error"></img>
          <p>{errorMsg}</p>
        </div>
      )}
      <div className="form__select-endjustify">
        <Select
          status={semester}
          onChange={handleSemesterChange}
          options={Semester}
        />
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
        <div className="form__input__select-status">
          <div className="justify">
            <Select
              status={status}
              onChange={handleStatusChange}
              options={Status}
            />
          </div>
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
        <div className="form__section-courses">
          <div className="form__section-add">
            <button
              className="form__button form__button-add"
              type="button"
              onClick={addSection}>
              <img src={Add} alt="add-icon"></img>
            </button>
            <h2>Courses</h2>
          </div>
          {section.map((input, index) => {
            return (
              <div className="form__input-courses" key={index}>
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
                  <img src={Trash} alt="trash"></img>
                </button>
              </div>
            );
          })}
        </div>
        <div className="form__button-submit">
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
