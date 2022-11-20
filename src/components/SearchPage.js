import React, { useEffect } from "react";

export default function SearchPage(props) {

  /*   useEffect(() => {
      console.log("search page", props)
    }, []) */

  const artist = props.results.map((result) => {

    return result.artist.name
  })
  const lastConcert = props.results.map((result) => {

    return result.eventDate
  })

  const songs = props.results.map((result) => {
    if (result.sets.set[0] === undefined) {
      return (result.sets.set)
    } else {
        return (result.sets.set[0].song)  
    }
  })

  const list = songs.map((song) => {
    const songsList = [];
      for (let i = 0; i < song.length; i++) {
        songsList.push(song[Object.keys(song)[i]].name);
      }
    return songsList;
  })

  const myLists = list[0]
  // const myLists = ['Adib', 'Victor'];
  const listItems = myLists.map((myList) => {
    return <li>{myList}</li>;
  })

  return (
    <div>
      <h1>{artist}</h1>
      <h2>{lastConcert}</h2>
      <ul>{listItems}</ul>
    </div>
  )

}