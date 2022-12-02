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

  if (props.setlist.length === 0 || props.ticketmaster === undefined) {
    return null;
  }

  const uniqueIds = [];

  const uniqueSetlist = props.setlist.filter((item) => {
    const isDuplicate = uniqueIds.includes(item.artist.mbid);

    if (!isDuplicate) {
      uniqueIds.push(item.artist.mbid);

      return true;
    }
    return false;
  });

  console.log(uniqueSetlist)
  console.log(uniqueIds)

  return (
    <div>
      <div className="artist-page-top-container">
        <div className="artist-page-concert-info">
          <ConcertInfo index={index} setIndex={setIndex} setlist={props.setlist} ticketmaster={props.ticketmaster} />
        </div>
        <div className="artist-page-map">
          <Map index={index} setlist={props.setlist} />
        </div>
      </div>
      <div className="artist-page-bottom-container">
        <div className="artist-page-bottom-left-container">
          <div className="artist-page-setlist">
            <Setlist setlist={props.setlist} index={index} />
          </div>
          <div className="artist-page-spotify">
            <Player
              index={index}
              setlist={props.setlist}
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
                <PreviousConcerts setIndex={setIndex} index={index} setlist={props.setlist} />
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
