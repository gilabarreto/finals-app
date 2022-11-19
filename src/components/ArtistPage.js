import ArtistTour from "./ArtistTour";
import PreviousConcerts from "./PreviousConcerts";
import Setlist from "./Setlist";
import TourDate from "./TourDate";
import UpcomingConcerts from "./UpcomingConcerts";
import "./styles/styles.css";

export default function ArtistPage() {
  return (
    <div>
      <div className="container-1">
        <TourDate />
        <ArtistTour />
      </div>
      <div className="flex justify-between">
        <div className="container-2">
          <Setlist />
        </div>
        <div className="container-3">
          <UpcomingConcerts />
          <PreviousConcerts />
        </div>
      </div>
    </div>
  );
}
