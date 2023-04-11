const express = require("express");

const bookingController = require("../controllers/bookingController");
const checkAuthentication = require("../middlewares/checkAuthentication");

const router = express.Router();

router.post(
  "/book-resource",
  checkAuthentication.checkAuthentication,
  bookingController.addBooking
);

router.get(
  "/get-bookings",
  checkAuthentication.checkAuthentication,
  bookingController.getAllBookings
);

module.exports = router;
