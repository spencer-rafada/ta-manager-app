import { React, useState } from "react";

export default function ViewProfileCard({ data, setState }) {
  const [status, setStatus] = useState(false);

  const handleStatusChange = () => {
    setStatus(!status);
  };

  return (
    <div className="card">
      <button
        className="card__button card__button-edit"
        type="button"
        onClick={setState}>
        Edit
      </button>
      <div className="card__info">
        <div className="card__info card__info-name">
          <p>
            {data.first} {data.last}
          </p>
        </div>
        <div className="card__info card__info-number">
          <p>I-Number: {data.i_number}</p>
        </div>
        <div className="card__info card__info-type">
          <p>Type: {data.type}-TA</p>
        </div>
        <div className="card__info card__info-courses">
          <p>Courses</p>
          <ul>
            {data.courses.map((course, index) => {
              return <li key={index}>{course}</li>;
            })}
          </ul>
        </div>
        <button type="button" onClick={handleStatusChange}>
          Check Status
        </button>
        {status && (
          <div className="card__info card__info-status">
            <p>Enrolled in Training: {data.enrolled ? "Yes" : "No"}</p>
            <p>Finished Training: {data.trained ? "Yes" : "No"}</p>
            <p>Received Certificate: {data.certificate ? "Yes" : "No"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
