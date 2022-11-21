import React, { useState} from 'react';

import Navbar from "./components/Navbar";
import "./App.css";
import ArtistPage from "./components/ArtistPage";
import SearchPage from "./components/SearchPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  const [results, setResults] = useState([]);

  return (
    // <Router>
      <div className="App">
        <Navbar setResults={setResults} />
        <SearchPage results={results} />
        <ArtistPage results={results} />
{/*         <Routes>
          <Route path="/" element={<SearchPage results={results} />}></Route>
          <Route path="/artist" element={<ArtistPage />}></Route>
        </Routes> */}
      </div>
    // </Router>
  );
}

export default App;
