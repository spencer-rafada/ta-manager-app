import { React, useState } from "react";
import { store } from "../../firebase.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import Select from "../form/Select/Select.js";
import { Semester } from "../../data/SemesterSelection.js";

export default function MoveCollection() {
  const [fromCollection, setFromCollection] = useState(Semester[0].value);
  const [toCollection, setToCollection] = useState(Semester[0].value);
  const storeRefFrom = collection(store, fromCollection);
  const storeRefTo = collection(store, toCollection);

  const transferAll = async () => {
    const allTA = await getDocs(storeRefFrom);
    // Firebase can only write up to 400 maximum.
    allTA.forEach(async (doc) => {
      try {
        const data = doc.data();
        const docRef = await addDoc(storeRefTo, data);
        console.log("Document transferred with ID: ", docRef.id);
      } catch (e) {
        console.log(doc);
        console.log("Error adding document: ", e);
      }
    });
  };

  const handleFromCollectionChange = (e) => {
    setFromCollection(e.target.value);
  };

  const handleToCollectionChange = (e) => {
    setToCollection(e.target.value);
  };

  return (
    <div>
      <div>MoveCollection</div>
      <Select
        semester={fromCollection}
        onChange={handleFromCollectionChange}
        options={Semester}
      />
      <p>to</p>
      <Select
        semester={toCollection}
        onChange={handleToCollectionChange}
        options={Semester}
      />
      <button type="button" onClick={transferAll}>
        Transfer all
      </button>
    </div>
  );
}
