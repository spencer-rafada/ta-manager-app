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

export default function AddTA() {
  const [values, setValues] = useState({
    first: "",
    last: "",
    type: "",
    status: Status[0].value,
    i_number: "",
    email: "",
    hired: Semester[0].value,
  });
  //     courses: section,
  //     hired: semester,
  const [section, setSection] = useState([{ section: "" }]);
  const [enrolled, setEnrolled] = useState(false);
  const [trained, setTrained] = useState(false);
  const [certificate, setCertificate] = useState(false);

  const onChange = (key) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [key]: value }));
    };
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
      const docRef = await addDoc(collection(store, values.hired), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  };

  // handle submit form. put all values to JSON and send to DB
  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`${values.first} ${values.last} has been added to ${values.hired}`);
    const data = {
      first: values.first,
      last: values.last,
      type: values.type,
      status: values.status,
      i_number: values.i_number,
      courses: section,
      email: values.email,
      enrolled: enrolled,
      trained: trained,
      certificate: certificate,
      hired: values.hired,
    };
    addData(data);
  };

  return (
    <div className="form">
      <div className="form__title">
        <h1>Add</h1>
      </div>
      <div className="form__select-endjustify">
        <Select
          status={values.hired}
          onChange={onChange("hired")}
          options={Semester}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          label={"First Name"}
          type={"text"}
          value={values.first}
          onChange={onChange("first")}
        />
        <Input
          label={"Last Name"}
          type={"text"}
          value={values.last}
          onChange={onChange("last")}
        />
        <div className="form__input__select-status">
          <div className="justify">
            <Select
              status={values.status}
              onChange={onChange("status")}
              options={Status}
            />
          </div>
          <div className="form__input form__input-radio">
            <label>
              <input
                type="radio"
                value="IL"
                checked={values.type === "IL"}
                onChange={onChange("type")}
              />
              IL-TA
            </label>
            <label>
              <input
                type="radio"
                value="CM"
                checked={values.type === "CM"}
                onChange={onChange("type")}
              />
              CM-TA
            </label>
          </div>
        </div>
        <Input
          label={"I-Number"}
          type={"text"}
          value={values.i_number}
          onChange={onChange("i_number")}
        />
        <Input
          label={"Email"}
          type={"email"}
          value={values.email}
          onChange={onChange("email")}
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
