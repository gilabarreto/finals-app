export default function ConcertDate(props) {

  const increase = () => {
    if (props.index === props.artistInfo.length - 1) {
      return;
    }
    return props.setIndex(props.index + 1);
  };

  const decrease = () => {
    if (props.index === 0) {
      return;
    }
    return props.setIndex(props.index - 1);
  };

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
        <button
          className="artist-page-increase-decrease"
          onClick={increase}
        >
          &lt;
        </button>
        &ensp;Concert Date: {concertDate()}&ensp;
        <button className="artist-page-increase-decrease" onClick={decrease}>
          &gt;
        </button>
      </h2>
    </>
  )

}