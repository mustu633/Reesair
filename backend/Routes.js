import Router from "express";
import listingController from "./controller/listingController.js";
import reviewController from "./controller/reviewController.js";
import userController from "./controller/userController.js";
import passport from "passport";
import userVarification from "./middlewares/userMiddleware.js";

const router = Router();

// Routes for Listing:

router.get("/listings", listingController.showListings);
router.post("/listings", userVarification ,  listingController.createListing);
router.get("/listings/:id", listingController.showListing);
router.put("/listings/:id", userVarification , listingController.editListing);
router.delete("/listings/:id", userVarification , listingController.deleteListing);

// Routes for Review:
router.post("/listings/:id/reviews", reviewController.createReview);
router.delete("/listings/:id/reviews/:reviewId", userVarification , reviewController.deleteReview);

// Routes for User:
router.post("/signup", userController.Signup);
router.post("/login", passport.authenticate("local"),userController.Login);

export default router;
