import { Link } from "react-router-dom";

export default function PreviousConcerts(props) {

  return (
    <>
      {props.results
        .map((concert, index) => {
          const str = concert.eventDate;
          const [day, month, year] = str.split("-");
          const date = new Date(year, month - 1, day);
          const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
          };
          const city = concert.venue.city?.name;
          const state = concert.venue.city?.state;
          const country = concert.venue.city?.country.code;
          if (new Date(date) < new Date()) {
            const concertLabel = `${date.toLocaleDateString(
              "en-US",
              options
            )} (${city}, ${state}, ${country})`;
            return (
              <li key={concertLabel}>
                <Link className="prevConc" to={`/concert/${concert.id}`}>
                  {concertLabel}
                </Link>
              </li>
            );
          }
        })
        .slice(0, 10)}
    </>
  );
}
