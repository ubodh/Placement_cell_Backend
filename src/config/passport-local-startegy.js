const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userSchema");

const local = new LocalStrategy(
  { usernameField: "email", passReqToCallback: true },
  async function (req, email, password, done) {
    try {
      const user = await User.findOne({ email });

      if (!user || !user.isPasswordCorrect(password)) {
        console.log("Invalid Username/Password");
        return done(null, false, { message: "Invalid Username/Password" });
      }
      return done(null, user);
    } catch (error) {
      console.error(`Error in finding user: ${error}`);
      return done(error);
    }
  }
);

passport.use("local", local);

// Serialize user
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// // Deserialize user
// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     if (err) {
//       console.error("Error in finding user --> Passport");
//       return done(err);
//     }
//     return done(null, user);
//   });
// });

// Deserialize user using promises
passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => {
      if (!user) {
        console.error("User not found --> Passport");
        return done(null, false);
      }else{
      return done(null, user);
      }
    })
    .catch((err) => {
      console.error(`Error in finding user --> Passport: ${err}`);
      return done(err);
    });
});

// Check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/users/signin");
};

// Set authenticated user for views
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
