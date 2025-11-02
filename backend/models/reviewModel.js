import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: "*Please write a short review!"
    },
    rating: {
        type: Number,
        required: "*Please give rating!",
        min : 1,
        max : 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Review = mongoose.model("Review", reviewSchema);

export default Review;