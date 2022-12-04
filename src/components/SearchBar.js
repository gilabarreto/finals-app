import React, { useEffect, useState, TextInput } from "react";

import useDebounce from "../hooks/useDebounce";

import searchIcon from "../icons/search.png";

import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import "./SearchBar.css";

export default function SearchBar(props) {
  // const [value, setValue] = useState("");

  let artistId = useParams();

  const { value, setValue } = props;

  const navigate = useNavigate();

  const handleChange = event => {
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

    // const spotifyPromsie = axios
    //   .get(
    //     "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks",
    //     {
    //       params: {
    //         market: "ES",
    //       },
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: "1b96527ae88b428e9df149a9ef210091",
    //       },
    //     }
    //   )
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((err) => {
    //   console.log("Setlist Get Resquest Error:", err);
    // });
    // GET Request Ticketmaster
    // axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
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
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (term.length === 0) {
      return;
    }
    fetchData();
  }, [term]);

  // useEffect(() => {
  //   const ticketmasterCall = async () => {
  //     const response = await axios
  //       .get("https://app.ticketmaster.com/discovery/v2/suggest", {
  //         params: {
  //           keyword: `"${value}"`,
  //           segmentId: "KZFzniwnSyZfZ7v7nJ",
  //           sort: "name,asc",
  //           apikey: "kMv2pjo5bzSz5iyaz0h5aLqGnQcWyOSL",
  //         },
  //       })
  //     ticketmasterCall()
  //     console.log(response)
  //     props.setTicketmaster(response.data._embedded);
  //   }
  // }, [term]);

  return (
    <div className="search">
      <form
        className="input-container"
        onSubmit={event => event.preventDefault()}
      >
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
