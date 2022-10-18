import React from "react";
import AddTA from "../components/forms/AddTA/AddTA.js";
import SearchTA from "../components/forms/SearchTA.js";
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
    </div>
  );
}
