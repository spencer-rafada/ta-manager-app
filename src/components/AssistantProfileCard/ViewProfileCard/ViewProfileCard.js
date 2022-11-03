import React from "react";

export default function ViewProfileCard({ data, setState }) {
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
        <div className="card__info card__info-status">
          {data.enrolled && <p>Enrolled in Training</p>}
          {data.trained && <p>Finished Training </p>}
          {data.certificate && <p>Received Certificate </p>}
        </div>
        <div className="card__info card__info-courses">
          <p>Courses</p>
          <ul>
            {data.courses.map((course, index) => {
              return <li key={index}>{course}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
