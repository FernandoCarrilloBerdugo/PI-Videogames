import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearSearch, paging } from "../../redux/actions";
import './index.css'

const NavBar = () => {

  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(clearSearch())
    // dispatch(clearFilter())
    dispatch(paging(1))
  }

  return (
    <ul className="navbar">
      <li className="navbar-element">
        <Link className="link" to='/'>Landing</Link>
      </li>
      <li className="navbar-element">
        <Link onClick={handleClick} className="link" to='/videogames'>Home</Link>
      </li>
      <li className="navbar-element">
        <Link className="link" to='/create/videogame'>Create a Game</Link>
      </li>
    </ul>
  )
}

export default NavBar;