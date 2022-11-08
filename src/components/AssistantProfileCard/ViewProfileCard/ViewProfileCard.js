import { React, useState } from "react";
import RightArrow from "../../../img/triangle-right-arrow-icon.svg";

export default function ViewProfileCard({ data, setState }) {
  const [status, setStatus] = useState(false);

  const handleStatusChange = () => {
    setStatus(!status);
  };

  return (
    <div className="profile-card-view">
      <button
        className="card__button card__button-edit"
        type="button"
        onClick={setState}>
        Edit
      </button>
      <div className="card__info card__info-name">
        <h1>
          {data.first} {data.last}
        </h1>
      </div>
      <div className="card__info card__info-number">
        <p>I-Number: {data.i_number}</p>
      </div>
      <div className="card__info card__info-type">
        <p>Type: {data.type}-TA</p>
      </div>
      <div className="card__info card__info-status">
        <p>Status: {data.status}</p>
      </div>
      <div className="card__info card__info-hire">
        <p>Semester Hired: {data.hired}</p>
      </div>
      <div className="card__info card__info-courses">
        <h2>Courses</h2>
        <ul>
          {data.courses.map((course, index) => {
            return <li key={index}>{course}</li>;
          })}
        </ul>
      </div>
      <div className="card__button-status">
        <button type="button" onClick={handleStatusChange}>
          <img
            style={
              status ? { transform: "rotate(90)" } : { transform: "rotate(0)" }
            }
            src={RightArrow}
            alt="triangle-status"></img>
          <p>Check Status</p>
        </button>
      </div>
      {status && (
        <div className="card__info card__info-status">
          <p>Enrolled in Training: {data.enrolled ? "Yes" : "No"}</p>
          <p>Finished Training: {data.trained ? "Yes" : "No"}</p>
          <p>Received Certificate: {data.certificate ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
}
