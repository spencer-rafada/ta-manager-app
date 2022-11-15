import React from "react";
import AssistantProfileCard from "../AssistantProfileCard/AssistantProfileCard.js";
import "./AssistantCards.style.css";

function AssistantCards({ tadata, semester }) {
  return (
    <div className="cardlist">
      {tadata.map((info, index) => {
        return (
          <div className="cardlist__cards" key={index}>
            <AssistantProfileCard data={info} semester={semester} />
          </div>
        );
      })}
    </div>
  );
}

export default AssistantCards;
