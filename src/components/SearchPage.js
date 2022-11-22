import { useNavigate, Link } from "react-router-dom"

export default function SearchPage(props) {
  const navigate = useNavigate()

  if (props.results.length === 0) {
    return null;
  }

  const nextConcert = props.ticktmaster

  console.log("props", props)

  console.log("props.ticketmaster", nextConcert)

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
      <h1 onClick={() => { navigate("/artist") }} >Artist Name: {artist}</h1>
      <h2>Tour Name: {tour}</h2>
      {/* <h2>Next concert: {nextConcert}</h2> */}
      <h2>Last Concert: <Link to='/artist'>{lastConcert}</Link></h2>
      <h2>Last Setlist:</h2>
      <ul>{list.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  )

}