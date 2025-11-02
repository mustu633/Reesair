import mongoose, { Schema } from "mongoose";
import Review from "./reviewModel.js";

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "*Title is required!",
    minlength: [3, "* Title must be atleast 3 characters."],
    maxlength: [30, "* Title must be under 20 characters."],
  },
  img: {
    type: String,
    default: "uploads/1743135837035.jpg",
  },
  description: {
    type: String,
    minlength: [10, "* Description must be atleast 30 characters."],
    maxlength: [200, "* Description must be under 200 characters."],
  },
  price: {
    type: Number,
    required: "*Price is required!",
  },
  location: {
    type: String,
    required: "*Location is required!",
  },
  country: {
    type: String,
    required: "*Country is required!",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

// Middleware to delete relevent reviews to the listing that is to be delete:

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    try {
      await Review.deleteMany({ _id: { $in: listing.reviews } });
    } catch (error) {
      console.log("error in deleting Listing: ", error);
    }
  }
});

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
