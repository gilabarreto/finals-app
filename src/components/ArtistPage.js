import { useState } from "react";

import axios from "axios";
import SpotifyPlayer from "react-spotify-player";

import { Link } from "react-router-dom";

import "./styles/styles.css";

import Map from "./Map";
import UpcomingConcertList from "./ArtistPage/UpcomingConcertList";
import PreviousConcerts from "./ArtistPage/PreviousConcerts";
import ConcertInfo from "./ArtistPage/ConcertInfo";
import Setlist from "./ArtistPage/Setlist";

export default function ArtistPage(props) {
  const [index, setIndex] = useState(0);
  const [spotifyArtist, setSpotifyArtist] = useState([]); // or track

  if (props.results.length === 0 || props.ticketmaster === undefined) {
    return null;
  }

  const artistInfo = props.results;

  const concert = props.results[index];

  const coordinates = concert.venue.city.coords;

  const artist = concert.artist.name;

  const tour = concert.tour?.name || "No tour name";

  const venue = concert.venue?.name;

  const city = concert.venue.city?.name;

  const state = concert.venue.city?.state;

  const stateCode = concert.venue.city?.stateCode;

  const country = concert.venue.city?.country.code;

  const songs = concert.sets.set[0]?.song || [];

  const songsList = songs?.map(song => {
    return song.name;
  });

  // // Spotify Player
  const spotify = props.ticketmaster.attractions
    ? props.ticketmaster.attractions[0].externalLinks.spotify[0].url
    : null;

  const size = {
    width: "100%",
    height: 500,
  };
  const view = "list"; // or 'coverart'
  const theme = "black"; // or 'white'

  const searchArtists = async () => {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
      params: {
        q: artist,
        type: "artist",
      },
    });
    setSpotifyArtist(response.data.artists.items[0].uri);
    return spotifyArtist;
  };

  searchArtists();

  return (
    <div>
      <div className="artist-page-top-container">
        <div className="artist-page-concert-info">
          <ConcertInfo
            index={index}
            setIndex={setIndex}
            artist={artist}
            artistInfo={artistInfo}
            concert={concert}
            tour={tour}
            venue={venue}
            city={city}
            state={state}
            country={country}
            ticketmaster={props.ticketmaster}

          />
        </div>
        <div className="artist-page-map">
          {props.ticketmaster ? (<Map latitude={coordinates.lat} longitude={coordinates.long} />) : null}
        </div>
      </div>
      <div className="artist-page-bottom-container">
        <div className="artist-page-bottom-left-container">
          <div className="artist-page-setlist">
            <Setlist songsList={songsList} />
          </div>
          <div className="artist-page-spotify">
            <SpotifyPlayer
              uri={spotify}
              size={size}
              view={view}
              theme={theme}
            />
          </div>
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
                <PreviousConcerts setIndex={setIndex} artistInfo={artistInfo} />
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
