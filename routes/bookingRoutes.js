const express = require("express");

const {
    bookRoom,
    getUserBookings,
    cancelBooking,
    getAllBookings
} = require("../controllers/bookingController");

const {
    protect,
    admin
} = require("../middleware/authMiddleware");

const router = express.Router();


// BOOK ROOM
router.post("/", protect, bookRoom);


// GET USER BOOKINGS
router.get("/mybookings", protect, getUserBookings);


// CANCEL BOOKING
router.put("/cancel/:id", protect, cancelBooking);


// ADMIN GET ALL BOOKINGS
router.get("/", protect, admin, getAllBookings);


module.exports = router;