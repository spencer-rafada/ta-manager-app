import React from "react";

export default function ViewProfileCard({ data, setState }) {
  return (
    <div className="profile-card-container">
      <button type="button" onClick={setState}>
        Edit
      </button>
      <div className="profile-card-info">
        <p>
          {data.first} {data.last}
        </p>
        <p>I-Number: {data.i_number}</p>
        <p>Type: {data.type}-TA</p>
      </div>
      <div className="profile-card-certificates">
        {data.enrolled && <p>Enrolled in Training</p>}
        {data.trained && <p>Finished Training </p>}
        {data.certificate && <p>Received Certificate </p>}
      </div>
      <div className="profile-card-courses">
        <p>Courses</p>
        <ul>
          {data.courses.map((course, index) => {
            return <li key={index}>{course}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
