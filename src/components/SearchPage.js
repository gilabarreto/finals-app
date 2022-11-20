import React, { useEffect } from "react";

export default function SearchPage(props) {
  if (props.results.length === 0) {
    return null;
  }
  
  const concert = props.results[0];
 
  const artist = concert.artist.name

  const lastConcert = concert.eventDate

  const songs = concert.sets.set[0]?.song || [];

  const list = songs?.map((song) => {
    return song.name
  })

  return (
    <div>
      <h1>{artist}</h1> 
      <h2>{lastConcert}</h2>
      <ul>{list.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  )

}