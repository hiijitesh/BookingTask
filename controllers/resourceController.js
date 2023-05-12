const { db } = require('../database/database.js');

const Resource = db.resource;

//get list of all Resources available
async function getAllResources(req, res) {
	try {
		const resources = await Resource.findAll({
			attributes: ['id', 'name', 'quantity'],
		});

		res.status(200).json(resources);
	} catch (error) {
		res.status(500).json({ error: 'Getting resources failed. Try again.' });
		return;
	}
}

//adding Resources
async function addResource(req, res) {
	const name = req.body.name;
	const quantity = req.body.quantity;

	if (!name || !quantity) {
		res.status(400).json({ error: 'Name and quantity are required.' });
		return;
	}

	try {
		const resource = await Resource.create({
			name: name,
			quantity: quantity,
		});

		res.status(200).json({ message: 'Resource added successfully.', resource });
	} catch (error) {
		res.status(500).json({ error: 'Adding resource failed. Try again.' });
		return;
	}
}

//Update the Resources
async function updateResource(req, res) {
	const id = req.params.id;
	const name = req.body.name;
	const quantity = req.body.quantity;

	if (!name && !quantity) {
		res.status(400).json({ error: 'Name or quantity is required.' });
		return;
	}

	try {
		const resource = await Resource.findOne({ where: { id } });

		if (!resource) {
			res.status(400).json({ error: 'No resource found.' });
			return;
		}

		if (name) {
			resource.name = name;
		}

		if (quantity) {
			resource.quantity = quantity;
		}

		await resource.save();

		res
			.status(200)
			.json({ message: 'Resource updated successfully.', resource });
	} catch (error) {
		res.status(500).json({ error: 'Updating resource failed. Try again.' });
		return;
	}
}

//Delete Resources
async function deleteResource(req, res) {
	const id = req.params.id;

	try {
		const resource = await Resource.findOne({ where: { id } });

		if (!resource) {
			res.status(400).json({ error: 'No resource found.' });
			return;
		}

		await resource.destroy();

		res.status(200).json({ message: 'Resource deleted successfully.' });
	} catch (error) {
		res.status(500).json({ error: 'Deleting resource failed. Try again.' });
		return;
	}
}

module.exports = {
	getAllResources,
	addResource,
	updateResource,
	deleteResource,
};
