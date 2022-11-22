import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom"

export default function SearchPage(props) {
  const [index, setIndex] = useState(0);

  const navigate = useNavigate()

  if (props.results.length === 0) {
    return null;
  }

  const nextConcert = props.ticketmaster?.events[props.ticketmaster.events.length - 1].dates.start.localDate

  const concert = props.results[index];

  const artist = concert.artist.name

  const tour = concert.tour?.name

  const lastConcert = concert.eventDate

  if (new Date(lastConcert.split("-").reverse().join()) > new Date()) {
    return setIndex(index + 1)
  }

  return (
    <div>
      <h1 onClick={() => { navigate("/artist") }} >Artist Name: {artist}</h1>
      <h2>Tour Name: {tour}</h2>
      <h2>Next concert: {nextConcert}</h2>
      <h2>Last Concert: <Link to='/artist'>{lastConcert}</Link></h2>
    </div>
  )

}