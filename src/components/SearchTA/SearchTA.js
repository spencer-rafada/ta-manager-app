import { React, useState } from "react";
import { store } from "../../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import Select from "../form/Select/Select.js";
import AddTA from "../AddTA/AddTA.js";
import { Semester } from "../../data/DataSelection.js";
import "./SearchTA.style.css";
import Add from "../../img/add-new.png";

function SearchTA({ onSearch, semester, onSemesterChange }) {
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async () => {
    if (searchText.length === 0) {
      handleViewAll();
      return;
    }

    const searchResult = [];
    onSearch([]);
    const taRef = collection(store, semester);

    const firstQuery = query(taRef, where("first", "==", searchText));
    const lastQuery = query(taRef, where("last", "==", searchText));
    const inumberQuery = query(taRef, where("i_number", "==", searchText));
    const courseQuery = query(
      taRef,
      where("courses", "array-contains", searchText)
    );

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
    querySnapshot = await getDocs(courseQuery);
    querySnapshot.forEach((doc) => {
      const id = {};
      id["id"] = doc.id;
      const data = { ...id, ...doc.data() };
      searchResult.push(data);
    });
    onSearch(searchResult);
    console.log(searchResult);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleViewAll = async () => {
    const searchResult = [];
    onSearch([]);
    const taRef = collection(store, semester);
    const snapshot = await getDocs(taRef);
    snapshot.forEach((doc) => {
      const id = {};
      id["id"] = doc.id;
      const data = { ...id, ...doc.data() };
      searchResult.push(data);
    });
    onSearch(searchResult);
  };

  const handleCloseModalVisibility = () => {
    setModalVisible(false);
  };

  return (
    <div className="search_container">
      <input
        className="search_input"
        type="text"
        placeholder="Search First Name or Last Name or I-Number..."
        required
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Select
        status={semester}
        onChange={onSemesterChange}
        options={Semester}
      />

      {/* Modal Visibility */}
      <button type="button" onClick={() => setModalVisible(true)}>
        <img src={Add} alt="add-icon"></img>
      </button>
      <AddTA
        modalVisible={modalVisible}
        setModalVisible={handleCloseModalVisibility}
      />
    </div>
  );
}

export default SearchTA;
