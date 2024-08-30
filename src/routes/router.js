const router = require("express").Router();
const testRoute = require("./test");
const userRoutes = require("./apis/user/_router");
const courseRoutes = require('./apis/courses/courses')

router.use('/', testRoute);  //test route
router.use('/user', userRoutes); // users routes
router.use('/course', courseRoutes); // courses routes

module.exports = router;