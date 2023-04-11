module.exports = (sequelize, DataTypes) => {
  const booking = sequelize.define(
    "booking",
    {
      quantity: {
        type: DataTypes.INTEGER,
      },
    },
    {
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );
  return booking;
};
