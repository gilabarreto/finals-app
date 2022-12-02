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

  const previousConcerts = props.artistInfo.map((previousConcert) => {
    const str = previousConcert.eventDate;
    const [day, month, year] = str.split("-");
    const date = new Date(year, month - 1, day);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return `${date.toLocaleDateString("en-US", options)}`;
  });

  const filteredConcerts = previousConcerts.filter((previousConcert) => {
    return new Date(previousConcert) < new Date();
  });

  return (
    <>
      <h2 className="artist-page-button-aligner">
        <button
          className="artist-page-increase-decrease"
          onClick={increase}
        >
          &lt;
        </button>
        &ensp;Concert Date: {filteredConcerts[props.index]}&ensp;
        {filteredConcerts < new Date() ?
          <button className="artist-page-increase-decrease" onClick={decrease}>
            &gt;
          </button> :
          null}
      </h2>
    </>
  )

}