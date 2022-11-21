import React, { useEffect } from "react";

export default function SearchPage(props) {
  if (props.results.length === 0) {
    return null;
  }
  
  const concert = props.results[0];
 
  const artist = concert.artist.name

  const tour = concert.tour?.name

  const lastConcert = concert.eventDate

  const songs = concert.sets.set[0]?.song || [];

  const list = songs?.map((song) => {
    return song.name
  })

  return (
    <div>
      <h1>Arstist Name: {artist}</h1> 
      <h2>Tour Name: {tour}</h2>
      <h2>Last Concert: {lastConcert}</h2>
      <h2>Last Setlist:</h2>
      <ul>{list.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  )

}