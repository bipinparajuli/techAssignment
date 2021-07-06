
const router = require("express").Router();

const {createApp,updateApp,getAppById,deleteApp,getApp,photo,getAllApp,searchApp,getAppByTitle} =  require("../controller/appdata");
const {getUserById} = require("../controller/user")
const {isSignedIn,isAuthenticated} = require("../controller/auth")


router.param("appId",getAppById);
router.param("userId",getUserById);
router.param("appName",getAppByTitle);

router.post("/createapp/:userId",isSignedIn,isAuthenticated,createApp);

router.get("/getallapp",getAllApp);

router.get("/getapp/:appId",getApp);

router.get("/photo/:appId",photo);

router.get("/search/:appName",searchApp);



router.put("/updateapp/:appId/:userId",isSignedIn,isAuthenticated,updateApp);

router.delete("/deleteapp/:appId/:userId",isSignedIn,isAuthenticated,deleteApp);


// 60e0a3a27935073c64367779


module.exports=router;

