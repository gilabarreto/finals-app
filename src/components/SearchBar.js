import React, { useEffect } from "react";

import useDebounce from "../hooks/useDebounce";

import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import "./SearchBar.css";

export default function SearchBar(props) {
  let artistId = useParams();

  const { value, setValue } = props;

  const navigate = useNavigate();

  const handleChange = (event) => {
    if (artistId) {
      navigate("/search");
    }
    setValue(event.target.value);
  };

  const term = useDebounce(value, 700);

  const fetchData = () => {
    const setlistPromise = axios
      //GET Request Setlist
      .get("/rest/1.0/search/setlists", {
        params: {
          artistName: `"${value}"`,
          p: "1",
        },
        headers: {
          Accept: "application/json",
          "x-api-key": "eY_2IYBgy3ovn4sRZSqa9cTZy1nldhaUCvif",
        },
      });

    const ticketmasterPromise = axios.get(
      "https://app.ticketmaster.com/discovery/v2/suggest",
      {
        params: {
          keyword: `"${value}"`,
          segmentId: "KZFzniwnSyZfZ7v7nJ",
          sort: "name,asc",
          apikey: "kMv2pjo5bzSz5iyaz0h5aLqGnQcWyOSL",
        },
      }
    );

    Promise.all([setlistPromise, ticketmasterPromise])
      .then(([setlistResponse, ticketmasterResponse]) => {
        props.setSetlist(setlistResponse.data.setlist);
        props.setTicketmaster(ticketmasterResponse.data._embedded);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (term.length === 0) {
      return;
    }
    fetchData();
  }, [term]);

  return (
    <div className="search">
      <form
        className="input-container"
        onSubmit={(event) => event.preventDefault()}
      >
        <input
          className="input-text-search"
          type="search"
          value={value}
          placeholder="Search your favorite artist here and find your next adventure"
          onChange={handleChange}
        ></input>
      </form>
    </div>
  );
}
