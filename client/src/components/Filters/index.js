import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter, filterByGenre, filterCreated, getGenres } from "../../redux/actions";

export default function FilterByGenre() {
	const [filter, setFilter] = useState("All");
	const [created, setCreated] = useState("All");

	const dispatch = useDispatch();

	const { genres } = useSelector((state) => state);

	useEffect(() => {
		if (!genres.length) dispatch(getGenres());
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (filter !== "All") dispatch(filterByGenre(filter));
    if (created !== "All") dispatch(filterCreated(created))
		else if(created === filter) dispatch(clearFilter());
		// eslint-disable-next-line
	}, [filter,created]);

	const handleChangeGenre = (e) => {
		setFilter(e.target.value);
	};

  const handleChangeCreated = (e) => {
    setCreated(e.target.value)
  }

	return (
		<div className="genre-filter-container">
			<div>
				<label>Filter by Genre </label>
				<select onChange={(e) => handleChangeGenre(e)}>
					<option value="All">All</option>
					{genres &&
						genres.map((genre) => (
							<option key={genre} value={genre}>
								{genre}
							</option>
						))}
				</select>
			</div>
			<div>
        <label>Created by: {" "}</label>
				<select onChange={handleChangeCreated}>
          <option value="All">All</option>
					<option value="Server">Server</option>
					<option value="User">User</option>
				</select>
			</div>
		</div>
	);
}
