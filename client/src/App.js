import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Detail from "./components/Detail";
import NavBar from "./components/NavBar";
import Create from "./components/Create";
import "./App.css";

function App() {
	return (
		<div className="App">
			<Router>
				<Route exact path="/">
					<Landing />
				</Route>
				<Route path={['/videogames','/videogame','/create']}>
					<NavBar />
				</Route>
				<Route exact path="/videogames">
					<Home />
				</Route>
				<Route exact path="/videogame/:id">
					<Detail />
				</Route>
				<Route exact path="/create/videogame">
					<Create />
				</Route>
			</Router>
		</div>
	);
}

export default App;
