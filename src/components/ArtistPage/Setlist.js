export default function Setlist(props) {

  const songs = props.concert.sets.set[0]?.song || [];

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
    </>
  )
}