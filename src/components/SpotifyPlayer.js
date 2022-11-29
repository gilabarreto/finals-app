var redirect_uri = "http://localhost:3000/artist/"; // change this your value

var client_id = "0ef6de7e366a4feaac8a1bb1c754c909";
var client_secret = "8ae3c3fc9cbc49ad9f298f1059fb2645"; // In a real app you should not expose your client_secret to the user

var access_token = null;
var refresh_token = null;
var currentPlaylist = "";
var radioButtons = [];

export default function SpotifyAuthPlayer(props) {
  const AUTHORIZE = "https://accounts.spotify.com/authorize";
  const TOKEN = "https://accounts.spotify.com/api/token";
  const PLAYLISTS = "https://api.spotify.com/v1/me/playlists";
  const DEVICES = "https://api.spotify.com/v1/me/player/devices";
  const PLAY = "https://api.spotify.com/v1/me/player/play";
  const PAUSE = "https://api.spotify.com/v1/me/player/pause";
  const NEXT = "https://api.spotify.com/v1/me/player/next";
  const PREVIOUS = "https://api.spotify.com/v1/me/player/previous";
  const PLAYER = "https://api.spotify.com/v1/me/player";
  const TRACKS = "https://api.spotify.com/v1/playlists/{{PlaylistId}}/tracks";
  const CURRENTLYPLAYING =
    "https://api.spotify.com/v1/me/player/currently-playing";
  const SHUFFLE = "https://api.spotify.com/v1/me/player/shuffle";

  function onPageLoad() {
    client_id = localStorage.getItem("client_id");
    client_secret = localStorage.getItem("client_secret");
    if (window.location.search.length > 0) {
      handleRedirect();
    } else {
      access_token = localStorage.getItem("access_token");
      if (access_token == null) {
        // we don't have an access token so present token section
        document.getElementById("tokenSection").style.display = "block";
      } else {
        // we have an access token so present device section
        document.getElementById("deviceSection").style.display = "block";
        refreshDevices();
        refreshPlaylists();
        currentlyPlaying();
      }
    }
    refreshRadioButtons();
  }

  function handleRedirect() {
    let code = getCode();
    fetchAccessToken(code);
    window.history.pushState("", "", redirect_uri); // remove param from url
  }

  function getCode() {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
      const urlParams = new URLSearchParams(queryString);
      code = urlParams.get("code");
    }
    return code;
  }

  function requestAuthorization() {
    client_id = document.getElementById("clientId").value;
    client_secret = document.getElementById("clientSecret").value;
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret); // In a real app you should not expose your client_secret to the user

    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url +=
      "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url; // Show Spotify's authorization screen
  }

  function fetchAccessToken(code) {
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
  }

  function refreshAccessToken() {
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
  }

  function callAuthorizationApi(body) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader(
      "Authorization",
      "Basic " + btoa(client_id + ":" + client_secret)
    );
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
  }

  function handleAuthorizationResponse() {
    if (this.status == 200) {
      var data = JSON.parse(this.responseText);
      console.log(data);
      var data = JSON.parse(this.responseText);
      if (data.access_token != undefined) {
        access_token = data.access_token;
        localStorage.setItem("access_token", access_token);
      }
      if (data.refresh_token != undefined) {
        refresh_token = data.refresh_token;
        localStorage.setItem("refresh_token", refresh_token);
      }
      onPageLoad();
    } else {
      console.log(this.responseText);
      alert(this.responseText);
    }
  }

  function refreshDevices() {
    callApi("GET", DEVICES, null, handleDevicesResponse);
  }

  function handleDevicesResponse() {
    if (this.status == 200) {
      var data = JSON.parse(this.responseText);
      console.log(data);
      removeAllItems("devices");
      data.devices.forEach(item => addDevice(item));
    } else if (this.status == 401) {
      refreshAccessToken();
    } else {
      console.log(this.responseText);
      alert(this.responseText);
    }
  }

  function addDevice(item) {
    let node = document.createElement("option");
    node.value = item.id;
    node.innerHTML = item.name;
    document.getElementById("devices").appendChild(node);
  }

  function callApi(method, url, body, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + access_token);
    xhr.send(body);
    xhr.onload = callback;
  }

  function refreshPlaylists() {
    callApi("GET", PLAYLISTS, null, handlePlaylistsResponse);
  }

  function handlePlaylistsResponse() {
    if (this.status == 200) {
      var data = JSON.parse(this.responseText);
      console.log(data);
      removeAllItems("playlists");
      data.items.forEach(item => addPlaylist(item));
      document.getElementById("playlists").value = currentPlaylist;
    } else if (this.status == 401) {
      refreshAccessToken();
    } else {
      console.log(this.responseText);
      alert(this.responseText);
    }
  }

  function addPlaylist(item) {
    let node = document.createElement("option");
    node.value = item.id;
    node.innerHTML = item.name + " (" + item.tracks.total + ")";
    document.getElementById("playlists").appendChild(node);
  }

  function removeAllItems(elementId) {
    let node = document.getElementById(elementId);
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function play() {
    let playlist_id = document.getElementById("playlists").value;
    let trackindex = document.getElementById("tracks").value;
    let album = document.getElementById("album").value;
    let body = {};
    if (album.length > 0) {
      body.context_uri = album;
    } else {
      body.context_uri = "spotify:playlist:" + playlist_id;
    }
    body.offset = {};
    body.offset.position = trackindex.length > 0 ? Number(trackindex) : 0;
    body.offset.position_ms = 0;
    callApi(
      "PUT",
      PLAY + "?device_id=" + deviceId(),
      JSON.stringify(body),
      handleApiResponse
    );
  }

  function shuffle() {
    callApi(
      "PUT",
      SHUFFLE + "?state=true&device_id=" + deviceId(),
      null,
      handleApiResponse
    );
    play();
  }

  function pause() {
    callApi("PUT", PAUSE + "?device_id=" + deviceId(), null, handleApiResponse);
  }

  function next() {
    callApi("POST", NEXT + "?device_id=" + deviceId(), null, handleApiResponse);
  }

  function previous() {
    callApi(
      "POST",
      PREVIOUS + "?device_id=" + deviceId(),
      null,
      handleApiResponse
    );
  }

  function transfer() {
    let body = {};
    body.device_ids = [];
    body.device_ids.push(deviceId());
    callApi("PUT", PLAYER, JSON.stringify(body), handleApiResponse);
  }

  function handleApiResponse() {
    if (this.status == 200) {
      console.log(this.responseText);
      setTimeout(currentlyPlaying, 2000);
    } else if (this.status == 204) {
      setTimeout(currentlyPlaying, 2000);
    } else if (this.status == 401) {
      refreshAccessToken();
    } else {
      console.log(this.responseText);
      alert(this.responseText);
    }
  }

  function deviceId() {
    return document.getElementById("devices").value;
  }

  function fetchTracks() {
    let playlist_id = document.getElementById("playlists").value;
    if (playlist_id.length > 0) {
      url = TRACKS.replace("{{PlaylistId}}", playlist_id);
      callApi("GET", url, null, handleTracksResponse);
    }
  }

  function handleTracksResponse() {
    if (this.status == 200) {
      var data = JSON.parse(this.responseText);
      console.log(data);
      removeAllItems("tracks");
      data.items.forEach((item, index) => addTrack(item, index));
    } else if (this.status == 401) {
      refreshAccessToken();
    } else {
      console.log(this.responseText);
      alert(this.responseText);
    }
  }

  function addTrack(item, index) {
    let node = document.createElement("option");
    node.value = index;
    node.innerHTML = item.track.name + " (" + item.track.artists[0].name + ")";
    document.getElementById("tracks").appendChild(node);
  }

  function currentlyPlaying() {
    callApi("GET", PLAYER + "?market=US", null, handleCurrentlyPlayingResponse);
  }

  function handleCurrentlyPlayingResponse() {
    if (this.status == 200) {
      var data = JSON.parse(this.responseText);
      console.log(data);
      if (data.item != null) {
        document.getElementById("albumImage").src =
          data.item.album.images[0].url;
        document.getElementById("trackTitle").innerHTML = data.item.name;
        document.getElementById("trackArtist").innerHTML =
          data.item.artists[0].name;
      }

      if (data.device != null) {
        // select device
        currentDevice = data.device.id;
        document.getElementById("devices").value = currentDevice;
      }

      if (data.context != null) {
        // select playlist
        currentPlaylist = data.context.uri;
        currentPlaylist = currentPlaylist.substring(
          currentPlaylist.lastIndexOf(":") + 1,
          currentPlaylist.length
        );
        document.getElementById("playlists").value = currentPlaylist;
      }
    } else if (this.status == 204) {
    } else if (this.status == 401) {
      refreshAccessToken();
    } else {
      console.log(this.responseText);
      alert(this.responseText);
    }
  }

  function saveNewRadioButton() {
    let item = {};
    item.deviceId = deviceId();
    item.playlistId = document.getElementById("playlists").value;
    radioButtons.push(item);
    localStorage.setItem("radio_button", JSON.stringify(radioButtons));
    refreshRadioButtons();
  }

  function refreshRadioButtons() {
    let data = localStorage.getItem("radio_button");
    if (data != null) {
      radioButtons = JSON.parse(data);
      if (Array.isArray(radioButtons)) {
        removeAllItems("radioButtons");
        radioButtons.forEach((item, index) => addRadioButton(item, index));
      }
    }
  }

  function onRadioButton(deviceId, playlistId) {
    let body = {};
    body.context_uri = "spotify:playlist:" + playlistId;
    body.offset = {};
    body.offset.position = 0;
    body.offset.position_ms = 0;
    callApi(
      "PUT",
      PLAY + "?device_id=" + deviceId,
      JSON.stringify(body),
      handleApiResponse
    );
    //callApi( "PUT", SHUFFLE + "?state=true&device_id=" + deviceId, null, handleApiResponse );
  }

  function addRadioButton(item, index) {
    let node = document.createElement("button");
    node.className = "btn btn-primary m-2";
    node.innerText = index;
    node.onclick = function () {
      onRadioButton(item.deviceId, item.playlistId);
    };
    document.getElementById("radioButtons").appendChild(node);
  }
  return (
    <div>
      html lang="en"&gt;
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Spotify Web API Demo</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
        crossOrigin="anonymous"
      />
      <link href="style.css" rel="stylesheet" />
      <div className="container">
        <div id="tokenSection" className="row">
          <div className="col">
            <p className="welcomeText">
              This is a javascript app that shows how to use the Spotify API to
              control the playback of music (playlist or albums) on any of your
              devices connected to your spotify account.
            </p>
            <p className="welcomeText">
              To use this app you need a Spotify client ID and client secret.
              You get these by creating an app in the Spotify developers
              dashboard here
              <a
                href="https://developer.spotify.com/dashboard/applications"
                target="_blank"
              >
                https://developer.spotify.com/dashboard/applications
              </a>
              and add https://makeratplay.github.io/SpotifyWebAPI/ in the
              "Redirect URIs" settings field.
            </p>
            <p className="welcomeText">
              This app demostrates how the use the following APIs:
            </p>
            <ul>
              <li>https://accounts.spotify.com/authorize </li>
              <li>https://accounts.spotify.com/api/token </li>
              <li>https://api.spotify.com/v1/me/playlists </li>
              <li>https://api.spotify.com/v1/me/player/devices </li>
              <li>https://api.spotify.com/v1/me/player/play </li>
              <li>https://api.spotify.com/v1/me/player/pause </li>
              <li>https://api.spotify.com/v1/me/player/next </li>
              <li>https://api.spotify.com/v1/me/player/previous </li>
              <li>https://api.spotify.com/v1/me/player </li>
              <li>
                https://api.spotify.com/v1/playlists/{"{"}
                {"{"}PlaylistId{"}"}
                {"}"}/tracks{" "}
              </li>
              <li>https://api.spotify.com/v1/me/player/currently-playing </li>
              <li>https://api.spotify.com/v1/me/player/shuffle </li>
            </ul>
            <p />
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="clientId" className="form-label">
                Client ID
              </label>
              <input
                type="text"
                className="form-control"
                id="clientId"
                placeholder
              />
            </div>
            <div className="mb-3">
              <label htmlFor="clientSecret" className="form-label">
                Client Secret
              </label>
              <input
                type="text"
                className="form-control"
                id="clientSecret"
                placeholder
              />
            </div>
            <input
              className="btn btn-primary btn-lg"
              type="button"
              onclick="requestAuthorization()"
              defaultValue="Request Authorization"
            />
            <br />
          </div>
          <div className="col">
            <p className="welcomeText" style={{ marginTop: "40px" }}>
              {" "}
              I used this project to learn the Spotify API in order to create
              this project:
            </p>
            <iframe
              width={560}
              height={315}
              src="https://www.youtube.com/embed/H2HJ-LY7-lQ"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div id="deviceSection" className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="devices" className="form-label">
                Devices
              </label>
              <select id="devices" className="form-control"></select>
              <input
                className="btn btn-primary btn-sm mt-3"
                type="button"
                onclick="refreshDevices()"
                defaultValue="Refresh Devices"
              />
              <input
                type="button"
                className="btn btn-dark btn-sm  mt-3"
                onclick="transfer()"
                defaultValue="Transfer"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="playlists" className="form-label">
                Playlists
              </label>
              <select id="playlists" className="form-control"></select>
              <input
                className="btn btn-primary btn-sm mt-3"
                type="button"
                onclick="refreshPlaylists()"
                defaultValue="Refresh Playlists"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tracks" className="form-label">
                Tracks
              </label>
              <select id="tracks" className="form-control"></select>
              <input
                className="btn btn-primary btn-sm mt-3"
                type="button"
                onclick="fetchTracks()"
                defaultValue="Fetch Tracks"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tracks" className="form-label">
                Album
              </label>
              <input id="album" className="form-control" />
            </div>
            <div className="row">
              <div className="col">
                <input
                  type="button"
                  className="btn btn-dark"
                  onclick="previous()"
                  defaultValue="Prev"
                />
                <input
                  type="button"
                  className="btn btn-dark"
                  onclick="play()"
                  defaultValue="Play"
                />
                <input
                  type="button"
                  className="btn btn-dark"
                  onclick="shuffle()"
                  defaultValue="Shuffle"
                />
                <input
                  type="button"
                  className="btn btn-dark"
                  onclick="pause()"
                  defaultValue="Pause"
                />
                <input
                  type="button"
                  className="btn btn-dark"
                  onclick="next()"
                  defaultValue="Next"
                />
              </div>
            </div>
            <div className="row  mt-3">
              <div className="col">
                <h1> Currently Playing</h1>
                <input
                  type="button"
                  className="btn btn-primary btn-sm mt-3"
                  onclick="currentlyPlaying()"
                  defaultValue="Refresh Currently Playing"
                />
                <div>
                  <img id="albumImage" src />
                  <div id="trackTitle" />
                  <div id="trackArtist" />
                </div>
              </div>
            </div>
            <div className="row  mt-3">
              <div className="col">
                <div id="radioButtons" />
                <input
                  type="button"
                  className="btn btn-dark"
                  onclick="saveNewRadioButton()"
                  defaultValue="Add"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
