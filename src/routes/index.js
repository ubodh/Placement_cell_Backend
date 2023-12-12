const express = require("express");
const passport = require("passport");

const router = express.Router();

const userRoutes = require("./userRoutes.js");
const studentRoutes = require("./studentRoute.js");
const homeController = require("../controllers/homeController.js");
const companyRoutes = require("./companyRoute.js");

router.get("/", passport.checkAuthentication, homeController.homePage);
router.use("/users", userRoutes);
router.use("/students", studentRoutes);
router.use("/company", companyRoutes);

module.exports = router;
