import { FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";

import ConcertDate from "./ConcertDate"

export default function ConcertInfo(props) {


  return (

    <>
      <ol>
        <ConcertDate index={props.index} setIndex={props.setIndex} artistInfo={props.artistInfo} concert={props.concert} />
        <h2>
          Artist: {props.artist}
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
        <h2 className="tour">Tour: {props.tour}</h2>
        <h2>Venue: {props.venue}</h2>
        <h2>
          Location: {props.city}, {props.state}, {props.country}
        </h2>
      </ol>
    </>

  )
}