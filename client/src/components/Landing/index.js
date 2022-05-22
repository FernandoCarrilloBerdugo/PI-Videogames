import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Landing = () => {
	return (
		<div className="landing-container">
			<div className="landing">
				<h1 className="landing-title">Welcome to the world of videogames</h1>
				<h3 className="landingSubtext">
					The best web app to get info about all videogames
				</h3>
			</div>
			<Link to="/videogames" className="link">
				<div className="landingButton">
					<h2>Enter</h2>
				</div>
			</Link>
		</div>
	);
};

export default Landing;
