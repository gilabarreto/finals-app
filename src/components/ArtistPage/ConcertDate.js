import { useNavigate } from "react-router-dom";

export default function ConcertDate(props) {
  // const increase = () => {
  //   if (props.index === props.artistInfo.length - 1) {
  //     return;
  //   }
  //   return props.setIndex(props.index + 1);
  // };

  // const decrease = () => {
  //   if (props.index === 0) {
  //     return;
  //   }
  //   return props.setIndex(props.index - 1);
  // };
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

  if (new Date(concertDate) > new Date()) {
    return props.setIndex(props.index + 1);
  }

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
