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
    return (result.sets.set[0].song)
  })

  const list = songs.map((song) => {

    const songsList = [];
    if (song.length < 1) {
      return null
    }
    else {
      for (let i = 0; i < song.length; i++) {
        songsList.push(song[Object.keys(song)[i]].name);
      }
    }
    return songsList;
  })
  /*   const list = songs.map((result) => {
      console.log(result.name)
    })  */


  /*   const arr = props.results.map((result) => {
          
      const dates = result.eventDate;
  
      const sortDates = dates.sort((result) => {
        return result.eventDate;
      });
      
      return sortDates
    }) */


  return (
    <div>
      <h1>{artist}</h1>
      <h2>{lastConcert}</h2>
      <h2>{list}</h2>
    </div>
  )

}