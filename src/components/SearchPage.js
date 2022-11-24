import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom"

export default function SearchPage(props) {
  const [index, setIndex] = useState(0);

  const navigate = useNavigate()

  if (props.results.length === 0) {
    return null;
  }

  if (props.ticketmaster.events === undefined) {
    return null
  }

  const nextConcert = props.ticketmaster?.events.map((upcomingConcert) => {
    const str = upcomingConcert.dates.start.localDate;
    const [year, month, day] = str.split('-');
    const date = new Date(+year, month - 1, +day).toDateString();
    return date;
  })

  const artistImage = props.ticketmaster?.events[0].images[0].url;

  const concert = props.results[index];

  const artist = concert.artist.name

  const tour = concert.tour?.name

  const lastConcert = concert.eventDate

  const lastConcertDate = () => {
    const str = concert.eventDate;
    const [day, month, year] = str.split('-');
    const date = new Date(+year, month - 1, +day);
    return date.toDateString();
  }


  if (new Date(lastConcert.split("-").reverse().join()) > new Date()) {
    return setIndex(index + 1)
  }

  return (
    <div className="box-1">
      <div className="box-2">
        <img src = {artistImage} />
      </div>
      <div>
        <h3 onClick={() => { navigate("/artist") }} >{artist}</h3>
        {tour && <h2>Tour Name: {tour}</h2>}
      </div>
      <div className="box-3">
        <h3>Next concert: {nextConcert[0]}</h3>
      </div>
      <div className="box-3">
        <h3>Last Concert: <Link to='/artist'>{lastConcertDate()}</Link></h3>
      </div>
      <div className="box-3">
        <h3>Play now!</h3>
      </div>
    </div>
  )

}