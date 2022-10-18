import React from "react";

function AssistantCards({ tadata }) {
  return (
    <div>
      {tadata.map((info, index) => {
        return (
          <div key={index}>
            <p>{info.first}</p>
            <p>{info.last}</p>
            <p>{info.i_number}</p>
            <ul>
              {info.section.map((section, index) => {
                return <li key={index}>{section}</li>;
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default AssistantCards;
