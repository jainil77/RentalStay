const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

//Index Route
router.get("/",wrapAsync(listingController.index));
  
  //New Route
  router.get("/new",isLoggedIn, listingController.renderNewForm);
  
  //Show Route
   router.get("/:id", wrapAsync(listingController.showListing));
  
  //Create Route
  router.post("/",isLoggedIn,upload.single("listing[image]"),wrapAsync(listingController.createListing));
  
   router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
  
   router.put("/:id",isLoggedIn,isOwner,upload.single("listing[image]"),wrapAsync(listingController.updateListing));
  
   router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));

     module.exports = router;