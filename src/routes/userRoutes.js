const express = require("express");
const passport = require("passport");

const router = express.Router();
const userController=require("../controllers/userControllers.js");

const User = require("../models/userSchema.js");


// ------------------------- Get Requests -----------------------

router.get("/signup", userController.signup);
router.get("/signin", userController.signin);
router.get("/signout", passport.checkAuthentication, userController.signout);
router.get(
  "/download-csv",
  passport.checkAuthentication,
  userController.downloadCsv
);

// ------------------------- Post Request -----------------------

router.post("/create", userController.createUser);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/signin" }),
  userController.createSession
);

router.post("/signup", async (req, res) => {
  // Fixed the route path to /signup
  const { name, email, passwordHash } = req.body;
  try {
    await User.create({
      name,
      email,
      passwordHash,
    });
    return res.redirect("/");
  } catch (error) {
    console.error("Error creating user:" + error);
    return res.status(500).send("Error creating user");
  }
});

module.exports = router;
