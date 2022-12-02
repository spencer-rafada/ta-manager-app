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
      const list = [];
      data.forEach((document) => {
        const data = document.data();
        const docId = document.id;
        list.push({ ...data, docId });
      });
      setAllTA(list);
    };
    fetchData();
  }, [fromCollection]);

  const transferAll = async () => {
    // Firebase can only write up to 400 maximum.
    allTA.forEach(async (document) => {
      try {
        await setDoc(doc(store, toCollection, document.docId), document);
        console.log("Document transferred with ID: ", document.docId);
      } catch (error) {
        console.log(document);
        console.log("Error adding document: ", error);
      }
    });
  };

  const handleFromCollectionChange = (event) => {
    setFromCollection(event.target.value);
    // this should trigger a fetch to display the documents for that semester
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
      {/* might need to change this as a form */}
      <div>
        {allTA.map((data, index) => {
          return (
            // check Preston's live filtering to see if this is applicable
            <div key={index}>
              <input type="checkbox"></input>
              {data.docId}: {data.first + " " + data.last}
            </div>
          );
        })}
      </div>
    </div>
  );
}
