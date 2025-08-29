const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {isLoggedIn,isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

//Post review route
router.post("/",isLoggedIn, reviewController.createReview);


   //delete review route
   router.delete("/:reviewId",isLoggedIn,isReviewAuthor, reviewController.destroyReview);

   module.exports = router;