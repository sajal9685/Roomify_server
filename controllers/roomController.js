const Room = require("../models/Room");

const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const addRoom = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      price,
      category,
      dealerName,
      dealerPhone,
      dealerVerified
    } = req.body;

    const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "roomify" },
          (error, result) => {
            if (result) resolve(result.secure_url);
            else reject(error);
          }
        );

        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const imageUrl = await uploadToCloudinary(file.buffer);
        imageUrls.push(imageUrl);
      }
    }

    const room = await Room.create({
      title,
      description,
      location,
      price,
      category,
      images: imageUrls,
      image: imageUrls[0],
      dealerName,
      dealerPhone,
      dealerVerified: dealerVerified === "true"
    });

    res.status(201).json({
      message: "Room added successfully",
      room
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// GET ALL ROOMS
const getRooms = async (req, res) => {
    try {

        const rooms = await Room.find();

        res.status(200).json(rooms);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



// GET SINGLE ROOM
const getSingleRoom = async (req, res) => {
    try {

        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({
                message: "Room not found"
            });
        }

        res.status(200).json(room);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};




// UPDATE ROOM
const updateRoom = async (req, res) => {
    try {

        const room = await Room.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Room updated successfully",
            room
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};




// DELETE ROOM
const deleteRoom = async (req, res) => {
    try {

        await Room.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Room deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



module.exports = {
    addRoom,
    getRooms,
    getSingleRoom,
    updateRoom,
    deleteRoom
};