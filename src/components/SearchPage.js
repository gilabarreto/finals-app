import React, { useEffect } from "react";

export default function SearchPage(props) {
  if (props.results.length === 0) {
    return null;
  }
  
  console.log("props.results:", props.results)
  const last_concert = props.results[0];
  console.log(last_concert)
 
  const artist = last_concert.artist.name

  const lastConcert = last_concert.eventDate

  const songs = last_concert.sets.set[0]?.song || [];

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