import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Setlist(props) {
  const songs = props.concert.sets.set[0]?.song || [];

  const songsList = songs?.map((song) => {
    return song.name;
  });

  return (
    <>
      <span className="setlist-title">Setlist</span>
      <ul className="setlist-songs-ul">
        <p>
          {songsList.length === 0
            ? "There are no songs in this setlist.\n Please come back later"
            : songsList.map((song, songIndex) => (
                <div className="setlist-songs">
                  <FontAwesomeIcon
                    icon="fa-solid fa-music"
                    key={songIndex}
                  ></FontAwesomeIcon>
                  &ensp;{song}
                </div>
              ))}
        </p>
      </ul>
    </>
  );
}
