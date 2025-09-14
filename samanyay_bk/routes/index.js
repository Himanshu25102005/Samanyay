var express = require("express");
const passport = require("passport");
require("./auth");
var router = express.Router();
const userModel = require("./users");

function isLoggedin(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/profile",
  }),
  (req, res) => {}
);

const isloggedin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("http://localhost:5173/");
  }
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

router.post("/", async (req, res) => {
  const data = await userModel.create({
    email: req.body.email,
    username: req.body.username,
  });

  userModel.register(data, req.body.password).then(() => {
    passport.authenticate("local")(req, res, () => {
      res.redirect("http://localhost:5173/profile");
    });
  });
});

router.get("/profile", isloggedin, async (req, res) => {
  res.redirect("http://localhost:5173/profile");
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/profile",
    failureRedirect: "/auth/failure",
  })
);

router.get("/auth/failure", (req, res) => {
  res.send("Something went wrong!");
});

module.exports = router;
