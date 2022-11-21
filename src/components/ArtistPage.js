import ArtistTour from "./ArtistTour";
import PreviousConcerts from "./PreviousConcerts";
import Setlist from "./Setlist";
import TourDate from "./TourDate";
import UpcomingConcerts from "./UpcomingConcerts";
import "./styles/styles.css";

export default function ArtistPage(props) {
  if (props.results.length === 0) {
    return null;
  }

  const artistInfo = props.results

  console.log("artist info", artistInfo)

  const concert = props.results[0];

  const artist = concert.artist.name

  const tour = concert.tour?.name

  const venue = concert.venue?.name

  const city = concert.city?.name

  const concertDate = concert.eventDate

  const previousConcerts = artistInfo.forEach((result) => {
    console.log(result.eventDate)
  })

  const songs = concert.sets.set[0]?.song || [];

  const list = songs?.map((song) => {
    return song.name
  })

  return (
    <div>
      <div className="container-1">
        <div className="box-1">

          <h2>Concert Date: {concertDate}</h2>
        </div>
        <div className="box-2">
          <h2>Artist: {artist}</h2>
          <h2>Tour: {tour}</h2>
          <h2>Venue: {venue}</h2>
          <h2>City: {city}</h2>
        </div>
      </div>
      <div className="container-4">
        <div className="container-2">
          <ul className="box-3">{list.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="container-3">
          <UpcomingConcerts />
          <div className="box-5">
            <h2>{previousConcerts}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
