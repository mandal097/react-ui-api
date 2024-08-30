const router = require("express").Router();
const registerRoute = require("./register");
const loginRoute = require("./login");
const getUser = require("./getUser");
const auth = require("../../../middleware/auth");

router.use("/register", registerRoute);  //register
router.use("/login", loginRoute);  // login
router.use("/", auth, getUser);  // fetching details  of all particular user by user id // list of all users

module.exports = router;