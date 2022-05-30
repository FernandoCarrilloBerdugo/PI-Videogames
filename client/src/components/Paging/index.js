import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paging } from "../../redux/actions";

export default function Paging() {

  const games = useSelector(state => state)

  const dispatch = useDispatch()

  const [page,setPage] = useState(1)
  
  let display = []

  if(games.filtered.length) {
    display = [...games.filtered]
  } else if(games.search.length) {
    display = [...games.search]
  } else {
    display = [...games.videogames]
  }
  
  let numberOfButtons = []

  for(let i = 1; i <= Math.ceil(display.length/15); i++){
    numberOfButtons.push(i)
  }

  useEffect(() => {
    dispatch(paging(page))
    // eslint-disable-next-line
  },[page])

  const handleChange = (e) => {
    setPage(e.target.value)  
  }

  return (
    <div>
      {(numberOfButtons.length && games.paging.length > 0)
      && numberOfButtons.map((element) => (
        <button key={element} value={element} onClick={handleChange}>{element}</button>
      ))
    }
    </div>
  )
}