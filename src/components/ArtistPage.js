import { useState } from "react";

import { Link } from "react-router-dom";

import {
  latitudeFinder,
  longitudeFinder,
  ticketFinder,
} from "../helpers/selectors";

import SpotifyPlayer from "react-spotify-player";

import Map from "./Map";

import "./styles/styles.css";
import UpcomingConcertList from "./UpcomingConcertList";

import SpotifyApp from "./SpotifyAuth";

export default function ArtistPage(props) {
  const [index, setIndex] = useState(0);

  if (props.results.length === 0 || props.ticketmaster === undefined) {
    return null;
  }

  const increase = () => {
    if (index === artistInfo.length - 1) {
      return;
    }
    return setIndex(index + 1);
  };

  const decrease = () => {
    if (index === 0) {
      return;
    }
    return setIndex(index - 1);
  };

  // console.log(props);
  // console.log("props.ticketmaster", props.ticketmaster)
  // console.log("ticketFinder", ticketFinder(props.ticketmaster))

  // const upcomingConcerts = props.ticketmaster?.events?.map(upcomingConcert => {
  //   const str = upcomingConcert.dates.start.localDate;
  //   const [year, month, day] = str.split("-");
  //   const newConcertDate = new Date(+year, month - 1, +day);
  //   return newConcertDate.toDateString();
  // });

  const artistInfo = props.results;

  const concert = props.results[index];

  const coordinates = concert.venue.city.coords;

  const artist = concert.artist.name;

  const previousConcerts = artistInfo.map(previousConcert => {
    const str = previousConcert.eventDate;
    const [day, month, year] = str.split("-");
    const date = new Date(year, month - 1, day);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const city = previousConcert.venue.city?.name;
    const state = previousConcert.venue.city?.state;
    const country = previousConcert.venue.city?.country.code;
    return `${date.toLocaleDateString(
      "en-US",
      options
    )} (${city}, ${state}, ${country})`;
  });

  const tour = concert.tour?.name || "No tour name";

  const venue = concert.venue?.name;

  const city = concert.venue.city?.name;

  const state = concert.venue.city?.state;

  const stateCode = concert.venue.city?.stateCode;

  const country = concert.venue.city?.country.code;

  const concertDate = () => {
    const [day, month, year] = concert.eventDate.split("-");
    const mainConcertDate = new Date(year, month - 1, day);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return mainConcertDate.toLocaleDateString("en-US", options);
  };

  const songs = concert.sets.set[0]?.song || [];

  const list = songs?.map(song => {
    return song.name;
  });

  // Spotify Player
  const spotify = props.ticketmaster.attractions
    ? props.ticketmaster.attractions[0].externalLinks.spotify[0].url
    : null;

  const size = {
    width: "100%",
    height: 500,
  };
  const view = "list"; // or 'coverart'
  const theme = "black"; // or 'white'

  console.log("ArtistPage props.token -----", props.token);

  console.log("songs----", songs);
  console.log("list----", list);

  // const searchMusics = async e => {
  //   e.preventDefault();
  //   const { data } = await axios.get("https://api.spotify.com/v1/search", {
  //     headers: {
  //       Authorization: `Bearer ${props.token}`,
  //     },
  //     params: {
  //       q: searchKey,
  //       type: "track",
  //     },
  //   });

  //   setArtists(data.artists.items);
  // };

  return (
    <div>
      <div className="artist-page-top-container">
        <div className="artist-page-concert-info">
          <ol>
            <h2 className="artist-page-button-aligner">
              <button
                className="artist-page-increase-decrease"
                onClick={increase}
              >
                &lt;
              </button>
              &ensp;Concert Date: {concertDate()}&ensp;
              <button
                className="artist-page-increase-decrease"
                onClick={decrease}
              >
                &gt;
              </button>
            </h2>
            <h2>Artist: {artist}</h2>
            <h2>Tour: {tour}</h2>
            <h2>Venue: {venue}</h2>
            <h2>
              Location: {city}, {state}, {country}
            </h2>
          </ol>
        </div>
        <div className="artist-page-map">
          {props.ticketmaster ? (
            <Map latitude={coordinates.lat} longitude={coordinates.long} />
          ) : null}
        </div>
      </div>
      <div className="artist-page-bottom-container">
        <div className="artist-page-bottom-left-container">
          <div className="artist-page-setlist">
            <h2>Setlist:</h2>
            <ul>
              <p>
                {list.length === 0
                  ? "There are no songs in this setlist.\n Please come back later"
                  : list.map((song, songIndex) => (
                      <li key={songIndex}>{song}</li>
                    ))}
              </p>
            </ul>
            <p>
              <h1>Listen to the Setlist songs here</h1>
            </p>
          </div>
          {/* <div className="artist-page-spotify">
            <SpotifyPlayer
              uri={spotify}
              size={size}
              view={view}
              theme={theme}
            />
          </div> */}
        </div>
        <div className="artist-page-bottom-right-container">
          <div className="artist-page-upcoming-concerts">
            <span style={{ fontWeight: "bold" }}>Upcoming Concerts:</span>
            <p>
              <UpcomingConcertList ticketmaster={props.ticketmaster} />
            </p>
          </div>
          <div className="artist-page-previous-concerts">
            <span style={{ fontWeight: "bold" }}>Previous Concerts:</span>
            <p>
              <div>
                {previousConcerts
                  .map((previousConcert, index) => (
                    <li key={previousConcert}>
                      <a className="prevConc" onClick={() => setIndex(index)}>
                        {previousConcert}
                      </a>
                    </li>
                  ))
                  .slice(0, 10)}
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
