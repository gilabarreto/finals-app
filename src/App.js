import Navbar from "./components/Navbar";
import "./App.css";
import ArtistPage from "./components/ArtistPage";
import SearchPage from "./components/SearchPage";
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchPage />}></Route>
          <Route path="/artist" element={<ArtistPage />}></Route>
=======
import Map from "./components/Map"
import Main from './components/Main';

function App() {

  const [results, setResults] = useState([]);
  const [ticketmaster, setTicketmaster] = useState([]);
  const [lat, setLat] = useState([])
  const [long, setLong] = useState([])

  return (
    <Router>
      <div className="App">
        <Navbar setResults={setResults} setTicketmaster={setTicketmaster} setLat={setLat} setLong={setLong}/>
        <Routes>
          <Route path="/" element={<SearchPage results={results} ticketmaster={ticketmaster} />}></Route>
          <Route path="/artist" element={<ArtistPage results={results} ticketmaster={ticketmaster} lat={lat} long={long}/>}></Route>
          <Route path="/map" element={<Map />}></Route>
          <Route path="/main" element={<Main results={results} ticketmaster={ticketmaster} />}></Route>
>>>>>>> 1d15d77310ad8ff866891b436155449e76029ccd
        </Routes>
      </div>
    </Router>
  );
}

export default App;
