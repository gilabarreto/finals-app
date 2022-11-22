import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import ArtistPage from "./components/ArtistPage";
import SearchPage from "./components/SearchPage";
import Map from "./components/Map"

function App() {

  const [results, setResults] = useState([]);
  const [ticketmaster, setTicketmaster] = useState([]);

  return (
    <Router>
      <div className="App">
        <Navbar setResults={setResults} setTicketmaster={setTicketmaster} />
        <Routes>
          <Route path="/" element={<SearchPage results={results} ticketmaster={ticketmaster} />}></Route>
          <Route path="/artist" element={<ArtistPage results={results} ticketmaster={ticketmaster} />}></Route>
          <Route path="/map" element={<Map />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
