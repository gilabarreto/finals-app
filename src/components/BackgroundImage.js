import "./BackgroundImage.css";
import { useState, useEffect, Image } from "react";

import background1 from "../imgs/main-page-1.jpg";
import background2 from "../imgs/main-page-2.jpg";
import background3 from "../imgs/main-page-3.jpg";
import background4 from "../imgs/main-page-4.jpg";
import background5 from "../imgs/main-page-5.jpg";
import background6 from "../imgs/main-page-6.jpg";

export default function BackgroundImage(props) {
  const background = [
    background1,
    background2,
    background3,
    background4,
    background5,
    background6
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const timerId = setTimeout(() => {
      let newActiveIndex = activeImageIndex === 5 ? 0 : activeImageIndex + 1;
      setActiveImageIndex(newActiveIndex);
    }, 6000);
  }, [activeImageIndex]);

  return (
    <>
      {background.map((img, index) =>
        activeImageIndex === index ? (
          <img
            key={index}
            src={background[activeImageIndex]}
            className="background-img"
          />
        ) : (
          <img
            key={index}
            src={background[activeImageIndex]}
            className="background-img hidden"
          />
        )
      )}
    </>
  );
}
