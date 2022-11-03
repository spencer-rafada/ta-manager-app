import React from "react";
import AssistantProfileCard from "../AssistantProfileCard/AssistantProfileCard.js";

function AssistantCards({ tadata }) {
  return (
    <div className="cardlist">
      {tadata.map((info, index) => {
        return (
          <div className="cardlist__cards" key={index}>
            <AssistantProfileCard data={info} />;
          </div>
        );
      })}
    </div>
  );
}

export default AssistantCards;
