import React, { useState } from "react";
import { useCookies } from "react-cookie";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import ArtistPage from "./components/ArtistPage";
import SearchPage from "./components/SearchPage";
import Favourites from "./components/Favourites";
import Main from "./components/Main";
import BackgroundImage from "./components/BackgroundImage";

import SpotifyAuth from "./components/SpotifyAuth";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [setlist, setSetlist] = useState([]);
  const [ticketmaster, setTicketmaster] = useState([]);
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [token, setToken] = useState("");
  const [value, setValue] = useState("");

  library.add(fab, faHeart);

  return (
    <Router>
      <BackgroundImage />
      <div className="App">
        <Navbar />
        <Main
          setSetlist={setSetlist}
          setTicketmaster={setTicketmaster}
          setLat={setLat}
          setLong={setLong}
          value={value}
          setValue={setValue}
        />
        <Routes>
          <Route
            path="/favourite"
            element={
              <Favourites setlist={setlist} ticketmaster={ticketmaster} />
            }
          ></Route>
          {/* <Route
            path="/"
            element={
              <>
                <Main
                  setSetlist={setSetlist}
                  setTicketmaster={setTicketmaster}
                  setLat={setLat}
                  setLong={setLong}
                  value={value}
                  setValue={setValue}
                  setlist={setlist}
                  ticketmaster={ticketmaster}
                />
              </>
            }
          ></Route> */}

          <Route
            path="/search"
            element={
              <>
                <SearchPage setlist={setlist} ticketmaster={ticketmaster} />
              </>
            }
          ></Route>

          <Route
            path="artists/:artistId/concerts/:concertId"
            element={
              <ArtistPage
                setlist={setlist}
                ticketmaster={ticketmaster}
                lat={lat}
                long={long}
                token={token}
              />
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
