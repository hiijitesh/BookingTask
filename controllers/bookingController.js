const { db } = require('../database/database.js');

const Booking = db.booking;
const Resource = db.resource;

//Book an item
async function addBooking(req, res) {
	const resourceId = req.body.resourceId;
	const quantity = req.body.quantity;

	if (!resourceId || !quantity) {
		res.status(400).json({ error: 'Resource id and quantity are required.' });
		return;
	}

	try {
		const resource = await Resource.findOne({ where: { id: resourceId } });

		if (!resource) {
			res.status(400).json({ error: 'No resource found.' });
			return;
		}

		if (resource.quantity < quantity) {
			res.status(400).json({
				error: 'Resource does not have required quantity left to be booked.',
			});
			return;
		}

		const booking = await Booking.create({
			userId: req.userInfo.id,
			resourceId: resourceId,
			quantity: quantity,
		});

		resource.quantity = resource.quantity - quantity;
		await resource.save();

		res.status(200).json({
			message: 'Booking added successfully.',
			booking: {
				id: booking.id,
				quantity: booking.quantity,
				resource: {
					name: resource.name,
				},
			},
		});
	} catch (error) {
		res.status(500).json({ error: 'Adding booking failed. Try again.' });
		return;
	}
}

//list of booked items
async function getAllBookings(req, res) {
	try {
		const bookings = await Booking.findAll({
			where: { userId: req.userInfo.id },
			attributes: ['id', 'quantity'],
			include: [
				{
					model: Resource,
					attributes: ['name'],
				},
			],
		});

		res.status(200).json(bookings);
	} catch (error) {
		res.status(500).json({ error: 'Getting bookings failed. Try again.' });
		return;
	}
}

module.exports = {
	addBooking,
	getAllBookings,
};
