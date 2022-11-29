export default function Setlist(props) {

  const songs = props.results[props.index].sets.set[0]?.song || [];

  const songsList = songs?.map(song => {
    return song.name;
  });

  return (
    <>
      <h2>Setlist:</h2>
      <ul>
        <p>
          {songsList.length === 0
            ? "There are no songs in this setlist.\n Please come back later"
            : songsList.map((song, songIndex) => (
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