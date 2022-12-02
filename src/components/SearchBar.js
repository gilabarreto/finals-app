import React, { useEffect, useState } from "react";

import useDebounce from "../hooks/useDebounce";

import searchIcon from "../icons/search.png";

import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function SearchBar(props) {
  const [value, setValue] = useState("");
  const handleChange = (event) => setValue(event.target.value);

  const navigate = useNavigate();

  const term = useDebounce(value, 700);

  useEffect(() => {
    if (term.length === 0) {
      return;
    } else {
      //GET Request Setlist
      axios
        .get("/rest/1.0/search/setlists", {
          params: {
            artistName: `"${value}"`,
            p: "1",
          },
          headers: {
            Accept: "application/json",
            "x-api-key": "eY_2IYBgy3ovn4sRZSqa9cTZy1nldhaUCvif",
          },
        })
        .then(res => {
          props.setSetlist(res.data.setlist);
        })
        .catch(err => {
          props.setSetlist([]);
          console.log("Setlist Get Resquest Error:", err);
        });

      axios
        .get(
          "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks",
          {
            params: {
              market: "ES",
            },
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "1b96527ae88b428e9df149a9ef210091",
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("Setlist Get Resquest Error:", err);
        });
      // GET Request Ticketmaster
      // axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
      axios
        .get("https://app.ticketmaster.com/discovery/v2/suggest", {
          params: {
            keyword: `"${value}"`,
            segmentId: "KZFzniwnSyZfZ7v7nJ",
            sort: "name,asc",
            apikey: "kMv2pjo5bzSz5iyaz0h5aLqGnQcWyOSL",
          },
        })
        .then((res) => {
          props.setTicketmaster(res.data._embedded);
        })
        .catch((err) => {
          props.setTicketmaster([]);
          console.log("Ticketmaster Get Request Error", err);
        });
    }
  }, [term]);

  return (
    <div className="search">
      <form
        className="input-container-search"
        onSubmit={(event) => event.preventDefault()}
      >
        <img className="searchIcon" src={searchIcon}></img>
        <input
          className="input-text-search"
          type="search"
          value={value}
          placeholder="Search your favorite artist"
          onChange={handleChange}
        ></input>
      </form>
    </div>
  );
}
