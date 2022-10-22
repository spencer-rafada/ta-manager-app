import React from "react";
import AssistantProfileCard from "../AssistantProfileCard/AssistantProfileCard.js";

function AssistantCards({ tadata }) {
  return (
    <div>
      {tadata.map((info, index) => {
        return (
          <div key={index}>
            <AssistantProfileCard data={info} />;
          </div>
        );
      })}
    </div>
  );
}

export default AssistantCards;
