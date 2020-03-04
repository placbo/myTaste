const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema(
  {
    itemId: { type: String },
    userId: { type: String },
    rating: { type: Number }
  },
  {
    collection: "ratings",
    versionKey: false,
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);

const Rating = mongoose.model("rating", ratingSchema);

module.exports = Rating;
