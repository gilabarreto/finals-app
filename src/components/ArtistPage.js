import { useState } from "react";
import { useParams } from "react-router-dom";

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
  let { concertId, artistId } = useParams();

  if (props.setlist.length === 0 || props.ticketmaster === undefined) {
    return null;
  }

  const concert = props.setlist.find((result) => result.id === concertId);

  /*   let previousConcertId;
  let nextConcertId;

  const concert = props.setlist.find((result, index) => {
    if (result.id === concertId) {
      previousConcertId = props.setlist[index + 1]?.id;
      let nextConcert = props.setlist[index - 1];
      if (nextConcert) {
        const [day, month, year] = nextConcert.eventDate.split("-");
        const nextConcertDate = new Date(year, month - 1, day);
        if (nextConcertDate < new Date()) {
          nextConcertId = nextConcert.id;
        }
      }
      return true;
    }
  }); */

  return (
    <div>
      <div className="artist-page-top-container">
        <div className="artist-page-concert-info">
          <ConcertInfo
            concert={concert}
            setlist={props.setlist}
            ticketmaster={props.ticketmaster}
            // previousConcertId={previousConcertId} // Victor
            // nextConcertId={nextConcertId} // Victor
          />
        </div>
        <div className="artist-page-map">
          {props.ticketmaster ? <Map concert={concert} /> : null}
        </div>
      </div>
      <div className="artist-page-bottom-container">
        <div className="artist-page-bottom-left-container">
          <div className="artist-page-setlist">
            <Setlist concert={concert} />
          </div>
          <div className="artist-page-spotify">
            <Player
              concert={concert}
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
              <UpcomingConcertList
                ticketmaster={props.ticketmaster}
                setlist={props.setlist}
                concert={concert}
              />
            </p>
          </div>
          <div className="artist-page-previous-concerts">
            <span style={{ fontWeight: "bold" }}>Previous Concerts:</span>
            <p>
              <div>
                <PreviousConcerts
                  concert={concert}
                  setlist={props.setlist}
                  artistId={artistId}
                />
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
