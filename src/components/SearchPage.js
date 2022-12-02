import React, { useCallback, useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import SpotifyAuth from "./SpotifyAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchPage(props) {
  const [index, setIndex] = useState(0);
  const [toggleHeart, setToggleHeart] = useState(false);

  const navigate = useNavigate();

  const changeColor = () => {
    setToggleHeart(toggleHeart => !toggleHeart);
  };

  let toggleClassCheck = toggleHeart ? ' active' : '';

  if (props.setlist.length === 0) {
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

  let artistImage = "";

  try {
    artistImage = props.ticketmaster?.events[0]?.images[0]?.url;
  } catch (error) {
    console.log({ error })
  }

  const concert = props.setlist[index];

  const artist = concert.artist.name;

  const tour = concert?.tour?.name;

  const spotify = props.ticketmaster.attractions
    ? props.ticketmaster.attractions[0].externalLinks.spotify[0].url
    : null;

  const lastConcert = concert.eventDate;

  const nextConcertDate = (localDate) => {
    if (!localDate) {
      return null
    }
    const [year, month, day] = localDate.split('-');
    const date = new Date(year, month - 1, day);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const nextConcert = date.toLocaleDateString("en-US", options);

    return nextConcert;
  }

  const lastConcertDate = (eventDate) => {
    const [day, month, year] = eventDate.split("-");
    const date = new Date(year, month - 1, day);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const lastConcert = date.toLocaleDateString("en-US", options);

    if (new Date(lastConcert.split("-").reverse().join()) > new Date()) {
      return null
    }
    return lastConcert;

  };

  const uniqueIds = [];

  const uniqueSetlist = props.setlist.filter((item) => {
    const isDuplicate = uniqueIds.includes(item.artist.mbid);

    if (!isDuplicate) {
      uniqueIds.push(item.artist.mbid);

      return true;
    }
    return false;
  });

  return (
    <>
      {uniqueSetlist.map((setlistArtist, index) => {

        return (
          <>
            {lastConcertDate(setlistArtist.eventDate) &&
              <div className="search-page-card">
                <div className="search-page-image-box">
                  <img
                    src={props.ticketmaster?.events[index]?.images[0]?.url}
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
                  <h1 className="search-artist">{setlistArtist.artist.name}</h1>
                  {tour && <h3 className="search-tour">Tour: {tour}</h3>}
                </div>
                <FontAwesomeIcon
                  icon="heart"
                  size="2x"
                  className={`favourite-icon${toggleClassCheck}`}
                  onClick={changeColor}
                />
                <div className="search-page-box">
                  <button className="search-page-button">Next concert</button>
                  <h3>{props.ticketmaster ? nextConcertDate(props.ticketmaster?.events[index]?.dates?.start?.localDate) : null}</h3>
                </div>
                <div className="search-page-box">
                  <button className="search-page-button">
                    Last Concert
                  </button>
                  <h3>{lastConcertDate(setlistArtist.eventDate)}</h3>
                </div>
                <div className="search-page-box">
                  <button className="search-page-button">
                    {/* <a href={spotify} target="_blank" rel="noopener noreferrer">
            Play now!
          </a> */}
                  </button>
                </div>
              </div>

            }
          </>
        )
      })}
    </>
  )
}
