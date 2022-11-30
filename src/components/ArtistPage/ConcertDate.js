import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ConcertDate(props) {
  
  let previousConcertId;
  let nextConcertId;
  let { concertId } = useParams();

  const concert = props.setlist.find((result, index) => {
    if (result.id === concertId) {
      previousConcertId = props.setlist[index + 1]?.id;
      let nextConcert = props.setlist[index - 1];
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
              navigate(`/concert/${previousConcertId}`);
            }}
          >
            &lt;
          </button>
        )}
        &ensp;Concert Date: {concertDate()}&ensp;
        {nextConcertId && (
          <button
            className="artist-page-increase-decrease"
            onClick={() => {
              navigate(`/concert/${nextConcertId}`);
            }}
          >
            &gt;
          </button>
        )}
      </h2>
    </>
  );
}
