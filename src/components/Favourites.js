import React from "react";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";

import { useNavigate} from "react-router-dom";

export default function Favourites(props) {
  const navigate = useNavigate();

  if (props.loadingfavourites) {
    return <h1 className="favourite-text">Loading..</h1>;
  }

  if (!props.loadingfavourites && props.favourites.length === 0) {
    return null;
  }

  const handleDelete = (artistId) => {
    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:4000/favourite/delete",
        {
          artist_id: artistId,
        },
        {
          headers: {
            token: token,
          },
        }
      )
      .then(() => {
        props.setFavourites((prev) =>
          [...prev].filter((item) => item.artist_id !== artistId)
        );
        navigate("/favourite");
      })
      .catch((error) => {
        console.log("Error:", error);
        alert(error);
      });
  };

  return (
    <div className="test">
      {props.favourites.map((favourite) => {
        const artist = favourite.artistname;

        const artistImage = favourite.artistimage;

        const artistId = favourite.artist_id;
        
        return (
          <div key={artistId} className="search-page-card">
            <div className="search-page-image-box">
              <img src={artistImage} className="search-page-image" />
            </div>
            <div className="search-page-info-box">
              <h1 className="search-artist">{artist}</h1>
            </div>
            <AiFillDelete
              className="delete-icon"
              onClick={() => {
                handleDelete(artistId);
              }}
            ></AiFillDelete>
          </div>
        );
      })}
    </div>
  );
}
