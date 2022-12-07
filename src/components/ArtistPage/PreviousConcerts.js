import { useNavigate } from "react-router-dom";

export default function PreviousConcerts(props) {

  const navigate = useNavigate()
  
  return (
    <>
      {
        // Filter setlist by artist id
        props.setlist
          .filter((item) => item.artist.mbid === props.artistId)
          .map((concert) => {
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
                <span className="prevConc-list" key={concertLabel}>
                  <span
                    className="prevConc"
                    onClick={() => {
                      navigate(`/artists/${props.artistId}/concerts/${concert.id}`);
                    }}
                  >
                    {concertLabel}
                  </span>
                </span>
              );
            }
          })
          .slice(0, 10)
      }
    </>
  );
}
