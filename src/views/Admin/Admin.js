import { React, useState } from "react";
import SearchTA from "../../components/SearchTA/SearchTA.js";
import AssistantCards from "../../components/AssistantCards/AssistantCards.js";
import { Semester } from "./../../data/DataSelection.js";

import "./Admin.style.css";

export default function Admin() {
  const [searchResults, setSearchResults] = useState([]);
  const [semester, setSemester] = useState(Semester[0].value);

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleSearchChange = (value) => {
    setSearchResults(value);
  };

  return (
    <div className="admin">
      <SearchTA
        onSearch={handleSearchChange}
        semester={semester}
        onSemesterChange={handleSemesterChange}
      />
      <AssistantCards tadata={searchResults} semester={semester} />
    </div>
  );
}
