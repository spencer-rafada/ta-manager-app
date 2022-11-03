import { React, useState } from "react";
import { store } from "../../firebase.js";
import { doc, deleteDoc } from "firebase/firestore";
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

  const handleDelete = async () => {
    const docRef = doc(store, "ta", data.id);
    await deleteDoc(docRef);
    // alert("TA has been deleted.");
  };

  return (
    <div>
      <button className="profile__button-delete" onClick={handleDelete}>
        Delete
      </button>
      {state === "view" && (
        <ViewProfileCard data={data} setState={handleToggle} />
      )}
      {state === "edit" && (
        <EditProfileCard data={data} setState={handleToggle} />
      )}
    </div>
  );
}
