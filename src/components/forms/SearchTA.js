import { React, useState } from "react";
import { store } from "../../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import AssistantCards from "../AssistantCards.js";

function SearchTA() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchResult = [];
    setResults([]);
    const taRef = collection(store, "ta");

    const firstQuery = query(taRef, where("first", "==", searchText));
    const lastQuery = query(taRef, where("last", "==", searchText));
    const inumberQuery = query(taRef, where("i_number", "==", searchText));

    var querySnapshot = await getDocs(firstQuery);
    querySnapshot.forEach((doc) => {
      searchResult.push(doc.data());
    });
    querySnapshot = await getDocs(lastQuery);
    querySnapshot.forEach((doc) => {
      searchResult.push(doc.data());
    });
    querySnapshot = await getDocs(inumberQuery);
    querySnapshot.forEach((doc) => {
      searchResult.push(doc.data());
    });
    setResults(searchResult);
    console.log(searchResult);
  };

  return (
    <div>
      <div>SearchTA</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search TA name..."
          required
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <AssistantCards tadata={results} />
    </div>
  );
}

export default SearchTA;
