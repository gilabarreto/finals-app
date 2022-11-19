import React, { useEffect, useState }from "react";
import searchIcon from "../icons/search.png";
import axios from "axios";

export default function SearchBar(props) {
    
  const [value, setValue] = useState("");
  const [results, setResults] = useState("");

  useEffect(() => {
    axios.get('/rest/1.0/search/setlists', {
      params: {
        'artistName': value,
        'p': '1'
      },
      headers: {
        'Accept': 'application/json',
        'x-api-key': 'eY_2IYBgy3ovn4sRZSqa9cTZy1nldhaUCvif'
      }
    })
      .then((res) => {
        console.log(res.data.setlist);
        setResults([...res.data.setlist])
      })
  }, [value])

  return (
    <div className="search">
      <form className="input-container-search" onSubmit={event => event.preventDefault()}>
        <img className="searchIcon" src={searchIcon}></img>
        <input
          className="input-text-search"
          type="search"
          value={value}
          placeholder="Search your favorite artist"
          onChange={event => setValue(event.target.value)}
        ></input>
      </form>
    </div>
  );
}
