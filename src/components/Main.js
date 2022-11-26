<<<<<<< HEAD
import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';

export default function Main() {
  const [height, setHeight] = useState(0);

  return (
    <div>
      <button
        aria-expanded={height !== 0}
        aria-controls="example-panel"
        onClick={() => setHeight(height === 0 ? 'auto' : 0)}
      >
        {height === 0 ? 'Open' : 'Close'}
      </button>

      <AnimateHeight
        id="example-panel"
        duration={500}
        height={height} // see props documentation below
      >
        <h1>Your content goes here</h1>
        <p>Put as many React or HTML components here.</p>
      </AnimateHeight>
    </div>
  );
};

// import SearchPage from "./SearchPage"

// import "./Main.css"

// export default function Main(props) {

//   console.log(props)

//   return (
//     <>
//       {!props.result ?
//         <div className="main-page-card">
//           <h1>Keep track of your favorite artist.</h1>
//         </div> :
//         <SearchPage results={props.results} ticketmaster={props.ticketmaster} />}
//     </>
//   )
// }
=======
import main-img from "./public/imgs/main-img.png"

export default function Main() {
  
}
>>>>>>> e23f3b0ad2434fc0f0f4a335c418d413d73b8692
