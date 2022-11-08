import { React, useState } from "react";
import { store } from "../../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import AssistantCards from "../AssistantCards/AssistantCards.js";
import "./SearchTA.style.css";
import Select from "../form/Select/Select.js";
import { Semester } from "../../data/DataSelection.js";

function SearchTA() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [semester, setSemester] = useState(Semester[0].value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchResult = [];
    setResults([]);
    const taRef = collection(store, semester);

    const firstQuery = query(taRef, where("first", "==", searchText));
    const lastQuery = query(taRef, where("last", "==", searchText));
    const inumberQuery = query(taRef, where("i_number", "==", searchText));

    var querySnapshot = await getDocs(firstQuery);
    querySnapshot.forEach((doc) => {
      const id = {};
      id["id"] = doc.id;
      const data = { ...id, ...doc.data() };
      searchResult.push(data);
    });
    querySnapshot = await getDocs(lastQuery);
    querySnapshot.forEach((doc) => {
      const id = {};
      id["id"] = doc.id;
      const data = { ...id, ...doc.data() };
      searchResult.push(data);
    });
    querySnapshot = await getDocs(inumberQuery);
    querySnapshot.forEach((doc) => {
      const id = {};
      id["id"] = doc.id;
      const data = { ...id, ...doc.data() };
      searchResult.push(data);
    });
    setResults(searchResult);
    console.log(searchResult);
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleViewAll = async () => {
    const searchResult = [];
    setResults([]);
    const taRef = collection(store, semester);
    const snapshot = await getDocs(taRef);
    snapshot.forEach((doc) => {
      const id = {};
      id["id"] = doc.id;
      const data = { ...id, ...doc.data() };
      searchResult.push(data);
    });
    setResults(searchResult);
  };

  return (
    <div>
      <div className="search_container">
        <p className="search_title">Search TA</p>
        <form onSubmit={handleSubmit}>
          <input
            className="search_input"
            type="text"
            placeholder="SEARCH..."
            required
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form>
        <Select
          status={semester}
          onChange={handleSemesterChange}
          options={Semester}
        />
        <div>
          <button type="button" onClick={handleViewAll}>
            View All
          </button>
        </div>
      </div>

      <AssistantCards tadata={results} semester={semester} />
    </div>
  );
}

export default SearchTA;
