import React from "react";
import AddTA from "../components/AddTA/AddTA.js";
import SearchTA from "../components/SearchTA/SearchTA.js";
import MoveCollection from "../components/MoveCollection/MoveCollection.js";
// import ViewTA from "../components/ViewTA.js";

export default function Admin() {
  return (
    <div>
      <h1>Hello Admin</h1>
      <h2>This is to Add TA</h2>
      <AddTA />
      <h2>This is to Search TA</h2>
      <SearchTA />
      {/* <ViewTA /> */}
      <h2>Move collection</h2>
      <MoveCollection />
    </div>
  );
}
