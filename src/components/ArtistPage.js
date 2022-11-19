import ArtistTour from "./ArtistTour";
import PreviousConcerts from "./PreviousConcerts";
import Setlist from "./Setlist";
import TourDate from "./TourDate";
import UpcomingConcerts from "./UpcomingConcerts";
import "./ArtistPage.css"

export default function ArtistPage() {
  return (
    <div className="ArtistPage">
      <TourDate />
      <ArtistTour />
      <Setlist />
      <UpcomingConcerts />
      <PreviousConcerts />
    </div>
  );
}
