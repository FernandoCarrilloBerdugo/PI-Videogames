import React from "react";
import { Link } from "react-router-dom";
import './index.css'

const NavBar = () => {
  return (
    <ul className="navbar">
      <li className="navbar-element">
        <Link className="link" to='/'>Landing</Link>
      </li>
      <li className="navbar-element">
        <Link className="link" to='/videogames'>Home</Link>
      </li>
      <li className="navbar-element">
        <Link className="link" to='/create/videogame'>Create a Game</Link>
      </li>
    </ul>
  )
}

export default NavBar;