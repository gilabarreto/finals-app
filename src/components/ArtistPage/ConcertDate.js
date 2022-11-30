import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

export default function ConcertDate(props) {
  
/*   let previousConcertId;
  let nextConcertId;
  let { concertId } = useParams();

  const concert = props.results.find((result, index) => {
    if (result.id === concertId) {
      previousConcertId = props.results[index + 1]?.id;
      let nextConcert = props.results[index - 1];
      if (nextConcert) {
        const [day, month, year] = nextConcert.eventDate.split("-");
        const nextConcertDate = new Date(year, month - 1, day);
        if (nextConcertDate < new Date()) {
          nextConcertId = nextConcert.id;
        }
      }
      return true;
    }
  }); */

  const navigate = useNavigate();

  const concertDate = () => {
    const [day, month, year] = props.concert.eventDate.split("-");
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
        {props.previousConcertId && (
          <button
            className="artist-page-increase-decrease"
            onClick={() => {
              navigate(`/concert/${props.previousConcertId}`);
            }}
          >
            &lt;
          </button>
        )}
        &ensp;Concert Date: {concertDate()}&ensp;
        {props.nextConcertId && (
          <button
            className="artist-page-increase-decrease"
            onClick={() => {
              navigate(`/concert/${props.nextConcertId}`);
            }}
          >
            &gt;
          </button>
        )}
      </h2>
    </>
  );
}
