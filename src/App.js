import React, { useState } from "react";
import {useCookies } from "react-cookie";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import ArtistPage from "./components/ArtistPage";
import SearchPage from "./components/SearchPage";
import Favourites from "./components/Favourites";

import SpotifyAuth from "./components/SpotifyAuth";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [setlist, setSetlist] = useState([]);
  const [ticketmaster, setTicketmaster] = useState([]);
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [token, setToken] = useState("");

  return (
    <Router>
      <div className="App">
        <Navbar
          setSetlist={setSetlist}
          setTicketmaster={setTicketmaster}
          setLat={setLat}
          setLong={setLong}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <Favourites
                  setlist={setlist}
                  ticketmaster={ticketmaster}
                  setGlobalSpotifyToken={setToken}
                /> */}
                <SearchPage
                  setlist={setlist}
                  ticketmaster={ticketmaster}
                  setGlobalSpotifyToken={setToken}
                />
              </>
            }
          ></Route>

          <Route path="/#" element={<SpotifyAuth />}></Route>
          <Route
            path="/artist"
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
