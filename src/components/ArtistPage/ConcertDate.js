import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ConcertDate(props) {
  let previousConcertId;
  let nextConcertId;
  let { artistId, concertId } = useParams();
  const { concert } = props;

  //Filter setlsit by artist id
  const filteredConcerts = props.setlist.filter(
    (item) => item.artist.mbid === artistId
  );

  //Find in data the matching concert id
  filteredConcerts.find((result, index, arr) => {
    if (result.id === concertId) {
      previousConcertId = arr[index + 1]?.id;
      let nextConcert = arr[index - 1];
      if (nextConcert) {
        const [day, month, year] = nextConcert.eventDate.split("-");
        const nextConcertDate = new Date(year, month - 1, day);
        if (nextConcertDate < new Date()) {
          nextConcertId = nextConcert.id;
        }
      }
      return true;
    }
  });

  const navigate = useNavigate();

  const concertDate = () => {
    const [day, month, year] = concert.eventDate.split("-");
    const mainConcertDate = new Date(year, month - 1, day);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return mainConcertDate.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <h2 className="artist-page-button-aligner">
        {previousConcertId && (
          <button
            className="artist-page-increase-decrease"
            onClick={() => {
              navigate(`/artists/${artistId}/concerts/${previousConcertId}`);
            }}
          >
            &lt;
          </button>
        )}
        Concert Date: {concertDate()}&ensp;
        {nextConcertId && (
          <button
            className="artist-page-increase-decrease"
            onClick={() => {
              navigate(`/artists/${artistId}/concerts/${nextConcertId}`);
            }}
          >
            &gt;
          </button>
        )}
      </h2>
    </>
  );
}
