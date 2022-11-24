
import { useState } from "react";

import { latitudeFinder, longitudeFinder } from "../helpers/selectors";

import Map from "./Map";

import "./styles/styles.css";

export default function ArtistPage(props) {
  const [index, setIndex] = useState(0);

  if (props.results.length === 0) {
    return null;
  }

  const increase = () => {
    if (index === artistInfo.length - 1) {
      return
    }
    return setIndex(index + 1);
  }

  const decrease = () => {
    if (index === 0) {
      return
    }
    return setIndex(index - 1);
  }

  console.log(props.results)
  console.log(props.ticketmaster)

  const upcomingConcerts = props.ticketmaster?.events
    ?.map((upcomingConcert) => {
      const str = upcomingConcert.dates.start.localDate;
      const [year, month, day] = str.split('-');
      const newConcertDate = new Date(+year, month-1, +day);
      return (newConcertDate.toDateString());
    })
    .sort();

  const artistInfo = props.results

  const concert = props.results[index];

  const coordinates = concert.venue.city.coords

  const artist = concert.artist.name

  const previousConcerts = artistInfo.map((previousConcert) => {
    const str = previousConcert.eventDate;
    const [day, month, year] = str.split('-');
    const date = new Date(+year, month - 1, +day);
    return (date.toDateString());
  })

  // console.log(previousConcerts);

  const tour = concert.tour?.name

  const venue = concert.venue?.name

  const city = concert.venue.city?.name

  const state = concert.venue.city?.state

  const stateCode = concert.venue.city?.stateCode

  const country = concert.venue.city?.country.code

  const concertDate = () => {
    const [day, month, year] = concert.eventDate.split('-');
    const mainConcertDate = new Date(+year, month - 1, +day);
    return (mainConcertDate.toDateString());
    }

  const songs = concert.sets.set[0]?.song || [];

  const list = songs?.map((song) => {
    return song.name
  })

  return (
    <div>
      <div className="container-1">
        <div className="box-1">
          <ol>
            <h2><button onClick={increase}>Decrease</button>
              Concert Date: {concertDate()}
              <button onClick={decrease}>Increase</button>
            </h2>
            <h2>Artist: {artist}</h2>
            <h2>Tour: {tour}</h2>
            <h2>Venue: {venue}</h2>
            <h2>Location: {city}, {state}, {country}</h2>
          </ol>
        </div>
        <div className="box-2">
          {props.ticketmaster ? <Map latitude={coordinates.lat} longitude={coordinates.long} /> : null}
        </div>
      </div>
      <div className="container-4">
        <div className="container-2">
          <ul className="box-3">
            Setlist:
            <p>
              {list.length === 0 ?
                "There are no songs in this setlist.\n Please come back later" :
                list.map((song, songIndex) => <li key={songIndex}>{song}</li>
                )}
            </p>
          </ul>
        </div>
        <div className="container-3">
          <div className="box-4">
            Upcoming Concerts:
            <p>
              {upcomingConcerts === undefined ?
                "There are no upcoming concerts.\n Please come back later" :
                upcomingConcerts.map((upcomingConcert, upcomingConcertIndex) =>
                  <li key={upcomingConcertIndex}>{upcomingConcert.split("-").reverse().join("-")}</li>
                ).slice(0, 10)}
            </p>
          </div>
          <div className="box-5">
            Previous Concerts:
            <p>
              {previousConcerts.map((previousConcert) => <li key={previousConcert}>{previousConcert}</li>).slice(0, 10)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
