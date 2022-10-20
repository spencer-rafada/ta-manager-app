import { React, useState } from "react";
import { store } from "../../firebase.js";
import { collection, addDoc } from "firebase/firestore";
import "./AddTA.style.css";

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
      enrollment: enrolled,
      trained: trained,
      certificate: certificate,
    };
    addData(data);
  };

  return (
    <div className="add-form">
      <div className="add-form-title">
        <h1>Add a TA</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            type="text"
            value={f_name}
            placeholder="Your First Name..."
            required
            onChange={(e) => setFName(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          Last Name
          <input
            type="text"
            value={l_name}
            placeholder="Your Last Name..."
            required
            onChange={(e) => setLName(e.target.value)}
          />
        </label>
        <br></br>
        <div className="radio">
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
        <label>
          I-Number
          <input
            type="text"
            value={number}
            placeholder="Your I-Number..."
            required
            onChange={(e) => setNumber(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          Email
          <input
            type="text"
            value={email}
            placeholder="Your Email..."
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          Enrolled in Training Course
          <input
            type="checkbox"
            checked={enrolled}
            onChange={() => {
              setEnrolled(!enrolled);
            }}
          />
        </label>
        <br></br>
        <label>
          Completed Training
          <input
            type="checkbox"
            checked={trained}
            onChange={() => {
              setTrained(!trained);
            }}
          />
        </label>
        <br></br>
        <label>
          Received Certificate
          <input
            type="checkbox"
            checked={certificate}
            onChange={() => {
              setCertificate(!certificate);
            }}
          />
        </label>
        <br></br>
        <div className="section">
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
                <button type="button" onClick={() => removeSection(index)}>
                  Remove
                </button>
              </div>
            );
          })}
        </div>

        <button type="button" onClick={addSection}>
          Add more section...
        </button>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
