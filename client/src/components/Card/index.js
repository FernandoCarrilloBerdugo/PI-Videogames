import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Card = (props) => {
  return (
    <div className="videogame">
      <Link to ={`/videogame/${props.id}`}>
        <h3>{props.name}</h3>
      </Link>
      <img className="image" src={props.image} alt={props.name} />
      <div className="genres">
        <h3>Genres: </h3>
        {
          props.genres &&
          props.genres.map(genre => (
            <ul key={props.id + Math.random()}>
              {genre}
            </ul>
          ))
        }
      </div>
    </div>
  )
}

export default Card;