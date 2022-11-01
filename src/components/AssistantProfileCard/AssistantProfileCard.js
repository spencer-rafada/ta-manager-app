import { React, useState } from "react";
import ViewProfileCard from "./ViewProfileCard/ViewProfileCard.js";
import EditProfileCard from "./EditProfileCard/EditProfileCard.js";

export default function AssistantProfileCard({ data }) {
  const [state, setState] = useState("view");

  const handleToggle = () => {
    if (state === "view") {
      setState("edit");
    } else {
      setState("view");
    }
  };

  return (
    <div>
      {state === "view" && (
        <ViewProfileCard data={data} setState={handleToggle} />
      )}
      {state === "edit" && (
        <EditProfileCard data={data} setState={handleToggle} />
      )}
    </div>
  );
}
