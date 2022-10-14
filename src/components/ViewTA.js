import { React, useEffect, useState } from "react";
import { store } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";

const ViewTA = () => {
  const [ta, setTA] = useState([]);

  useEffect(() => {
    getTA();
  }, []);

  const getTA = async () => {
    const querySnapshot = await getDocs(collection(store, "ta"));
    querySnapshot.forEach((doc) => {
      var data = doc.data();
      setTA((arr) => [...arr, data]);
    });
    console.log(ta);
  };

  // Check for sections here : https://contactmentor.com/javascript-map-array-of-objects/
  return (
    <div>
      <div className="info">
        {ta.map((data, key) => {
          return (
            <div key={key}>
              <p>
                {data.first} {data.last}
              </p>
              <p>{data.i_number}</p>
              <hr></hr>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ViewTA;
