import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Detail from "./components/Detail";
import "./App.css";

function App() {
	return (
		<div className="App">
			<Router>
				<Route exact path="/">
					<Landing />
				</Route>
				<Route exact path="/videogames">
					<Home />
				</Route>
				<Route exact path="/videogame/:id">
					<Detail />
				</Route>
			</Router>
		</div>
	);
}

export default App;
