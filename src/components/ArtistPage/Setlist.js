export default function Setlist(props) {

  return (
    <>
      <h2>Setlist:</h2>
      <ul>
        <p>
          {props.songsList.length === 0
            ? "There are no songs in this setlist.\n Please come back later"
            : props.songsList.map((song, songIndex) => (
              <li key={songIndex}>{song}</li>
            ))}
        </p>
      </ul>
      <p>
        <h1>Listen to the Setlist songs here</h1>
      </p>
    </>
  )
}