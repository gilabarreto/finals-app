import React, { useState } from "react";
import logo from "../icons/logo-small.png";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchPage(props) {
  const [index, setIndex] = useState(0);
  // const [favourites, setFavourites] = useState([]);

  const navigate = useNavigate();

  const handleFavourite = (artistId, artist, artistImage) => {
    const token = localStorage.getItem("token");
    // console.log("token:", token);
    axios
      .post(
        "http://localhost:4000/favourite/add",
        {
          artistId: artistId,
          artistName: artist,
          image: artistImage,
        },
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        console.log("res.data:", res.data);

        const artist_id = res.data.favourite.artist_id;
        props.setFavourites((prev) => {
          console.log("prev", prev);
          // if (prev.find((item) => item.artistid === artistId)) {
          //   return prev.filter((item) => item.artistid !== artistId);
          // } else {
          return [
            ...prev,
            {
              artist_id,
              artistimage: artistImage,
              artistid: artistId,
              artistname: artist,
            },
          ];
          // }
        });
      })
      .catch((error) => {
        console.log("Error:", error);
        alert(error);
      });
  };

  if (props.setlist.length === 0 || props.ticketmaster === undefined) {
    return (
      <div className="main-page-card">
        {/* <h1>
          Keep track of your favorite artist by login in to your Spotify
          Account.
        </h1>
        <SpotifyAuth setGlobalSpotifyToken={props.setGlobalSpotifyToken} /> */}
      </div>
    );
  }

  /*   let nextConcert = "";
  
    try {
      nextConcert = props.ticketmaster?.events?.map((upcomingConcert) => {
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
    } */

  /*   const lastConcert = concert.eventDate;
  
  const previousConcertDate = () => {
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
  } */

  const concert = props.setlist[index];

  const concertId = concert.id;

  const artist = concert.artist.name;

  const tour = concert?.tour?.name;

  // let spotify = null

  // if (props.ticketmaster && props.ticketmaster.attractions[0])

  // props.ticketmaster?.attractions[0]?.externalLinks?.spotify[0]?.url

  const nextConcertDate = (localDate) => {
    if (!localDate) {
      return null;
    }
    const [year, month, day] = localDate.split("-");
    const date = new Date(year, month - 1, day);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const nextConcert = date.toLocaleDateString("en-US", options);

    return nextConcert;
  };

  const lastConcertDate = (eventDate) => {
    const [day, month, year] = eventDate.split("-");
    const date = new Date(year, month - 1, day);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const lastConcert = date.toLocaleDateString("en-US", options);

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

  console.log("ticketmaster", props.ticketmaster);
  console.log("setlist", props.setlist);

  return (
    <>
      {uniqueSetlist
        .map((setlist, index) => {
          const concert = setlist;

          const artistId = concert.artist.mbid;

          const concertId = concert.id;

          const artist = concert.artist.name;

          const tour = concert?.tour?.name;

          const lastConcert = concert.eventDate;

          //Find spotify link and image for specific artist
          const ticketmasterMap = props.ticketmaster.attractions.find(
            (item) => item.name === artist
          );

          let spotify = null;
          let artistImage = logo;
          if (
            ticketmasterMap &&
            ticketmasterMap.externalLinks &&
            ticketmasterMap.externalLinks.spotify
          ) {
            spotify = ticketmasterMap.externalLinks.spotify[0].url;
          }

          if (ticketmasterMap && ticketmasterMap.images) {
            artistImage = ticketmasterMap.images[0].url;
          }

          // Filter for only attractions from events
          const ticketmasterEvents = props.ticketmaster.events
            .map((item) => {
              return item;
            })
            .filter((item) => {
              if (item._embedded.attractions !== undefined) {
                for (const attraction of item._embedded.attractions) {
                  if (attraction.name === artist) {
                    return item;
                  }
                }
              }
            })
            .sort((a, b) => a.dates.start.localDate - b.dates.start.localDate);

          console.log("ticketmasterEvents", ticketmasterEvents);

          let localDate = null;

          if (ticketmasterEvents[0] && ticketmasterEvents[0].dates) {
            localDate = ticketmasterEvents[0].dates.start.localDate;
          }

          //Flatten the array of objects
          // const ticketmasterEventsFlat = ticketmasterEvents.flat();

          // // Find upcoming concert for specific artist
          // const ticketmasterEventsMap = ticketmasterEventsFlat.find(
          //   (item) => item.name === artist
          // );

          // const ticketmasterEvents = props.ticketmaster.events.find((item) => {
          //   return item.name.includes(`${artist}:`) || item.name === artist;
          // });

          // let localDate = null;

          // if (
          //   ticketmasterEvents &&
          //   ticketmasterEvents.dates &&
          //   ticketmasterEvents.dates.start &&
          //   ticketmasterEvents.dates.start.localDate
          // ) {
          //   localDate = ticketmasterEvents.dates.start.localDate;
          // }

          return (
            <div key={artistId} className="search-page-card">
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
                className={`favourite-icon${
                  props.favourites.find((item) => item.artistid === artistId)
                    ? " active"
                    : ""
                }`}
                onClick={() => handleFavourite(artistId, artist, artistImage)}
              />
              <div className="search-page-box">
                <button className="search-page-button">Next concert</button>
                <h3>
                  {localDate ? nextConcertDate(localDate) : "Unavailable"}
                </h3>
              </div>
              <div className="search-page-box">
                <button className="search-page-button">Last Concert</button>
                <h3>{lastConcertDate(setlist.eventDate)}</h3>
              </div>
              <div className="search-page-box">
                <button className="search-page-button">
                  <a href={spotify} target="_blank" rel="noopener noreferrer">
                    Play now!
                  </a>
                </button>
              </div>
            </div>
          );
        })
        .slice(0, 5)}
    </>
  );
}
