import { ticketFinder } from "../helpers/selectors"

import UpcomingConcertListItem from "./UpcomingConcertListItem"

export default function UpcomingConcertList(props) {

  const upcomingConcerts = props.ticketmaster?.events?.map((upcomingConcert) => {
    return upcomingConcert.dates.start.localDate
  }).sort()

  const mapConcerts = upcomingConcerts.map((upcomingConcert, upcomingConcertIndex) => {

    const ticketArr = ticketFinder(props.ticketmaster)
    const ticketsUrl = ticketArr[upcomingConcertIndex]

     return <UpcomingConcertListItem key={upcomingConcertIndex} ticketsUrl={ticketsUrl} upcomingConcert={upcomingConcert} />

  }).slice(0, 10)

  return (
    <>
      {upcomingConcerts === undefined ? "There are no upcoming concerts.\n Please come back later" : mapConcerts}
    </>
  )
}