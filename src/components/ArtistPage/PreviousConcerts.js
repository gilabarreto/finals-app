export default function PreviousConcerts(props) {
  const previousConcerts = props.results.map((previousConcert) => {
    const str = previousConcert.eventDate;
    const [day, month, year] = str.split("-");
    const date = new Date(year, month - 1, day);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const city = previousConcert.venue.city?.name;
    const state = previousConcert.venue.city?.state;
    const country = previousConcert.venue.city?.country.code;
    return `${date.toLocaleDateString(
      "en-US",
      options
    )} (${city}, ${state}, ${country})`;
  });

  const filteredConcerts = previousConcerts.filter((previousConcert) => {
    return new Date(previousConcert) < new Date();
  });

  return (
    <>
      {filteredConcerts
        .map((previousConcert, index) => (
          <li key={previousConcert}>
            <a className="prevConc" onClick={() => props.setIndex(index)}>
              {previousConcert}
            </a>
          </li>
        ))
        .slice(0, 10)}
    </>
  );
}
