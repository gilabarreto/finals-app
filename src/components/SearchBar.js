import React, { useState }from "react";
import searchIcon from "../icons/search.png";

export default function SearchBar() {
  const [value, setValue] = useState("");

  return (
    <div className="search">
      <div className="input-container-search">
        <img className="searchIcon" src={searchIcon}></img>
        <input
          className="input-text-search"
          type="search"
          placeholder="Search your favorite artist"
        ></input>
      </div>
    </div>
  );
}
