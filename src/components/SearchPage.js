import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"

import "./Main.css"

export default function SearchPage(props) {
  const [index, setIndex] = useState(0);

  const navigate = useNavigate()

  if (props.results.length === 0) {
    return (
      <div className="main-page-card">
        <h1>Keep track of your favorite artist.</h1>
      </div>
    )
  }

  const nextConcert = props.ticketmaster.events ?
    props.ticketmaster.events.map((upcomingConcert) => {
      const str = upcomingConcert.dates.start.localDate;
      const [year, month, day] = str.split('-');
      const date = new Date(year, month - 1, day);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    }) : [];

  console.log(props.ticketmaster)

  const artistImage = props.ticketmaster.events ? props.ticketmaster.events[0].images[0].url : null

  const concert = props.results[index];

  const artist = concert.artist.name

  const tour = concert?.tour?.name

  const spotify = props.ticketmaster.attractions ? props.ticketmaster.attractions[index].externalLinks.spotify[index].url : null

  const lastConcert = concert.eventDate

  const lastConcertDate = () => {
    const str = concert.eventDate;
    const [day, month, year] = str.split('-');
    const date = new Date(year, month - 1, day);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  if (new Date(lastConcert.split("-").reverse().join()) > new Date()) {
    return setIndex(index + 1)
  }

  return (
    <div className="search-page-card" id="example-panel">
      <div className="search-page-image-box">
        <img src={artistImage} className="search-page-image" onClick={() => { navigate("/artist"); }} />
      </div>
      <div className="search-page-info-box">
        <h1>{artist}</h1>
        {tour && <h3>Tour: {tour}</h3>}
      </div>
      <div className="search-page-box">
        <button className="search-page-button">Next concert</button>
        <h3>{nextConcert[0]}</h3>
      </div>
      <div className="search-page-box">
        <button className="search-page-button"><Link to='/artist'>Last Concert</Link></button>
        <h3>{lastConcertDate()}</h3>
      </div>
      <div className="search-page-box">
        <button className="search-page-button"><a href={spotify} target="_blank" rel="noopener noreferrer">Play now!</a></button>
      </div>
    </div>
  )
}