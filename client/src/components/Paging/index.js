import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paging } from "../../redux/actions";
import "./index.css";

export default function Paging() {
	const games = useSelector((state) => state);

	const dispatch = useDispatch();

	const [page, setPage] = useState(1);

	let display = [];

	if (games.filtered.length) {
		display = [...games.filtered];
	} else if (games.search.length) {
		display = [...games.search];
	} else {
		display = [...games.videogames];
	}

	let numberOfButtons = [];

	for (let i = 1; i <= Math.ceil(display.length / 15); i++) {
		numberOfButtons.push(i);
	}

	useEffect(() => {
	 dispatch(paging(page));
		// eslint-disable-next-line
	}, [dispatch,page]);

	const onPrevious = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	const handleChange = (e) => {
		setPage(parseInt(e.target.value));
	};

	const onNext = () => {
		if (page < numberOfButtons.length) {
      console.log(numberOfButtons.length)
			setPage(page + 1);
		}
	};

	return (
		<div className="paging-container">
			<button className="prev-next-button" onClick={onPrevious}>Back</button>
			{numberOfButtons.length &&
				games.paging.length > 0 &&
				numberOfButtons.map((element) => (
					<button
						className={page === element ? "active-page" : "page-button"}
						key={element}
						value={element}
						onClick={handleChange}
					>
						{element}
					</button>
				))}
			<button className="prev-next-button" onClick={onNext}>Next</button>
		</div>
	);
}
