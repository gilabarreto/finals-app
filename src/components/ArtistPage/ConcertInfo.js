import { FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";

import ConcertDate from "./ConcertDate"

export default function ConcertInfo(props) {

  const artistInfo = props.setlist;

  const concert = props.setlist[props.index];

  const artist = concert.artist.name;

  const tour = concert.tour?.name || "No tour name";

  const venue = concert.venue?.name;

  const city = concert.venue.city?.name;

  const state = concert.venue.city?.state;

  const country = concert.venue.city?.country.code;

  return (

    <>
      <ol>
        <ConcertDate index={props.index} setIndex={props.setIndex} artistInfo={artistInfo} concert={concert} />
        <h2>
          Artist: {artist}
          {props.ticketmaster.attractions ?
            <a href={props.ticketmaster.attractions[0].externalLinks.youtube[0].url} target="_blank">
              <FaYoutube style={{ color: "red", paddingLeft: 5, paddingRight: 5 }} />
            </a> : null}
          {props.ticketmaster.attractions ?
            <a href={props.ticketmaster.attractions[0].externalLinks.instagram[0].url} target="_blank">
              <FaInstagram style={{ color: "hotpink", paddingRight: 5 }} />
            </a> : null}
          {props.ticketmaster.attractions ?
            <a href={props.ticketmaster.attractions[0].externalLinks.twitter[0].url} target="_blank">
              <FaTwitter style={{ color: "#1DA1F2" }} />
            </a> : null}

        </h2>
        <h2 className="tour">Tour: {tour}</h2>
        <h2>Venue: {venue}</h2>
        <h2>
          Location: {city}, {state}, {country}
        </h2>
      </ol>
    </>

  )
}