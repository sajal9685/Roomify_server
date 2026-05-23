const express = require("express");

const {
    addRoom,
    getRooms,
    getSingleRoom,
    updateRoom,
    deleteRoom
} = require("../controllers/roomController");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();
const {
    protect,
    admin
} = require("../middleware/authMiddleware");

// ADD ROOM
router.post("/", protect, admin, upload.array("images", 5), addRoom);


// GET ALL ROOMS
router.get("/", getRooms);


// GET SINGLE ROOM
router.get("/:id", getSingleRoom);


// UPDATE ROOM
router.put("/:id", protect, admin, updateRoom);


// DELETE ROOM
router.delete("/:id", protect, admin, deleteRoom);


module.exports = router;