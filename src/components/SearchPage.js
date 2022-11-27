import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import SpotifyAuth from "./SpotifyAuth";

export default function SearchPage(props) {
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();

  if (props.results.length === 0) {
    return (
      <div className="main-page-card">
        <h1>
          Keep track of your favorite artist by login in to your Spotify
          Account.
        </h1>
        <SpotifyAuth setGlobalSpotifyToken={props.setGlobalSpotifyToken} />
      </div>
    );
  }

  let nextConcert = "";

  try {
    nextConcert = props.ticketmaster?.events?.map(upcomingConcert => {
      const str = upcomingConcert.dates.start.localDate;
      const [year, month, day] = str.split("-");
      const date = new Date(year, month - 1, day);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    });
  } catch (error) {
    return (
      <div>
        <h1>Error</h1>
      </div>
    );
  }

  let artistImage = "";

  try {
    artistImage = props.ticketmaster?.events[0]?.images[0]?.url;
  } catch (error) {
    return (
      <div>
        <h1>Error</h1>
      </div>
    );
  }

  // const nextConcert = props.ticketmaster.events ?
  //   props.ticketmaster.events.map((upcomingConcert) => {
  //     const str = upcomingConcert.dates.start.localDate;
  //     const [year, month, day] = str.split('-');
  //     const date = new Date(year, month - 1, day);
  //     const options = {
  //       year: "numeric",
  //       month: "long",
  //       day: "numeric",
  //     };
  //     return date.toLocaleDateString("en-US", options);
  //   }) : [];

  // const spotify = props.ticketmaster.attractions
  //   ? props.ticketmaster.attractions[index].externalLinks.spotify[index].url
  //   : null;

  const concert = props.results[index];

  const artist = concert.artist.name;

  const tour = concert?.tour?.name;

  const lastConcert = concert.eventDate;

  const lastConcertDate = () => {
    const str = concert.eventDate;
    const [day, month, year] = str.split("-");
    const date = new Date(year, month - 1, day);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  if (new Date(lastConcert.split("-").reverse().join()) > new Date()) {
    return setIndex(index + 1);
  }

  return (
    <div className="search-page-card">
      <div className="search-page-image-box">
        <img
          src={artistImage}
          className="search-page-image"
          onClick={() => {
            navigate("/artist");
          }}
        />
      </div>
      <div
        className="search-page-info-box"
        onClick={() => {
          navigate("/artist");
        }}
      >
        <h1 className="search-artist">{artist} </h1>
        {tour && <h3 className="search-tour">Tour: {tour}</h3>}
      </div>
      <div className="search-page-box">
        <button className="search-page-button">Next concert</button>
        <h3>{nextConcert[0]}</h3>
      </div>
      <div className="search-page-box">
        <button className="search-page-button">
          <Link to="/artist">Last Concert</Link>
        </button>
        <h3>{lastConcertDate()}</h3>
      </div>
      <div className="search-page-box">
        <button className="search-page-button">
          {/* <a href={spotify} target="_blank" rel="noopener noreferrer">
            Play now!
          </a> */}
        </button>
      </div>
    </div>
  );
}
