import { React, useEffect, useState } from "react";
import { store } from "../../firebase.js";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import Select from "../form/Select/Select.js";
import { Semester } from "../../data/DataSelection.js";

export default function MoveCollection() {
  const [fromCollection, setFromCollection] = useState(Semester[0].value);
  const [toCollection, setToCollection] = useState(Semester[0].value);
  const storeRefFrom = collection(store, fromCollection);
  const [allTA, setAllTA] = useState([]);
  // const storeRefTo = collection(store, toCollection);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(storeRefFrom);
      // TODO foreach data append to a list with .data()
      setAllTA(data);
      console.log(allTA);
    };
    fetchData();
  }, []);

  const transferAll = async () => {
    // Firebase can only write up to 400 maximum.
    allTA.forEach(async (document) => {
      try {
        const data = document.data();
        const docId = document.id;
        await setDoc(doc(store, toCollection, docId), data);
        console.log("Document transferred with ID: ", docId);
      } catch (error) {
        console.log(document);
        console.log("Error adding document: ", error);
      }
    });
  };

  const handleFromCollectionChange = (event) => {
    setFromCollection(event.target.value);
    // this should trigger a fetch to display the documents for that semester
    console.log(`Fetch data ${event.target.value}`);
  };

  const handleToCollectionChange = (event) => {
    setToCollection(event.target.value);
  };

  return (
    <div>
      <div>MoveCollection</div>
      <Select
        status={fromCollection}
        onChange={handleFromCollectionChange}
        options={Semester}
      />
      <p>to</p>
      <Select
        status={toCollection}
        onChange={handleToCollectionChange}
        options={Semester}
      />
      <button type="button" onClick={transferAll}>
        Transfer all
      </button>
    </div>
  );
}
