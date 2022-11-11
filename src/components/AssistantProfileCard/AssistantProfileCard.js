import { React, useState } from "react";
import { store } from "../../firebase.js";
import { doc, deleteDoc } from "firebase/firestore";
import ViewProfileCard from "./ViewProfileCard/ViewProfileCard.js";
import EditProfileCard from "./EditProfileCard/EditProfileCard.js";
import "./AssistantProfileCard.css";
import Trash from "../../img/red-trash.svg";

export default function AssistantProfileCard({ data, semester }) {
  const [state, setState] = useState("view");

  const handleToggle = () => {
    if (state === "view") {
      setState("edit");
    } else {
      setState("view");
    }
  };

  const handleDelete = async () => {
    const docRef = doc(store, semester, data.id);
    await deleteDoc(docRef);
    // alert("TA has been deleted.");
  };

  return (
    <div className="profile-card">
      {state === "view" && (
        <ViewProfileCard data={data} setState={handleToggle} />
      )}
      {state === "edit" && (
        <EditProfileCard
          data={data}
          semester={semester}
          setState={handleToggle}
        />
      )}
      <div className="profile-card__button-remove">
        <button type="button" onClick={handleDelete}>
          <img src={Trash} alt="trash"></img>
        </button>
      </div>
    </div>
  );
}
