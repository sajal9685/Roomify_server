const Booking = require("../models/Booking");
const Room = require("../models/Room");



// BOOK ROOM
const bookRoom = async (req, res) => {

    try {

        const {
            room,
            checkIn,
            checkOut,
            totalPrice
        } = req.body;

        // check room exists
        const roomExists = await Room.findById(room);

        if (!roomExists) {
            return res.status(404).json({
                message: "Room not found"
            });
        }

        // create booking
        const booking = await Booking.create({

            user: req.user.id,
            room,
            checkIn,
            checkOut,
            totalPrice

        });

        res.status(201).json({
            message: "Room booked successfully",
            booking
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};




// GET USER BOOKINGS
const getUserBookings = async (req, res) => {

    try {

        const bookings = await Booking.find({
            user: req.user.id
        })
        .populate("room")
        .populate("user", "name email");

        res.status(200).json(bookings);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};




// CANCEL BOOKING
const cancelBooking = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        booking.status = "Cancelled";

        await booking.save();

        res.status(200).json({
            message: "Booking cancelled successfully",
            booking
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};




// ADMIN - GET ALL BOOKINGS
const getAllBookings = async (req, res) => {

    try {

        const bookings = await Booking.find()
        .populate("user", "name email")
        .populate("room");

        res.status(200).json(bookings);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};



module.exports = {
    bookRoom,
    getUserBookings,
    cancelBooking,
    getAllBookings
};