import { useState } from "react";

import "./styles/styles.css";

import ConcertInfo from "./ArtistPage/ConcertInfo";
import Map from "./ArtistPage/Map";
import Setlist from "./ArtistPage/Setlist";
import Player from "./ArtistPage/Player";
import UpcomingConcertList from "./ArtistPage/UpcomingConcertList";
import PreviousConcerts from "./ArtistPage/PreviousConcerts";

/* import axios from "axios";
import SpotifyPlayer from "react-spotify-player";
import { Link } from "react-router-dom"; */

export default function ArtistPage(props) {
  const [index, setIndex] = useState(0);
  const [spotifyArtist, setSpotifyArtist] = useState([]); // or track

  if (props.results.length === 0 || props.ticketmaster === undefined) {
    return null;
  }

  /*   const artistInfo = props.results;
  
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
  
    console.log(concert)
    console.log(songsList)
    console.log(songs)
  
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
  
    searchArtists(); */

  return (
    <div>
      <div className="artist-page-top-container">
        <div className="artist-page-concert-info">
          <ConcertInfo index={index} setIndex={setIndex} results={props.results} ticketmaster={props.ticketmaster} />
        </div>
        <div className="artist-page-map">
          <Map index={index} results={props.results} />
        </div>
      </div>
      <div className="artist-page-bottom-container">
        <div className="artist-page-bottom-left-container">
          <div className="artist-page-setlist">
            <Setlist results={props.results} index={index} />
          </div>
          <div className="artist-page-spotify">
            <Player
              index={index}
              results={props.results}
              ticketmaster={props.ticketmaster}
              spotifyArtist={spotifyArtist}
              setSpotifyArtist={setSpotifyArtist}
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
                <PreviousConcerts setIndex={setIndex} index={index} results={props.results} />
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
