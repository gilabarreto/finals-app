export function ticketFinder(ticketmasterData) {

  const upcomingConcerts = ticketmasterData?.events?.map((upcomingConcert) => {
    return upcomingConcert.dates.start.localDate
  }).sort()

  const tickets = ticketmasterData?.events?.map((upcomingConcert, index) => {

    index = 0

    if (upcomingConcert?.dates?.start?.localDate === upcomingConcerts[index]?.dates?.start?.localDate) {
      return null
    }
    return upcomingConcert?.url
  })

  return tickets
}

export function latitudeFinder(ticketmasterData) {

  const upcomingConcerts = ticketmasterData?.events?.map((upcomingConcert) => {
    return upcomingConcert.dates.start.localDate
  }).sort()

  const latitude = ticketmasterData?.events?.find((upcomingConcert) => {
    if (!upcomingConcerts[0]) {
      return null
    }
    return upcomingConcert.dates.start.localDate === upcomingConcerts[0]
  })

  const result = latitude?._embedded?.venues[0].location.latitude

  return "latitude", result

}

export function longitudeFinder(ticketmasterData) {

  const upcomingConcerts = ticketmasterData?.events?.map((upcomingConcert) => {
    return upcomingConcert.dates.start.localDate
  }).sort()

  const longitude = ticketmasterData?.events?.find((upcomingConcert) => {
    if (!upcomingConcerts[0]) {
      return null
    }
    return upcomingConcert.dates.start.localDate === upcomingConcerts[0]
  })

  const result = longitude?._embedded?.venues[0].location.longitude

  return "longitude", result

}