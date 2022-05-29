//Cambiar nombre, no formatea, solo devuelve el array con el que pide el README
const format = (data, type) => {
	let formatedData = [];

	const formatType = {
		general: function (data) {
			formatedData = data.map((game) => {
				return {
					id: game.id,
					image: game.background_image,
					name: game.name,
					rating: game.rating,
					genres: game.genres.map((genre) => genre.name),
				};
			});
			return formatedData;
		},
		query: function (data) {
			for (let i = 0; i < data.length; i++) {
				formatedData.push({
					id: data[i].id,
					image: data[i].background_image,
					name: data[i].name,
					genres: data[i].genres.map((genre) => genre.name),
					rating: data[i].rating,
				});
				if (formatedData.length === 15) return formatedData;
			}
			return formatedData;
		},
		detail: function (data) {
			return {
				id: data.id,
				image: data.background_image,
				name: data.name,
				description: data.description,
				released: data.released,
				rating: data.rating,
				genres: data.genres.map((genre) => genre.name),
				platforms: data.platforms.map((platform) => platform.platform.name),
			};
		},
		detailDB: function (data) {
			return {
				name: data.name,
				description: data.description,
				released: data.released,
				rating: data.rating,
				genres: data.genres.map((genre) => genre.name),
				platforms: data.platforms,
			};
		},
		genres: function (data) {
			const genreList = data.map((genre) => genre.name);
			return genreList;
		},
	};
	return formatType[type](data);
};

module.exports = {
	format,
};
