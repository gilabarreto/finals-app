import SearchPage from "./SearchPage"

import "./Main.css"

export default function Main(props) {

  console.log(props)

  return (
    <>
      {!props.result ?
        <div className="main-page-card">
          <h1>Keep track of your favorite artist.</h1>
        </div> :
        <SearchPage results={props.results} ticketmaster={props.ticketmaster} />}
    </>
  )
}