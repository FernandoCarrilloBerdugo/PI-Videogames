const { Router } = require("express");
const { Op } = require("sequelize");
require("dotenv").config();
const axios = require("axios").default;
const { Videogame, Genre } = require("../db.js");
const { format } = require("./utils.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const apiKey = process.env.API_KEY;
const url = "https://api.rawg.io/api";

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", async (req, res) => {
	try {
		const { name } = req.query;
		if (name) {
			let { data } = await axios.get(
				`${url}/games?key=${apiKey}&search=${name}`
			);
			data = format(data.results, "query");
			res.json(data);
		} else {
			let games = [];
			let { data } = await axios.get(`${url}/games?key=${apiKey}`);
			data.results.forEach((entry) => games.push(entry));
			while (games.length < 100) {
				const newUrl = data.next;
				data = await axios.get(`${newUrl}`);
				data = data.data;
				data.results.forEach((entry) => games.push(entry));
			}
			const dbGames = await Videogame.findAll({ include: [{ model: Genre }] });
			dbGames.forEach(game => games.push(game))
			games = format(games, "general");
			res.json(games);
		}
	} catch (error) {
		console.log(error);
		res.json(error);
	}
});

router.get("/videogame/:idVideogame", async (req, res) => {
	try {
		const { idVideogame } = req.params;
		if (idVideogame.length < 16) {
			let { data } = await axios.get(
				`${url}/games/${idVideogame}?key=${apiKey}`
			);
			data = format(data, "detail");
			res.json(data);
		} else {
			let game = await Videogame.findByPk(idVideogame, {
				include: [{ model: Genre }],
			});
			if (game instanceof Videogame) {
				game = format(game, "detailDB");
				res.json(game);
			} else throw new Error("couldn't find game");
		}
	} catch (error) {
		console.log(error);
		res.json(error);
	}
});

router.get("/genres", async (req, res) => {
	try {
		let genres = await Genre.findAll();
		if (genres.length === 0) {
			let { data } = await axios.get(`${url}/genres?key=${apiKey}`);
			data = format(data.results, "genres");
			data.forEach((genre) => Genre.create({ name: genre }));
			console.log("sacado de rawg y se creó entradas en base de datos");
			res.json(data);
		} else {
			console.log("sacado de db");
			genres = format(genres, "genres");
			res.json(genres);
		}
	} catch (error) {
		console.log(error.message);
		res.send(error.message);
	}
});

router.post("/videogame", async (req, res) => {
	try {
		const { name, description, released, rating, genres, platforms } = req.body;
		const foundGame = await Videogame.findOne({ where: { name } });
		if (foundGame) {
			throw new Error("Game already exist");}
		else if (
			!name ||
			!description ||
			!released ||
			!rating ||
			!genres.length ||
			!platforms.length
		) {
			res.status(400).send("faltan datos")
			throw new Error("faltan datos obligatorios");
		} else {
			const newGame = await Videogame.create({
				name,
				description,
				released,
				rating,
				platforms,
			});
			const gameGenres = await Genre.findAll({
				where: { name: { [Op.in]: genres } },
			});
			await newGame.addGenres(gameGenres);
			//En teoria hacer where: { name: genres } funcionaría tambien según la documentación
			//No usé format() porque la data no está en una sola variable
			const formatedData = {
				id: newGame.id,
				name,
				description,
				released,
				rating,
				genres,
				platforms,
			};
			res.json(formatedData);
		}
	} catch (error) {
		console.log(error);
		res.json(error);
	}
});

module.exports = router;
