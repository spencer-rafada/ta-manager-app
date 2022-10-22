import React from "react";

export default function AssistantProfileCard({ data }) {
  return (
    <div>
      <p>
        {data.first} {data.last}
      </p>
      <p>I-Number: {data.i_number}</p>
      <p>Type: {data.type}-TA</p>
      {data.enrolled && <p>Enrolled in Training</p>}
      {data.trained && <p>Finished Training </p>}
      {data.certificate && <p>Received Certificate </p>}
      <p>Courses</p>
      <ul>
        {data.courses.map((course, index) => {
          return <li key={index}>{course}</li>;
        })}
      </ul>
    </div>
  );
}
