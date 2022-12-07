import { useState } from "react";
import { useParams } from "react-router-dom";

import "./styles/styles.css";

import ConcertInfo from "./ArtistPage/ConcertInfo";
import Map from "./ArtistPage/Map";
import Setlist from "./ArtistPage/Setlist";
import Player from "./ArtistPage/Player";
import UpcomingConcertList from "./ArtistPage/UpcomingConcertList";
import PreviousConcerts from "./ArtistPage/PreviousConcerts";

export default function ArtistPage(props) {
  const [spotifyArtist, setSpotifyArtist] = useState([]); // or track
  let { concertId, artistId } = useParams();

  if (props.setlist.length === 0 || props.ticketmaster === undefined) {
    return null;
  }

  const concert = props.setlist.find((result) => result.id === concertId);

  return (
    <div>
      <div className="artist-page-top-container">
        <div className="artist-page-concert-info">
          <ConcertInfo
            concert={concert}
            setlist={props.setlist}
            ticketmaster={props.ticketmaster}
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
            <span className="next-concerts">Upcoming Concerts</span>
            <p>
              <UpcomingConcertList
                ticketmaster={props.ticketmaster}
                setlist={props.setlist}
                concert={concert}
              />
            </p>
          </div>
          <div className="artist-page-previous-concerts">
            <span className="prevConc-title">Previous Concerts</span>
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
