
const router = require("express").Router();

const {createApp,updateApp,getAppById,deleteApp,getApp} =  require("../controller/appdata");
const {getUserById} = require("../controller/user")
const {isSignedIn,isAuthenticated} = require("../controller/auth")


router.param("appId",getAppById);
router.param("userId",getUserById);

router.post("/createapp",isSignedIn,createApp);

router.get("/getapp",isSignedIn,getApp);

router.put("/updateapp/:appId/:userId",isSignedIn,isAuthenticated,updateApp);

router.delete("/deleteapp/:appId/:userId",isSignedIn,isAuthenticated,deleteApp);

// 60e0a3a27935073c64367779


module.exports=router;

