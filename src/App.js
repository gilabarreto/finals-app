import Navbar from "./components/Navbar";
import "./App.css";
import ArtistPage from "./components/ArtistPage";
import SearchPage from "./components/SearchPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchPage />}></Route>
          <Route path="/artist" element={<ArtistPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
