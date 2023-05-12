const express = require('express');

const resourceController = require('../controllers/resourceController');
const checkAuthentication = require('../middlewares/checkAuthentication');

const router = express.Router();

router.get('/resources', resourceController.getAllResources);

router.post(
	'/add-resource',
	checkAuthentication.checkAuthentication,
	checkAuthentication.checkAdminAuthorization,
	resourceController.addResource
);

router.put(
	'/update-resource/:id',
	checkAuthentication.checkAuthentication,
	checkAuthentication.checkAdminAuthorization,
	resourceController.updateResource
);

router.delete(
	'/delete-resource/:id',
	checkAuthentication.checkAuthentication,
	checkAuthentication.checkAdminAuthorization,
	resourceController.deleteResource
);

module.exports = router;
