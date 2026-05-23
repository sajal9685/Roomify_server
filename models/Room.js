const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    image: String,

images: {
  type: [String],
  default: []
},

    category: {
      type: String,
      enum: ["PG", "Hostel", "Room"],
      default: "Room"
    },

    available: {
      type: Boolean,
      default: true
    },

  dealerName: String,
dealerPhone: String,

dealerVerified: {
  type: Boolean,
  default: false
}
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Room", roomSchema);