import ArtistTour from "./ArtistTour";
import PreviousConcerts from "./PreviousConcerts";
import Setlist from "./Setlist";
import TourDate from "./TourDate";
import UpcomingConcerts from "./UpcomingConcerts";

export default function ArtistPage() {
  return (
    <div>
      <TourDate />
      <ArtistTour />
      <Setlist />
      <UpcomingConcerts />
      <PreviousConcerts />
    </div>
  );
}
