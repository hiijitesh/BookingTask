module.exports = (sequelize, DataTypes) => {
	const resource = sequelize.define(
		"resource",
		{
			resource_name: {
				type: DataTypes.STRING,
			},
			quantity: {
				type: DataTypes.INTEGER,
			},
		},
		{
			updatedAt: "updated_at",
			createdAt: "created_at",
		}
	);
	return resource;
};
