module.exports = (sequelize, DataTypes) => {
	const user = sequelize.define(
		'user',
		{
			phone: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			is_admin: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			updatedAt: 'updated_at',
			createdAt: 'created_at',
		}
	);
	return user;
};
