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

  const searchArtists = async () => {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
      params: {
        q: artist,
        type: "artist",
      },
    });
    props.setSpotifyArtist(response.data.artists.items[0].uri);
    return props.spotifyArtist;
  };

  searchArtists();

  return (
    <>
      <SpotifyPlayer
        uri={spotify}
        size={size}
        view={view}
        theme={theme}
      />
    </>
  )

}