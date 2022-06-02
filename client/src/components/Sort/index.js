import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sort, paging } from "../../redux/actions";
import './index.css';

export default function Sort() {
  
  const [sorting, setSorting] = useState("Rating")

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(sort(sorting))
    dispatch(paging(1))
    // eslint-disable-next-line
  }, [sorting])

  const handleChange = (e) => {
    setSorting(e.target.value)
  }

  return (
    <div>
    <label>Sort by: </label>
    <select className="sort-selector" onChange={handleChange}>
      <option value="Rating">Rating</option>
      <option value="AZ">Name</option>
      <option value="ZA">Name Inverse</option>
    </select>
    </div>
  )
}