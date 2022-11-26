export default function UpcomingConcertListItem(props) {

  return (
    <li>{props.upcomingConcert.split("-").reverse().join("-")}
      - <a href={props.ticketsUrl} target="_blank" rel="noopener noreferrer">Get Tickets!</a>
    </li>
  )
}