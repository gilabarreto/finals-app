import { FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";

import ConcertDate from "./ConcertDate";

export default function ConcertInfo(props) {
  
  // const { previousConcertId, nextConcertId } = props; // Victor
  
  const artistInfo = props.setlist;

  const concert = props.concert;

  const artist = concert.artist.name;

  const tour = concert.tour?.name || "No tour name";

  const venue = concert.venue?.name;

  const city = concert.venue.city?.name;

  const state = concert.venue.city?.state;

  const country = concert.venue.city?.country.code;

  return (
    <>
      <ol>
        <ConcertDate 
        concert={concert}
        setlist={props.setlist} 
        artistInfo={artistInfo} />
        <h2>
          Artist:&ensp;{artist}
        </h2>
          <h2 className="tour">Tour:&ensp;{tour}</h2>
          <h2>Venue:&ensp;{venue}</h2>
          <h2>
          Location:&ensp;{city}, {state}, {country}
        </h2>
        <div className="socials-icons">
        {props.ticketmaster.attractions ? (
            <a
              href={
                props.ticketmaster.attractions[0].externalLinks.youtube[0].url
              }
              target="_blank"
            >
              <FaYoutube
                style={{ color: "red", paddingLeft: 5, paddingRight: "2em", height: "2em", width: "2em"}}
              />
            </a>
          ) : null}
          {props.ticketmaster.attractions ? (
            <a
              href={
                props.ticketmaster.attractions[0].externalLinks.instagram[0].url
              }
              target="_blank"
            >
              <FaInstagram style={{ color: "hotpink", paddingRight: "2em", height: "2em", width: "2em"}} />
            </a>
          ) : null}
          {props.ticketmaster.attractions ? (
            <a
              href={
                props.ticketmaster.attractions[0].externalLinks.twitter[0].url
              }
              target="_blank"
            >
              <FaTwitter style={{ color: "#1DA1F2", height: "2em", width: "2em", paddingRight: "2em"}} />
            </a>
          ) : null}
         </div>
      </ol>
    </>
  );
}
