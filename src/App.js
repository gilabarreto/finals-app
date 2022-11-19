import logo from "./logo.svg";
import "./App.css";
import ArtistPage from "./ArtistPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <ArtistPage />
      <Navbar />
    </div>
  );
}

export default App;
