import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter, filterByGenre, filterCreated, paging } from "../../redux/actions";
import './index.css'

export default function FilterByGenre() {
	const [filter, setFilter] = useState("All");
	const [created, setCreated] = useState("All");

	const dispatch = useDispatch();

	const { genres } = useSelector((state) => state);

	useEffect(() => {
		(filter === "All" || created === "All") && dispatch(clearFilter())
		filter !== "All" && dispatch(filterByGenre(filter))
		created !== "All" && dispatch(filterCreated(created))
		dispatch(paging(1))

		// eslint-disable-next-line
	}, [dispatch,filter,created]);

	const handleChangeGenre = (e) => {
		setFilter(e.target.value);
	};

  const handleChangeCreated = (e) => {
    setCreated(e.target.value)
  }

	return (
		<div className="genre-filter-container">
			<div className="filter-container">
				<label>Filter by Genre </label>
				<select className="genre-selector" onChange={(e) => handleChangeGenre(e)}>
					<option value="All">All</option>
					{genres &&
						genres.map((genre) => (
							<option key={genre} value={genre}>
								{genre}
							</option>
						))}
				</select>
			</div>
			<div className="filter-container">
        <label>Created by {" "}</label>
				<select className="created-selector" onChange={handleChangeCreated}>
          <option value="All">All</option>
					<option value="Server">Server</option>
					<option value="User">User</option>
				</select>
			</div>
		</div>
	);
}
