const router = require("express").Router();
const {check} = require("express-validator");
const {signup,signin} = require('../controller/auth')

router.post("/signup",
[
    check("username", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
],
signup)

router.post("/signin",
[
   
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
],
signin)


module.exports = router