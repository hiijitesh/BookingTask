require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER_NAME,
  process.env.DATABASE_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
};


db.user = require("../models/user")(sequelize, DataTypes);
db.refreshtoken = require("../models/refreshtokenModel")(sequelize, DataTypes);
db.resource = require("../models/resourceModel")(sequelize, DataTypes);
db.booking = require("../models/bookingModel")(sequelize, DataTypes);

// adding user and resource as forgein keys in Booking table
db.booking.belongsTo(db.user);

db.booking.belongsTo(db.resource);

async function dbConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");
    await db.sequelize.sync({ force: false });
    console.log("Database synced✅✅✅.");
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  db,
  dbConnection,
};
