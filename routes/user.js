const express = require("express");
const {handleUserSignup,handleGetUsers,handleLoginUser} = require('../controllers/user')
const router = express.Router();

router.post("/",handleUserSignup)
router.get("/",handleGetUsers)
router.post("/login",handleLoginUser)

module.exports = router;