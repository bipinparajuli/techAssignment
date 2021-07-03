// const router = require("./auth");

const router = require("express").Router();

const {createApp,updateApp,getAppById,deleteApp,getApp} =  require("../controller/appdata");
const {getUserById} = require("../controller/user")
const {isSignedIn,isAuthenticated} = require("../controller/auth")


router.param("appId",getAppById);
router.param("userId",getUserById);

router.post("/createapp",isSignedIn,isAuthenticated,createApp);

router.get("/getapp",isSignedIn,getApp);

router.put("/updateapp/:appId/:userId",isSignedIn,isAuthenticated,updateApp);

router.delete("/deleteapp/:appId/:userId",isSignedIn,isAuthenticated,deleteApp);




module.exports=router;

