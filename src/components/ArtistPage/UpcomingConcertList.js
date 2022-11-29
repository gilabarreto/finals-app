import { ticketFinder } from '../../helpers/selectors'

export default function UpcomingConcertList(props) {

  const upcomingConcerts = props.ticketmaster.events ?
    props.ticketmaster.events.map((upcomingConcert) => {
      const str = upcomingConcert.dates.start.localDate;
      const [year, month, day] = str.split('-');
      const date = new Date(year, month - 1, day);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    }) : [];

  const mapConcerts = upcomingConcerts.length > 0 ?
    upcomingConcerts.map((upcomingConcert, upcomingConcertIndex) => {

      const ticketArr = ticketFinder(props.ticketmaster)
      const ticketsUrl = ticketArr[upcomingConcertIndex]

      return <UpcomingConcertListItem key={upcomingConcertIndex} ticketsUrl={ticketsUrl} upcomingConcert={upcomingConcert} />

    }).slice(0, 10) : [];

  return (
    <>
      {upcomingConcerts === undefined ? "There are no upcoming concerts.\n Please come back later" : mapConcerts}
    </>
  )
}

function UpcomingConcertListItem(props) {

  return (
    <li>{props.upcomingConcert.split("-").reverse().join("-")}
      - <a href={props.ticketsUrl} target="_blank" rel="noopener noreferrer">Get Tickets!</a>
    </li>
  )
}