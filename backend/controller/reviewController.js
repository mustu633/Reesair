import { ObjectId } from "mongodb";
import Listing from "../models/listingModel.js";
import Review from "../models/reviewModel.js";

export default {
  // for creating new review:
  async createReview(req, res) {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Listing ID" });
    }

    try {
      const listing = await Listing.findById(id);

      const { rating, comment } = req.body;

      const newReview = await Review({ rating, comment });

      listing.reviews.push(newReview);

      await newReview.save();
      await listing.save();

      return res.status(201).json(newReview);
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => ({
          msg: err.message,
          path: err.path,
        }));

        return res.status(400).json({ errors });
      }
      return res.status(500).json({ errors: [{ msg: error.message }] });
    }
  },

  // For deleting reviews:
  async deleteReview(req, res){
    const {id, reviewId} = req.params;
    
    if(!ObjectId.isValid(id)){
        res.status(400).json({message: "Your Listing id is invalid!"})
    }
    // if(!ObjectId.isValid(reviewId)){
    //     res.status(400).json({message: "Your review id is invalid!"})
    // }

    try{
        await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
        await Review.findByIdAndDelete(reviewId);
    return res.status(200).json({message: "Review deleted successfully!"});
} catch(error){
    console.log('error in deleting Review: ', error);
}
}
};
