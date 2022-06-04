const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		"videogame",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: true,
				},
			},
			description: {
				type: DataTypes.TEXT,
				// allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			released: {
				type: DataTypes.DATEONLY,
			},
			rating: {
				type: DataTypes.FLOAT,
				validate: {
					isNumeric: true,
					min: 0,
					max: 5
				},
			},
			platforms: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				// allowNull: false,
			},
		},
		{
			timestamps: false,

			createdAt: false,

			updatedAt: false,
		}
	);
};
