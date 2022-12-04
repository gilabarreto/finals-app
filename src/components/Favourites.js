import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import SpotifyAuth from "./SpotifyAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchPage(props) {
  const [index, setIndex] = useState(0);
  const [toggleHeart, setToggleHeart] = useState(false);

  const navigate = useNavigate();

  const changeColor = () => {
    setToggleHeart((toggleHeart) => !toggleHeart);
  };

  let toggleClassCheck = toggleHeart ? " active" : "";
  const favorites = props.favourites.map((favourite) => {
    return(
    <div>
      {favourite.artistname}
      <img src= {favourite.artistimage}/>
    </div>
    )
  })
  if (props.favourites.length === 0) {
    return <span>Loading..</span>
  }
  return <div>{favorites}</div>

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

  const artistImage = props.ticketmaster.events
    ? props.ticketmaster.events[0].images[0].url
    : null;

  const nextConcert = props.ticketmaster.events
    ? props.ticketmaster.events.map((upcomingConcert) => {
        const str = upcomingConcert.dates.start.localDate;
        const [year, month, day] = str.split("-");
        const date = new Date(year, month - 1, day);
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        return date.toLocaleDateString("en-US", options);
      })
    : [];

  // const concert = props.setlist[index];

  // const concertId = concert.id

  // const artist = concert.artist.name;

  // const tour = concert?.tour?.name;

  // const spotify = props.ticketmaster.attractions[0].externalLinks.spotify[0].url ?
  //   props.ticketmaster.attractions[0].externalLinks.spotify[0].url
  //   : null;

  // const lastConcert = concert.eventDate;

  // const previousConcertDate = () => {
  //   const str = concert.eventDate;
  //   const [day, month, year] = str.split("-");
  //   const date = new Date(year, month - 1, day);
  //   const options = {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   };
  //   return date.toLocaleDateString("en-US", options);
  // };

  // if (new Date(lastConcert.split("-").reverse().join()) > new Date()) {
  //   return setIndex(index + 1);
  // }

  const lastConcertDate = (eventDate) => {
    const [day, month, year] = eventDate.split("-");
    const date = new Date(year, month - 1, day);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const lastConcert = date.toLocaleDateString("en-US", options);
    console.log("lastconcert", lastConcert);

    if (date > new Date()) {
      return null;
    }
    return lastConcert;
  };

  //Filters setlist data by concert date, only show concerts that already happened
  const noUpcomingConcert = props.setlist.filter((item) => {
    const [day, month, year] = item.eventDate.split("-");
    const date = new Date(year, month - 1, day);

    if (Number(date) > Number(new Date())) {
      return false;
    }
    return true;
  });

  const uniqueIds = [];

  //Filters the data for unique artists
  const uniqueSetlist = noUpcomingConcert.filter((item) => {
    const isDuplicate = uniqueIds.includes(item.artist.mbid);

    if (!isDuplicate) {
      uniqueIds.push(item.artist.mbid);

      return true;
    }
    return false;
  });

  return (
    <>
      {uniqueSetlist.map((setlist) => {
        const concert = setlist;

        const artistId = concert.artist.mbid;

        const concertId = concert.id;

        const artist = concert.artist.name;

        const tour = concert?.tour?.name;

        const lastConcert = concert.eventDate;

        return (
          <>
            <div className="search-page-card">
              <div className="search-page-image-box">
                <img
                  src={artistImage}
                  className="search-page-image"
                  onClick={() => {
                    navigate(`/artists/${artistId}/concerts/${concertId}`);
                  }}
                />
              </div>
              <div
                className="search-page-info-box"
                onClick={() => {
                  navigate(`/artists/${artistId}/concerts/${concertId}`);
                }}
              >
                <h1 className="search-artist">{artist}</h1>
                {tour && <h3 className="search-tour">Tour: {tour}</h3>}
              </div>
              <FontAwesomeIcon
                icon="heart"
                size="2x"
                className={`favourite-icon${toggleClassCheck}`}
                onClick={changeColor}
              />
            </div>
          </>
        );
      })}
    </>
  );
}