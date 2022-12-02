import SpotifyAuth from "./SpotifyAuth";

export default function Main(props) {
  return (
    <div className="main-page-card">
      <h1>
        Keep track of your favorite artist by login in to your Spotify Account.
      </h1>
      <SpotifyAuth setGlobalSpotifyToken={props.setGlobalSpotifyToken} />
    </div>
  );
}
