import axios from "axios";
import SpotifyPlayer from "react-spotify-player";

export default function Player(props) {
  const artist = props.concert.artist.name;

  const spotify = props.ticketmaster.attractions
    ? props.ticketmaster.attractions[0].externalLinks.spotify[0].url
    : null;

  const size = {
    width: "100%",
    height: 500,
  };
  const view = "list"; // or 'coverart'
  const theme = "black"; // or 'white'

  return (
    <>
      <SpotifyPlayer uri={spotify} size={size} view={view} theme={theme} />
    </>
  );
}
