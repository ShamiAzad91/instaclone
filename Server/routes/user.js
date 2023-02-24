const router = require("express").Router();
const verifyToken = require("../middleware/token");

const {userProfile}  = require("../controllers/user");

router.get("/user/:userid",verifyToken,userProfile);

module.exports = router;