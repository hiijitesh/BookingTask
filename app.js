const express = require('express');

const { dbConnection } = require('./database/database');
const PORT = process.env.PORT || 1234;

const app = express();

const authRoutes = require('./routes/authRoute');
const resourceRoutes = require('./routes/resourceRoute');
const bookingRoutes = require('./routes/bookingRoute');

app.use(express.json());

app.use(authRoutes);
app.use(resourceRoutes);
app.use(bookingRoutes);

dbConnection()
	.then(function () {
		app.listen(PORT, function () {
			console.log('Server has started on the http://localhost:' + PORT);
		});
	})
	.catch(function (error) {
		console.log(error);
	});
