import React, { useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import ArtistPage from "./components/ArtistPage";
import SearchPage from "./components/SearchPage";
import Map from "./components/Map";
import Main from "./components/Main";

<<<<<<< HEAD
<<<<<<< HEAD
=======
import SpotifyAuth from "./components/SpotifyAuth";

>>>>>>> 82c94d92e95205d75ac7da2bc0cb2328d06c7348
=======
import SpotifyAuth from "./components/SpotifyAuth";

>>>>>>> 82c94d92e95205d75ac7da2bc0cb2328d06c7348
function App() {
  const [results, setResults] = useState([]);
  const [ticketmaster, setTicketmaster] = useState([]);
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

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
              <SearchPage results={results} ticketmaster={ticketmaster} />
            }
          ></Route>
<<<<<<< HEAD
<<<<<<< HEAD
=======
          <Route path="/#" element={<SpotifyAuth />}></Route>
>>>>>>> 82c94d92e95205d75ac7da2bc0cb2328d06c7348
=======
          <Route path="/#" element={<SpotifyAuth />}></Route>
>>>>>>> 82c94d92e95205d75ac7da2bc0cb2328d06c7348
          <Route
            path="/artist"
            element={
              <ArtistPage
                results={results}
                ticketmaster={ticketmaster}
                lat={lat}
                long={long}
              />
            }
          ></Route>
          <Route path="/map" element={<Map />}></Route>
          <Route
            path="/main"
            element={<Main results={results} ticketmaster={ticketmaster} />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
