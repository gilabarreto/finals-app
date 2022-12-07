import { ticketFinder } from "../../helpers/selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UpcomingConcertList(props) {
  const ticketmasterEvents = props.ticketmaster.events
    ? props.ticketmaster.events
        .map((item) => {
          return item;
        })
        .filter((item) => {
          if (item._embedded.attractions !== undefined) {
            for (const attraction of item._embedded.attractions) {
              if (attraction.name === props.concert.artist.name) {
                return item;
              }
            }
          }
        })
        .sort((a, b) => a.dates.start.localDate - b.dates.start.localDate)
    : [];

  const upcomingConcerts = ticketmasterEvents.map((upcomingConcert) => {
    const str = upcomingConcert.dates.start.localDate;
    const [year, month, day] = str.split("-");
    const date = new Date(year, month - 1, day);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  });

  const mapConcerts =
    upcomingConcerts.length > 0
      ? upcomingConcerts
          .map((upcomingConcert, upcomingConcertIndex) => {
            const ticketArr = ticketFinder(props.ticketmaster);
            const ticketsUrl = ticketArr[upcomingConcertIndex];

            return (
              <UpcomingConcertListItem
                key={upcomingConcertIndex}
                ticketsUrl={ticketsUrl}
                upcomingConcert={upcomingConcert}
              />
            );
          })
          .slice(0, 10)
      : [];

  return (
    <>
      {upcomingConcerts.length === 0
        ? "There are no upcoming concerts.\n Please come back later"
        : mapConcerts}
    </>
  );
}

function UpcomingConcertListItem(props) {
  return (
    <div className="upcoming-concerts-container">
    <FontAwesomeIcon icon="fa-solid fa-music" />&ensp;
    {props.upcomingConcert.split("-").reverse().join("-")}&ensp;{" "}
    <span className="get-tickets" onClick={()=>window.open(props.ticketsUrl,'_blank')}>Get Tickets!</span>
    </div>
  );
}