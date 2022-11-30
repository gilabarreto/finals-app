import React, { useState } from "react";
import {useCookies } from "react-cookie";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import ArtistPage from "./components/ArtistPage";
import SearchPage from "./components/SearchPage";
import Map from "./components/Map";
import Favourites from "./components/Favourites";
import Main from "./components/Main";

import SpotifyAuth from "./components/SpotifyAuth";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [results, setResults] = useState([]);
  const [ticketmaster, setTicketmaster] = useState([]);
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [token, setToken] = useState("");

  return (
    <Router>
      <div className="App">
        <Navbar
          setResults={setResults}
          setTicketmaster={setTicketmaster}
          setLat={setLat}
          setLong={setLong}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Favourites
                  results={results}
                  ticketmaster={ticketmaster}
                  setGlobalSpotifyToken={setToken}
                />
                <SearchPage
                  results={results}
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
                results={results}
                ticketmaster={ticketmaster}
                lat={lat}
                long={long}
                token={token}
              />
            }
          ></Route>
          <Route path="/map" element={<Map />}></Route>
          {/* <Route
            path="/main"
            element={<Main results={results} ticketmaster={ticketmaster} />}
          ></Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
